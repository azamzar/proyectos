import streamlit as st
from datetime import datetime
from rag_system import query_rag_stream, get_retriever_info
from config import EXAMPLE_QUESTIONS

# Configuracion de la pagina
st.set_page_config(
    page_title="Sistema RAG - Asistente Legal",
    page_icon="&#9878;",
    layout="wide"
)

# CSS personalizado
st.markdown("""
<style>
    /* Paleta profesional legal */
    :root {
        --legal-navy: #1B2A4A;
        --legal-gold: #C9A84C;
        --legal-dark: #0F1923;
        --legal-gray: #2D3748;
        --legal-light: #E2E8F0;
        --confidence-high: #38A169;
        --confidence-mid: #D69E2E;
        --confidence-low: #E53E3E;
    }

    /* Header */
    .legal-header {
        background: linear-gradient(135deg, var(--legal-navy) 0%, var(--legal-dark) 100%);
        padding: 1.5rem 2rem;
        border-radius: 12px;
        margin-bottom: 1.5rem;
        border-left: 4px solid var(--legal-gold);
    }
    .legal-header h1 {
        color: #FFFFFF;
        font-size: 1.8rem;
        margin: 0;
        font-weight: 700;
    }
    .legal-header p {
        color: var(--legal-light);
        margin: 0.3rem 0 0 0;
        font-size: 0.95rem;
        opacity: 0.85;
    }

    /* Welcome screen */
    .welcome-container {
        text-align: center;
        padding: 2rem 1rem;
    }
    .welcome-container h3 {
        color: var(--legal-navy);
        margin-bottom: 0.5rem;
    }
    .welcome-container p {
        color: #666;
        margin-bottom: 1.5rem;
    }

    /* Document cards */
    .doc-card {
        background: #FFFFFF;
        border: 1px solid #E2E8F0;
        border-left: 4px solid var(--legal-gold);
        border-radius: 8px;
        padding: 1rem;
        margin-bottom: 0.75rem;
        transition: box-shadow 0.2s;
    }
    .doc-card:hover {
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .doc-card.vivienda { border-left-color: #3182CE; }
    .doc-card.local { border-left-color: #38A169; }
    .doc-card.garaje { border-left-color: #D69E2E; }

    .doc-card-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
    }
    .doc-card-header .icon {
        font-size: 1.3rem;
    }
    .doc-card-header .title {
        font-weight: 600;
        color: var(--legal-navy);
        font-size: 0.95rem;
    }

    .badge {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 600;
        margin-right: 0.4rem;
    }
    .badge-source {
        background: #EBF4FF;
        color: #2B6CB0;
    }
    .badge-page {
        background: #F0FFF4;
        color: #276749;
    }

    .doc-content {
        font-size: 0.85rem;
        color: #4A5568;
        line-height: 1.5;
        max-height: 200px;
        overflow-y: auto;
        padding: 0.5rem;
        background: #F7FAFC;
        border-radius: 4px;
        margin-top: 0.5rem;
    }

    /* Confidence badge */
    .confidence-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 4px 12px;
        border-radius: 16px;
        font-size: 0.8rem;
        font-weight: 600;
        margin-top: 0.5rem;
    }
    .confidence-alto {
        background: #F0FFF4;
        color: var(--confidence-high);
        border: 1px solid var(--confidence-high);
    }
    .confidence-medio {
        background: #FFFFF0;
        color: var(--confidence-mid);
        border: 1px solid var(--confidence-mid);
    }
    .confidence-bajo {
        background: #FFF5F5;
        color: var(--confidence-low);
        border: 1px solid var(--confidence-low);
    }

    /* Sidebar */
    section[data-testid="stSidebar"] {
        background: linear-gradient(180deg, var(--legal-navy) 0%, var(--legal-dark) 100%);
        color: #E2E8F0;
    }
    section[data-testid="stSidebar"] * {
        color: #E2E8F0 !important;
    }
    section[data-testid="stSidebar"] .stMarkdown h2 {
        color: #FFFFFF !important;
        font-size: 1.1rem;
        border-bottom: 2px solid var(--legal-gold);
        padding-bottom: 0.4rem;
    }
    section[data-testid="stSidebar"] .stMetric label {
        color: #A0AEC0 !important;
    }
    section[data-testid="stSidebar"] .stMetric [data-testid="stMetricValue"] {
        color: var(--legal-gold) !important;
        font-size: 1.5rem !important;
    }
    section[data-testid="stSidebar"] button {
        background: var(--legal-gold) !important;
        color: var(--legal-dark) !important;
        border: none !important;
        font-weight: 600 !important;
    }
    section[data-testid="stSidebar"] button:hover {
        opacity: 0.85;
    }

    /* Docs counter */
    .docs-counter {
        background: var(--legal-navy);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        text-align: center;
        font-weight: 600;
        margin-bottom: 1rem;
        font-size: 0.9rem;
    }

    /* Footer */
    .legal-footer {
        text-align: center;
        color: #999;
        font-size: 0.8rem;
        padding: 1rem;
        border-top: 1px solid #E2E8F0;
        margin-top: 2rem;
    }
</style>
""", unsafe_allow_html=True)

