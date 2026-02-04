# Asistente Legal RAG

Aplicacion de consulta inteligente de contratos de arrendamiento desarrollada como ejercicio del **Tema 3** del curso de LangChain. Utiliza un pipeline RAG (Retrieval-Augmented Generation) para responder preguntas sobre documentos legales de forma precisa y contextualizada.

## Funcionamiento

1. **Ingesta de documentos**: Los contratos de arrendamiento (PDF) se procesan, dividen en fragmentos y almacenan como embeddings en una base de datos vectorial ChromaDB.
2. **Recuperacion (Retrieval)**: Ante una consulta del usuario, se emplean multiples estrategias de busqueda:
   - **MMR (Maximal Marginal Relevance)**: Balancea relevancia y diversidad en los resultados.
   - **MultiQueryRetriever**: Genera variaciones de la consulta original para ampliar la cobertura de busqueda.
   - **EnsembleRetriever**: Combina los resultados de MMR y busqueda por similitud con pesos configurables.
3. **Generacion (Generation)**: Los fragmentos recuperados se inyectan como contexto en un prompt especializado y un LLM (GPT-4o) genera la respuesta final.

## Estructura del proyecto

```
asistente_legal_RAG/
├── app.py            # Interfaz Streamlit (chat, documentos, exportacion)
├── rag_system.py     # Pipeline RAG (retrievers, chains, streaming)
├── config.py         # Configuracion de modelos, retriever y parametros
├── prompts.py        # Prompts del sistema (RAG, MultiQuery, relevancia)
└── README.md         # Este archivo
```

## Requisitos

- Python 3.10+
- API Key de OpenAI (configurada como variable de entorno `OPENAI_API_KEY`)
- Base de datos ChromaDB prepoblada con los contratos (ver `CHROMA_DB_PATH` en `config.py`)

### Dependencias

```
langchain
langchain-community
langchain-openai
chromadb
streamlit
```

Instalar con:

```bash
pip install langchain langchain-community langchain-openai chromadb streamlit
```

## Ejecucion

```bash
streamlit run app.py
```

La aplicacion se abrira en el navegador en `http://localhost:8501`.

## Tecnologias

- **LangChain** - Orquestacion del pipeline RAG, retrievers y chains
- **OpenAI** - Modelos GPT-4o (generacion), GPT-4o-mini (consultas), text-embedding-3-large (embeddings)
- **ChromaDB** - Base de datos vectorial para almacenamiento y busqueda de embeddings
- **Streamlit** - Interfaz web interactiva con chat, streaming y exportacion
