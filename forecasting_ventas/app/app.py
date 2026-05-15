"""
Simulador de ventas — Noviembre 2025
Ejecutar: streamlit run app.py
"""
from __future__ import annotations
from pathlib import Path
import joblib
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns
import streamlit as st
# ── Rutas ─────────────────────────────────────────────────────────────────────
def get_project_root() -> Path:
    """Raíz del proyecto (donde están data/ y models/)."""
    here = Path(__file__).resolve().parent
    # app.py dentro de app/ → subir un nivel
    if (here.parent / "data").is_dir():
        return here.parent
    # app.py en la raíz del proyecto
    if (here / "data").is_dir():
        return here
    return here.parent
ROOT = get_project_root()
MODEL_PATH = ROOT / "models" / "modelo_final.joblib"
DATA_PATH = ROOT / "data" / "processed" / "inferencia_df_transformado.csv"
RAW_PATH = ROOT / "data" / "raw" / "inferencia" / "ventas_2025_inferencia.csv"
LAG_COLS = [f"unidades_vendidas_lag{i}" for i in range(1, 8)]
MM7_COL = "unidades_vendidas_mm7"
COMP_COLS = ["Amazon", "Decathlon", "Deporvillage"]
COMP_SCENARIOS = {
    "Actual (0%)": 1.0,
    "Competencia -5%": 0.95,
    "Competencia +5%": 1.05,
}
DIAS_ES = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
BLACK_FRIDAY_DAY = 28
PALETTE = ["#667eea", "#764ba2"]
# ── Página y estilos ──────────────────────────────────────────────────────────
st.set_page_config(
    page_title="Simulador Ventas Nov 2025",
    page_icon="📈",
    layout="wide",
    initial_sidebar_state="expanded",
)
st.markdown(
    """
    <style>
    .block-container { padding-top: 1.5rem; }
    div[data-testid="stMetric"] {
        background: linear-gradient(135deg, #667eea22, #764ba222);
        border: 1px solid #667eea55;
        border-radius: 12px;
        padding: 12px 16px;
    }
    div[data-testid="stSidebar"] .stButton > button {
        width: 100%;
        background: linear-gradient(90deg, #667eea, #764ba2) !important;
        color: white !important;
        font-weight: 700 !important;
        border: none !important;
        padding: 0.75rem !important;
    }
    </style>
    """,
    unsafe_allow_html=True,
)
# ── Utilidades de formato ─────────────────────────────────────────────────────
def fmt_eur(x: float) -> str:
    s = f"{x:,.2f}"
    ent, dec = s.split(".")
    return f"{ent.replace(',', '.')},{dec} €"
def fmt_int(x: float) -> str:
    return f"{int(round(x)):,}".replace(",", ".")
# ── Carga de recursos ─────────────────────────────────────────────────────────
@st.cache_resource
def load_model():
    if not MODEL_PATH.exists():
        raise FileNotFoundError(
            f"No se encontró el modelo en `{MODEL_PATH}`. "
            "Ejecuta `notebooks/entrenamiento.ipynb` para generarlo."
        )
    model = joblib.load(MODEL_PATH)
    if not hasattr(model, "feature_names_in_"):
        raise AttributeError("El modelo no expone feature_names_in_.")
    return model
@st.cache_data
def load_base_data() -> pd.DataFrame:
    if not DATA_PATH.exists():
        raise FileNotFoundError(f"No se encontró `{DATA_PATH}`.")
    df = pd.read_csv(DATA_PATH, parse_dates=["fecha"])
    if "dia_semana" not in df.columns and "fecha" in df.columns:
        df["dia_semana"] = df["fecha"].dt.dayofweek
    return df