# Header
st.markdown("""
<div class="legal-header">
    <h1>&#9878;&#65039; Asistente Legal RAG</h1>
    <p>Consulta inteligente de contratos de arrendamiento mediante Retrieval-Augmented Generation</p>
</div>
""", unsafe_allow_html=True)

# Inicializar el historial de chat
if "messages" not in st.session_state:
    st.session_state.messages = []

# Sidebar
with st.sidebar:
    st.markdown("## &#9881;&#65039; Configuracion")

    retriever_info = get_retriever_info()

    st.metric(label="Retriever", value=retriever_info['tipo'])
    st.metric(label="Documentos por consulta", value=retriever_info['documentos'])
    st.metric(label="Diversidad MMR", value=retriever_info['diversidad'])

    st.markdown("---")
    st.markdown("## &#129302; Modelos")
    st.markdown("**Consultas:** GPT-4o-mini")
    st.markdown("**Respuestas:** GPT-4o")

    st.markdown("---")

    # Boton limpiar chat
    if st.button("&#128465; Limpiar Chat", type="secondary", use_container_width=True):
        st.session_state.messages = []
        st.rerun()

    st.markdown("---")

    # Exportar conversacion
    if st.session_state.messages:
        lines = [
            "=== Asistente Legal RAG - Conversacion ===",
            f"Fecha: {datetime.now().strftime('%d/%m/%Y %H:%M')}",
            "",
        ]
        for msg in st.session_state.messages:
            role = "Usuario" if msg["role"] == "user" else "Asistente"
            lines.append(f"[{role}]: {msg['content']}")
            if msg.get("docs"):
                docs_str = ", ".join(
                    f"{d['fuente']} (p. {d['pagina']})" for d in msg["docs"]
                )
                lines.append(f"   Documentos consultados: {docs_str}")
            lines.append("---")

        conversation_text = "\n".join(lines)
        st.download_button(
            label="&#128229; Descargar conversacion",
            data=conversation_text,
            file_name=f"conversacion_legal_{datetime.now().strftime('%Y%m%d_%H%M')}.txt",
            mime="text/plain",
            use_container_width=True,
        )


def get_contract_type(source_name):
    """Infiere el tipo de contrato del nombre del archivo fuente."""
    name_lower = source_name.lower()
    if "vivienda" in name_lower:
        return "vivienda", "&#127968;", "vivienda"
    elif "local" in name_lower:
        return "local", "&#127978;", "local"
    elif "garaje" in name_lower or "garage" in name_lower or "parking" in name_lower:
        return "garaje", "&#128663;", "garaje"
    return "contrato", "&#128196;", ""


def render_confidence(confidence):
    """Renderiza el badge de confianza."""
    nivel = confidence["nivel"]
    icons = {"alto": "&#9989;", "medio": "&#9888;&#65039;", "bajo": "&#10060;"}
    labels = {"alto": "Confianza alta", "medio": "Confianza media", "bajo": "Confianza baja"}
    st.markdown(
        f'<div class="confidence-badge confidence-{nivel}">'
        f'{icons[nivel]} {labels[nivel]} &mdash; {confidence["mensaje"]}'
        f'</div>',
        unsafe_allow_html=True,
    )


