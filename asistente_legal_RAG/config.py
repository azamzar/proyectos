import os

# Directorio base del proyecto (donde está este archivo)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Configuración de modelos
EMBEDDING_MODEL = "text-embedding-3-large"
QUERY_MODEL = "gpt-4o-mini"
GENERATION_MODEL = "gpt-4o"

# Configuración del vector store
CHROMA_DB_PATH = os.path.join(BASE_DIR, "chroma_db")

# Configuración del retriever
SEARCH_TYPE = "mmr"
MMR_DIVERSITY_LAMBDA = 0.7
MMR_FETCH_K = 20
SEARCH_K = 2

# Configuracion alternativa para retriever hibrido
ENABLE_HYBRID_SEARCH = True
SIMILARITY_THRESHOLD = 0.70

# Preguntas de ejemplo para la pantalla de bienvenida
EXAMPLE_QUESTIONS = [
    "¿Quiénes son las partes en los contratos de arrendamiento?",
    "¿Cuál es el importe mensual de la renta en cada contrato?",
    "¿Qué duración tienen los contratos de arrendamiento?",
    "¿Cuáles son las obligaciones del arrendatario?",
    "¿Qué condiciones de fianza se establecen en los contratos?",
    "¿Qué direcciones de propiedades aparecen en los contratos?",
]