@st.cache_data
def load_competencia_nov() -> pd.DataFrame:
    """Precios por competidor en noviembre (para recalcular precio_competencia)."""
    if not RAW_PATH.exists():
        return pd.DataFrame()
    raw = pd.read_csv(RAW_PATH, parse_dates=["fecha"])
    raw = raw[raw["fecha"].dt.month == 11].copy()
    cols = ["fecha", "producto_id"] + [c for c in COMP_COLS if c in raw.columns]
    raw = raw[cols]
    for c in COMP_COLS:
        if c in raw.columns:
            raw[c] = pd.to_numeric(raw[c], errors="coerce")
    return raw
# ── Lógica de negocio ─────────────────────────────────────────────────────────
def recalc_precios(
    df: pd.DataFrame,
    descuento_pct: float,
    comp_mult: float,
    comp_nov: pd.DataFrame,
) -> pd.DataFrame:
    out = df.copy()
    out["precio_venta"] = out["precio_base"] * (1 + descuento_pct / 100)
    out["descuento_porcentaje"] = (
        (out["precio_venta"] - out["precio_base"]) / out["precio_base"]
    ) * 100
    if (
        not comp_nov.empty
        and all(c in comp_nov.columns for c in COMP_COLS)
        and "producto_id" in out.columns
    ):
        merged = out.merge(comp_nov, on=["fecha", "producto_id"], how="left")
        for c in COMP_COLS:
            merged[c] = merged[c] * comp_mult
        out["precio_competencia"] = merged[COMP_COLS].mean(axis=1).values
    else:
        out["precio_competencia"] = out["precio_competencia"] * comp_mult
    out["ratio_precio"] = out["precio_venta"] / out["precio_competencia"]
    return out
def predict_recursive(
    model,
    df_product: pd.DataFrame,
    descuento_pct: float,
    comp_mult: float,
    comp_nov: pd.DataFrame,
) -> pd.DataFrame:
    """
    Día 1: lags y mm7 del CSV.
    Días 2-30: lag1 = predicción anterior; lag2..7 desplazados; mm7 = media últimas predicciones.
    """
    work = recalc_precios(df_product, descuento_pct, comp_mult, comp_nov)
    work = work.sort_values("fecha").reset_index(drop=True)
    for col in LAG_COLS + [MM7_COL]:
        work[col] = work[col].astype(float)
    feature_cols = list(model.feature_names_in_)
    missing = [c for c in feature_cols if c not in work.columns]
    if missing:
        raise ValueError(f"Faltan columnas para el modelo: {missing[:5]}...")
    preds: list[float] = []
    for i in range(len(work)):
        row = work.loc[i].copy()
        if i > 0:
            prev_lags = [float(work.loc[i - 1, c]) for c in LAG_COLS]
            row[LAG_COLS[0]] = preds[-1]
            for j in range(2, 8):
                row[LAG_COLS[j - 1]] = prev_lags[j - 2]
            hist = preds[-7:] if len(preds) >= 7 else preds
            row[MM7_COL] = float(np.mean(hist))
            work.loc[i, LAG_COLS + [MM7_COL]] = row[LAG_COLS + [MM7_COL]].values
        X = pd.DataFrame([row[feature_cols]], columns=feature_cols).astype(float)
        y_hat = max(0.0, float(model.predict(X)[0]))
        preds.append(y_hat)
        work.loc[i, "unidades_predichas"] = y_hat
        work.loc[i, "ingresos_proyectados"] = y_hat * float(row["precio_venta"])
    return work
def build_detalle(df_res: pd.DataFrame) -> pd.DataFrame:
    if "dia_mes" not in df_res.columns:
        df_res = df_res.copy()
        df_res["dia_mes"] = df_res["fecha"].dt.day

    dia_idx = df_res["dia_semana"].astype(int)
    return pd.DataFrame(
        {
            "fecha": df_res["fecha"].dt.strftime("%d/%m/%Y"),
            "día": dia_idx.map(lambda d: DIAS_ES[d] if 0 <= d < 7 else str(d)),
            "precio_venta": df_res["precio_venta"].round(2),
            "precio_competencia": df_res["precio_competencia"].round(2),
            "descuento_%": df_res["descuento_porcentaje"].round(2),
            "unidades_predichas": df_res["unidades_predichas"].round(0).astype(int),
            "ingresos_proyectados": df_res["ingresos_proyectados"].round(2),
            "dia_mes": df_res["dia_mes"].astype(int),
        }
    )
