# Chat Multi-Usuario con Memoria Avanzada

> Ejercicio del **Tema 5** del curso de LangChain. El objetivo es construir un sistema de chat multi-usuario con memoria avanzada usando LangGraph, LangChain y ChromaDB.

Chatbot multi-usuario con interfaz estilo ChatGPT construido con **Streamlit**, **LangGraph** y **LangChain**. Cada usuario tiene su propio historial de conversaciones persistente y una memoria vectorial que extrae y recuerda informacion relevante entre chats.

## Caracteristicas

- **Multi-usuario** — Cada usuario tiene su espacio aislado con datos, chats y memorias independientes.
- **Memoria conversacional** — LangGraph + SQLite persisten el historial de cada chat con checkpointing.
- **Memoria vectorial transversal** — ChromaDB almacena informacion extraida automaticamente (datos personales, preferencias, hechos importantes) y la recupera por similitud semantica en cualquier chat del usuario.
- **Extraccion inteligente** — Un LLM analiza cada mensaje y decide si contiene informacion que merece recordarse, clasificandola por categoria e importancia.
- **Gestion de contexto** — `trim_messages` mantiene el contexto dentro de los limites de tokens del modelo.
- **Interfaz ChatGPT-like** — Sidebar con historial de chats, creacion/eliminacion de conversaciones y visor de memorias.

## Arquitectura

```
Usuario escribe mensaje
        |
        v
[memory_retrieval] --> Busca memorias vectoriales relevantes en ChromaDB
        |
        v
[context_optimization] --> Aplica trim_messages al historial
        |
        v
[response_generation] --> Genera respuesta con contexto + memorias
        |
        v
[memory_extraction] --> Extrae y guarda nuevas memorias si procede
```

## Requisitos previos

- Python 3.10+
- Una API key de OpenAI

## Instalacion

1. Clona el repositorio:

```bash
git clone <url-del-repo>
cd multiuser_chat_system
```

2. Crea y activa un entorno virtual:

```bash
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/macOS
source venv/bin/activate
```

3. Instala las dependencias:

```bash
pip install -r requirements.txt
```

4. Configura las variables de entorno. Copia el archivo de ejemplo y anade tu API key:

```bash
cp .env.example .env
```

Edita `.env` y sustituye el valor:

```
OPENAI_API_KEY=sk-...
```

## Uso

```bash
streamlit run app.py
```

La aplicacion se abrira en `http://localhost:8501`.

1. Crea un usuario en la barra lateral.
2. Haz clic en **Nuevo Chat** para iniciar una conversacion.
3. El sistema recordara automaticamente informacion importante entre conversaciones.
4. Usa el boton **Ver Todas las Memorias** para inspeccionar que ha almacenado el sistema.

## Estructura del proyecto

```
multiuser_chat_system/
├── app.py               # Interfaz Streamlit (UI principal)
├── chatbot.py           # Pipeline LangGraph (grafo de nodos)
├── memory_manager.py    # Memoria vectorial ChromaDB + gestion de chats
├── config.py            # Configuracion centralizada
├── utils.py             # Utilidades auxiliares (formateo, validacion)
├── requirements.txt     # Dependencias
├── .env.example         # Plantilla de variables de entorno
└── .gitignore
```

Las carpetas `users/` y `data/` se crean automaticamente en tiempo de ejecucion.

## Modelo

Por defecto usa `gpt-4o-mini`. Se puede cambiar en `config.py` modificando `DEFAULT_MODEL` y `DEFAULT_TEMPERATURE`.
