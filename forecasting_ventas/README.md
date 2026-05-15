# 📈 Simulador de Ventas — Noviembre 2025
Aplicación web interactiva construida con **Streamlit** para simular y visualizar predicciones de unidades vendidas e ingresos durante **noviembre de 2025**, usando un modelo de machine learning entrenado (`HistGradientBoostingRegressor`) y escenarios de descuento y competencia.
---
## Descripción
El simulador permite:
- Elegir uno de los **24 productos** del catálogo.
- Ajustar el **descuento sobre precio base** (−50 % a +50 %).
- Probar **tres escenarios de competencia** (precios actuales, −5 %, +5 %).
- Obtener predicciones **día a día** con actualización **recursiva** de lags y media móvil.
- Visualizar KPIs, gráfico diario (con Black Friday marcado), tabla detallada y comparativa de escenarios.
Las predicciones del **día 1** usan los lags ya presentes en el dataset de inferencia. Del **día 2 al 30**, los lags y la media móvil de 7 días se actualizan con las predicciones anteriores.
---
## Estructura del proyecto
Forecasting Ventas/ ├── app/ │ └── app.py # Aplicación Streamlit ├── models/ │ └── modelo_final.joblib # Modelo entrenado (generar con notebook) ├── data/ │ ├── processed/ │ │ └── inferencia_df_transformado.csv # Features listas para inferencia (solo nov 2025) │ └── raw/ │ └── inferencia/ │ └── ventas_2025_inferencia.csv # Precios Amazon / Decathlon / Deporvillage ├── notebooks/ │ ├── entrenamiento.ipynb # Entrenamiento y guardado del modelo │ └── forecasting.ipynb # Preparación del CSV de inferencia ├── requirements.txt └── README.md

---
## Requisitos
- Python 3.10+ (recomendado)
- Dependencias en `requirements.txt`:
  - pandas, numpy, scikit-learn  
  - matplotlib, seaborn  
  - streamlit, joblib  
  - jupyter, holidays *(notebooks)*
---
## Instalación
1. **Clonar o abrir** la carpeta del proyecto.
2. **Crear y activar** un entorno virtual (opcional pero recomendado):
   ```bash
   conda create -n Forecasting python=3.11
   conda activate Forecasting
Instalar dependencias:

pip install -r requirements.txt
Generar el modelo (obligatorio la primera vez):

Abre y ejecuta notebooks/entrenamiento.ipynb hasta la celda que guarda el modelo.
Debe existir: models/modelo_final.joblib
Preparar datos de inferencia (si aún no existe el CSV procesado):

Ejecuta notebooks/forecasting.ipynb.
Debe existir: data/processed/inferencia_df_transformado.csv
Ejecución de la app
Desde la raíz del proyecto:

streamlit run app/app.py
Se abrirá el navegador (por defecto en http://localhost:8501).

Uso de la aplicación
Barra lateral — Controles de simulación
Control	Descripción
Producto
Selector con los 24 productos por nombre.
Ajuste de descuento (%)
Slider de −50 % a +50 % (pasos de 5 %). Modifica precio_venta sobre precio_base.
Escenario de competencia
Actual (0 %), Competencia −5 %, Competencia +5 %.
Simular Ventas
Ejecuta la predicción recursiva y actualiza el dashboard.
Zona principal
KPIs: unidades totales, ingresos, precio medio y descuento medio.
Gráfico diario: una línea de unidades predichas (días 1–30); Black Friday (día 28) resaltado.
Tabla detallada: fecha, día, precios, descuento, unidades e ingresos por día.
Comparativa de escenarios: totales de unidades e ingresos para los 3 escenarios de competencia (mismo descuento).
Lógica de predicción
Se filtra el dataset por producto y noviembre.
Se recalculan precio_venta, descuento_porcentaje, precio_competencia y ratio_precio según los controles.
Día 1: se usan unidades_vendidas_lag1…lag7 y unidades_vendidas_mm7 del CSV.
Días 2–30:
lag1 ← predicción del día anterior
lag2…lag7 ← desplazamiento de lags previos
mm7 ← media de las últimas predicciones (hasta 7)
Las features enviadas al modelo son las definidas en model.feature_names_in_ (mismas que en entrenamiento).
Fórmulas de precio (alineadas con el notebook de entrenamiento):

precio_venta = precio_base × (1 + descuento% / 100)
descuento_porcentaje = ((precio_venta - precio_base) / precio_base) × 100
precio_competencia = media(Amazon, Decathlon, Deporvillage)
ratio_precio = precio_venta / precio_competencia
Columnas importantes del dataset
En inferencia_df_transformado.csv los nombres reales son:

Concepto	Nombre en CSV
Lags 1–7
unidades_vendidas_lag1 … unidades_vendidas_lag7
Media móvil 7 días
unidades_vendidas_mm7
Fin de semana
es_fin_de_semana
Nota: El CSV transformado no incluye las columnas Amazon, Decathlon y Deporvillage; la app las toma de ventas_2025_inferencia.csv (noviembre) para recalcular precio_competencia en cada escenario.

# Solución de problemas
No se encontró el modelo en ... app\models\...
El modelo debe estar en models/modelo_final.joblib en la raíz del proyecto, no dentro de app/.
Ejecuta entrenamiento.ipynb para generarlo.
La app resuelve la raíz subiendo un nivel desde app/ si detecta la carpeta data/.
TypeError: Invalid value '6.31...' for dtype 'int64'
Las columnas de lag y mm7 deben convertirse a float antes de asignar predicciones (el modelo devuelve decimales).
KeyError: 'dia_mes' en la tabla estilizada
No eliminar dia_mes antes de aplicar el estilo; usar det.loc[row.name, "dia_mes"] para resaltar Black Friday.
Lags del día 1 en cero
Si todos los lags del 1 de noviembre son 0, regenera el CSV en forecasting.ipynb calculando lags antes de filtrar solo noviembre (mismo código que en entrenamiento.ipynb).
Modelo
Algoritmo: sklearn.ensemble.HistGradientBoostingRegressor
Target: unidades_vendidas
Excluidas del entrenamiento: fecha, ingresos, unidades_vendidas
Artefacto: models/modelo_final.joblib
Licencia y autoría
Proyecto de forecasting de ventas — uso educativo / interno.
Ajusta esta sección según tu contexto (autor, licencia, contacto).

Comandos rápidos
# Instalar
pip install -r requirements.txt
# Entrenar modelo (notebook)
jupyter notebook notebooks/entrenamiento.ipynb
# Lanzar app
streamlit run app/app.py