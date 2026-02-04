import sys
import os
print("Testing imports...")

try:
    from langchain_community.vectorstores import Chroma
    print("✓ Chroma imported successfully")
except Exception as e:
    print(f"✗ Chroma import failed: {e}")
    sys.exit(1)

try:
    from langchain_openai import OpenAIEmbeddings
    print("✓ OpenAIEmbeddings imported successfully")
except Exception as e:
    print(f"✗ OpenAIEmbeddings import failed: {e}")
    sys.exit(1)

try:
    vectorstore = Chroma(
        embedding_function=OpenAIEmbeddings(model="text-embedding-3-large"),
        persist_directory=os.path.join(os.path.dirname(os.path.abspath(__file__)), "chroma_db")
    )
    print("✓ Vectorstore loaded successfully")
    
    # Try to get count
    count = vectorstore._collection.count()
    print(f"✓ Database contains {count} documents")
    
    # Try a simple search
    results = vectorstore.similarity_search("contrato arrendamiento", k=2)
    print(f"✓ Search returned {len(results)} results")
    
    if results:
        print("\nFirst result preview:")
        print(f"Content: {results[0].page_content[:200]}...")
        print(f"Metadata: {results[0].metadata}")
    
except Exception as e:
    print(f"✗ Vectorstore operation failed: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

print("\n✓ All tests passed!")
