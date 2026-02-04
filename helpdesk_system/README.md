# Helpdesk 2.0 con RAG + LangGraph

> Caso de estudio del Tema 4 del curso de LangChain, con mejoras personales sobre el material original.

## Descripcion

Sistema de helpdesk inteligente que combina **LangGraph** para orquestacion de flujos con **RAG (Retrieval-Augmented Generation)** sobre una base de conocimiento vectorial en **ChromaDB**. Incluye clasificacion automatica de tickets, escalado a agentes humanos (Human-in-the-Loop) y una interfaz web con Streamlit.

## Arquitectura

```
                    +------------------+
                    |   Usuario (UI)   |
                    |   Streamlit      |
                    +--------+---------+
                             |
                             v
                    +--------+---------+
                    |   LangGraph      |
                    |   (graph.py)     |
                    +--------+---------+
                             |
               +-------------+-------------+
               |                           |
               v                           v
    +----------+----------+     +----------+----------+
    |   RAG System        |     |   Clasificacion     |
    |   (rag_system.py)   |     |   LLM (GPT-4o-mini) |
    +----------+----------+     +----------+----------+
               |                           |
               v                           v
    +----------+----------+     +----------+----------+
    |   ChromaDB          |     |   Respuesta Final / |
    |   (vectorstore)     |     |   Escalado Humano   |
    +---------------------+     +---------------------+
```

## Tecnologias

- **LangChain** + **LangGraph**: Orquestacion del flujo con grafos de estado
- **OpenAI GPT-4o-mini**: LLM para clasificacion y generacion de respuestas
- **ChromaDB**: Base de datos vectorial para RAG
- **MultiQueryRetriever**: Busqueda avanzada con multiples reformulaciones
- **Streamlit**: Interfaz web interactiva
- **SQLite**: Checkpointing para persistencia del estado del grafo

## Instalacion

1. Clonar el repositorio:
   ```bash
   git clone <url-del-repo>
   cd helpdesk_system
   ```

2. Crear entorno virtual:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   venv\Scripts\activate     # Windows
   ```

3. Instalar dependencias:
   ```bash
   pip install -r requirements.txt
   ```

4. Configurar variables de entorno:
   ```bash
   cp .env.example .env
   # Editar .env con tu API key de OpenAI
   ```

5. Configurar el sistema RAG:
   ```bash
   python setup_rag.py
   ```

6. Ejecutar la aplicacion:
   ```bash
   streamlit run app.py
   ```

## Mejoras personales sobre el curso original

- **Configuracion centralizada** (`config.py`): Rutas relativas con `pathlib`, variables de entorno con `python-dotenv`, todos los valores hardcodeados centralizados
- **Logging estructurado**: Reemplazo de `print()` por `logging` con formato y nivel configurable
- **Manejo de errores especifico**: Excepciones especificas (`openai.APIError`, `RateLimitError`) con retry automatico y backoff exponencial
- **Validacion de entrada**: Validacion de longitud de consulta y formato de email en la UI
- **Feedback del usuario**: Botones de valoracion (util/no util) por ticket con metricas en el sidebar
- **Tests unitarios**: Tests para calculo de confianza y funciones de enrutamiento del grafo
- **Seguridad**: `.gitignore` para excluir archivos sensibles, `.env.example` como referencia

## Tests

```bash
pytest tests/ -v
```

## Estructura del proyecto

```
helpdesk_system/
├── app.py                 # Interfaz web Streamlit
├── graph.py               # Grafo LangGraph (flujo del helpdesk)
├── rag_system.py          # Sistema RAG con ChromaDB
├── setup_rag.py           # Configuracion inicial del RAG
├── config.py              # Configuracion centralizada
├── requirements.txt       # Dependencias
├── .env.example           # Plantilla de variables de entorno
├── .gitignore             # Archivos ignorados por git
├── docs/                  # Documentos de la base de conocimiento
│   └── *.md
├── tests/
│   ├── __init__.py
│   ├── conftest.py
│   ├── test_confianza.py
│   └── test_clasificacion.py
└── README.md
```