def plot_prediccion_diaria(df_res: pd.DataFrame) -> plt.Figure:
    sns.set_theme(style="whitegrid", palette=PALETTE)
    fig, ax = plt.subplots(figsize=(11, 4.5))
    x = df_res["dia_mes"].astype(int)
    y = df_res["unidades_predichas"]
    sns.lineplot(
        x=x,
        y=y,
        ax=ax,
        color=PALETTE[0],
        linewidth=2.5,
        marker="o",
        markersize=4,
        legend=False,
    )
    bf = df_res[df_res["dia_mes"].astype(int) == BLACK_FRIDAY_DAY]
    if not bf.empty:
        y_bf = float(bf["unidades_predichas"].iloc[0])
        ax.axvline(
            BLACK_FRIDAY_DAY,
            color=PALETTE[1],
            linestyle="--",
            linewidth=2,
            alpha=0.9,
        )
        ax.scatter([BLACK_FRIDAY_DAY], [y_bf], color="red", s=120, zorder=5)
        ax.annotate(
            "Black Friday",
            xy=(BLACK_FRIDAY_DAY, y_bf),
            xytext=(max(1, BLACK_FRIDAY_DAY - 7), y_bf * 1.08 + max(y.max() * 0.02, 0.5)),
            arrowprops=dict(arrowstyle="->", color=PALETTE[1], lw=1.5),
            fontsize=11,
            fontweight="bold",
            color=PALETTE[1],
        )
    ax.set_title(
        "Unidades vendidas predichas — Noviembre 2025",
        fontsize=14,
        fontweight="bold",
        color="#333",
    )
    ax.set_xlabel("Día del mes")
    ax.set_ylabel("Unidades")
    ax.set_xticks(range(1, 31))
    ax.set_xlim(0.5, 30.5)
    fig.tight_layout()
    return fig
def style_tabla(det: pd.DataFrame) -> pd.io.formats.style.Styler:
    """Resalta Black Friday sin depender de dia_mes en la tabla mostrada."""

    def highlight_bf(row):
        dia = int(det.loc[row.name, "dia_mes"])
        if dia == BLACK_FRIDAY_DAY:
            return ["background-color: #ffe4e6; font-weight: 600"] * len(row)
        return [""] * len(row)

    show = det.copy()
    mask_bf = show["dia_mes"] == BLACK_FRIDAY_DAY
    show.loc[mask_bf, "fecha"] = "🛍️ " + show.loc[mask_bf, "fecha"].astype(str)

    # Tabla visible sin dia_mes; el estilo usa det.loc[row.name, "dia_mes"]
    show_display = show.drop(columns=["dia_mes"])

    return show_display.style.apply(highlight_bf, axis=1).format(
        {
            "precio_venta": "{:.2f} €".format,
            "precio_competencia": "{:.2f} €".format,
            "descuento_%": "{:.2f} %".format,
            "ingresos_proyectados": "{:.2f} €".format,
        }
    )
def run_all_scenarios(model, df_prod, descuento, comp_nov):
    comparativa = {}
    for nombre, mult in COMP_SCENARIOS.items():
        tmp = predict_recursive(model, df_prod, descuento, mult, comp_nov)
        comparativa[nombre] = {
            "unidades": int(tmp["unidades_predichas"].sum()),
            "ingresos": float(tmp["ingresos_proyectados"].sum()),
        }
    return comparativa
# ── Carga inicial ─────────────────────────────────────────────────────────────
try:
    model = load_model()
    df_all = load_base_data()
    comp_nov = load_competencia_nov()
except Exception as exc:
    st.error(f"❌ Error al cargar recursos: {exc}")
    st.stop()
productos = sorted(df_all["nombre"].dropna().unique())
if not productos:
    st.warning("No hay productos en el dataset.")
    st.stop()