def render_docs_panel(docs):
    """Renderiza el panel de documentos con cards mejoradas."""
    if not docs:
        st.info("No se encontraron documentos relevantes para esta consulta.")
        return

    st.markdown(
        f'<div class="docs-counter">&#128218; {len(docs)} documento(s) consultado(s)</div>',
        unsafe_allow_html=True,
    )

    for doc in docs:
        tipo, icon, css_class = get_contract_type(doc["fuente"])
        st.markdown(
            f'<div class="doc-card {css_class}">'
            f'  <div class="doc-card-header">'
            f'    <span class="icon">{icon}</span>'
            f'    <span class="title">Fragmento {doc["fragmento"]} &mdash; {tipo.capitalize()}</span>'
            f'  </div>'
            f'  <div>'
            f'    <span class="badge badge-source">&#128193; {doc["fuente"]}</span>'
            f'    <span class="badge badge-page">&#128196; Pag. {doc["pagina"]}</span>'
            f'  </div>'
            f'  <div class="doc-content">{doc["contenido"]}</div>'
            f'</div>',
            unsafe_allow_html=True,
        )


# Layout principal
col1, col2 = st.columns([2, 1])

with col2:
    st.markdown("### &#128196; Documentos Relevantes")
    if st.session_state.messages:
        last_assistant = None
        for msg in reversed(st.session_state.messages):
            if msg["role"] == "assistant":
                last_assistant = msg
                break
        if last_assistant and last_assistant.get("docs"):
            render_docs_panel(last_assistant["docs"])
            if last_assistant.get("confidence"):
                render_confidence(last_assistant["confidence"])

with col1:
    # Pantalla de bienvenida o chat
    if not st.session_state.messages:
        st.markdown(
            '<div class="welcome-container">'
            "<h3>&#128075; Bienvenido al Asistente Legal</h3>"
            "<p>Puedo ayudarte a consultar informacion sobre contratos de arrendamiento. "
            "Selecciona una pregunta de ejemplo o escribe la tuya propia.</p>"
            "</div>",
            unsafe_allow_html=True,
        )

        cols = st.columns(2)
        for i, question in enumerate(EXAMPLE_QUESTIONS):
            with cols[i % 2]:
                if st.button(question, key=f"example_{i}", use_container_width=True):
                    st.session_state.messages.append({"role": "user", "content": question})
                    st.session_state["_pending_question"] = question
                    st.rerun()
    else:
        st.markdown("### &#128172; Chat")
        for message in st.session_state.messages:
            with st.chat_message(message["role"]):
                st.markdown(message["content"])
                if message["role"] == "assistant" and message.get("confidence"):
                    render_confidence(message["confidence"])

# Procesar pregunta pendiente (de boton de ejemplo)
if st.session_state.get("_pending_question"):
    pending = st.session_state.pop("_pending_question")
    with col1:
        with st.chat_message("assistant"):
            stream, docs, confidence = query_rag_stream(pending)
            response = st.write_stream(stream)
        st.session_state.messages.append({
            "role": "assistant",
            "content": response,
            "docs": docs,
            "confidence": confidence,
        })
    st.rerun()

# Input del usuario
if prompt := st.chat_input("Escribe tu consulta sobre contratos de arrendamiento..."):
    st.session_state.messages.append({"role": "user", "content": prompt})

    with col1:
        with st.chat_message("user"):
            st.markdown(prompt)
        with st.chat_message("assistant"):
            stream, docs, confidence = query_rag_stream(prompt)
            response = st.write_stream(stream)

    st.session_state.messages.append({
        "role": "assistant",
        "content": response,
        "docs": docs,
        "confidence": confidence,
    })
    st.rerun()

# Footer
st.markdown(
    '<div class="legal-footer">&#127963;&#65039; Asistente Legal RAG &mdash; '
    "MMR + MultiQuery + Ensemble Retriever</div>",
    unsafe_allow_html=True,
)
