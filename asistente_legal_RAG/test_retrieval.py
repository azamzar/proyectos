from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_classic.retrievers.multi_query import MultiQueryRetriever
from config import *

# Cargar vector store
vectorstore = Chroma(
    embedding_function=OpenAIEmbeddings(model=EMBEDDING_MODEL),
    persist_directory=CHROMA_DB_PATH
)

# Verificar cantidad de documentos
print(f"Total de documentos en la base de datos: {vectorstore._collection.count()}")

# Probar búsqueda directa
query = "Qué personas participan en los contratos de arrendamiento de locales comerciales?"
print(f"\n=== Búsqueda directa con similarity ===")
print(f"Query: {query}\n")

results = vectorstore.similarity_search(query, k=3)
print(f"Documentos encontrados: {len(results)}\n")

for i, doc in enumerate(results, 1):
    print(f"--- Documento {i} ---")
    print(f"Contenido: {doc.page_content[:300]}...")
    print(f"Metadata: {doc.metadata}")
    print()

# Probar con retriever básico
print("\n=== Prueba con retriever MMR ===")
base_retriever = vectorstore.as_retriever(
    search_type="mmr",
    search_kwargs={
        "k": 3,
        "lambda_mult": 0.7,
        "fetch_k": 20
    }
)

results_mmr = base_retriever.invoke(query)
print(f"Documentos encontrados con MMR: {len(results_mmr)}\n")

for i, doc in enumerate(results_mmr, 1):
    print(f"--- Documento {i} ---")
    print(f"Contenido: {doc.page_content[:300]}...")
    print(f"Metadata: {doc.metadata}")
    print()

# Probar MultiQueryRetriever
print("\n=== Prueba con MultiQueryRetriever ===")
llm = ChatOpenAI(model=QUERY_MODEL, temperature=0)
multi_retriever = MultiQueryRetriever.from_llm(
    retriever=base_retriever,
    llm=llm
)

results_multi = multi_retriever.invoke(query)
print(f"Documentos encontrados con MultiQuery: {len(results_multi)}\n")

for i, doc in enumerate(results_multi, 1):
    print(f"--- Documento {i} ---")
    print(f"Contenido: {doc.page_content[:300]}...")
    print(f"Metadata: {doc.metadata}")
    print()