if comp_nov.empty:
    st.sidebar.warning(
        "No se cargó competencia por tienda; se ajustará solo `precio_competencia`."
    )
# ── Sidebar ───────────────────────────────────────────────────────────────────
st.sidebar.header("🎛️ Controles de Simulación")
producto_sel = st.sidebar.selectbox("Producto", productos)
descuento = st.sidebar.slider(
    "Ajuste de descuento (%)",
    min_value=-50,
    max_value=50,
    value=0,
    step=5,
)
escenario_sel = st.sidebar.radio(
    "Escenario de competencia",
    list(COMP_SCENARIOS.keys()),
)
simular = st.sidebar.button("Simular Ventas", type="primary", use_container_width=True)
st.sidebar.markdown("---")
st.sidebar.info(
    "1. Elige producto, descuento y escenario.\n"
    "2. Pulsa **Simular Ventas**.\n"
    "3. Día 1 usa lags del CSV; días 2–30 actualizan lags y media móvil con predicciones."
)
# ── Zona principal ──────────────────────────────────────────────────────────────
st.title("📊 Dashboard de simulación — Noviembre 2025")
st.markdown(f"**Producto:** {producto_sel}")
if not simular and "resultado" not in st.session_state:
    st.info("👈 Configura los controles y pulsa **Simular Ventas** para ver resultados.")
    st.stop()
if simular:
    df_prod = df_all[df_all["nombre"] == producto_sel].copy()
    if df_prod.empty:
        st.error("No hay datos para el producto seleccionado.")
        st.stop()
    comp_mult = COMP_SCENARIOS[escenario_sel]
    with st.spinner("Ejecutando predicciones recursivas (30 días)…"):
        resultado = predict_recursive(model, df_prod, descuento, comp_mult, comp_nov)
    with st.spinner("Calculando comparativa de escenarios…"):
        comparativa = run_all_scenarios(model, df_prod, descuento, comp_nov)
    st.session_state["resultado"] = resultado
    st.session_state["comparativa"] = comparativa
    st.session_state["escenario"] = escenario_sel
    st.session_state["descuento"] = descuento
    st.session_state["producto"] = producto_sel
    st.success("Simulación completada.")
res = st.session_state["resultado"]
comp = st.session_state["comparativa"]
desc_guardado = st.session_state.get("descuento", descuento)
# ── KPIs ──────────────────────────────────────────────────────────────────────
st.markdown("---")
c1, c2, c3, c4 = st.columns(4)
c1.metric("Unidades totales proyectadas", fmt_int(res["unidades_predichas"].sum()))
c2.metric("Ingresos proyectados", fmt_eur(res["ingresos_proyectados"].sum()))
c3.metric("Precio medio de venta", fmt_eur(res["precio_venta"].mean()))
c4.metric("Descuento medio", f"{res['descuento_porcentaje'].mean():.2f} %")
# ── Gráfico ───────────────────────────────────────────────────────────────────
st.markdown("---")
st.subheader("📈 Predicción diaria de unidades")
fig = plot_prediccion_diaria(res)
st.pyplot(fig, clear_figure=True)
plt.close(fig)
# ── Tabla ─────────────────────────────────────────────────────────────────────
st.markdown("---")
st.subheader("📋 Detalle diario")
det = build_detalle(res)
st.dataframe(style_tabla(det), use_container_width=True, hide_index=True)
# ── Comparativa escenarios ────────────────────────────────────────────────────
st.markdown("---")
st.subheader("⚖️ Comparativa de escenarios de competencia")
st.caption(
    f"Descuento fijo en **{desc_guardado} %** — solo varía el precio de competencia."
)
cols = st.columns(3)
for col, (nombre, vals) in zip(cols, comp.items()):
    with col:
        st.markdown(f"#### {nombre}")
        st.metric("Unidades totales", fmt_int(vals["unidades"]))
        st.metric("Ingresos totales", fmt_eur(vals["ingresos"]))