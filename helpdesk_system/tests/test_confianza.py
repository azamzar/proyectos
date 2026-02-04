"""Tests para VectorRAGSystem._calcular_confianza."""
from unittest.mock import MagicMock, patch
import pytest


@pytest.fixture
def rag_system():
    """Crea una instancia de VectorRAGSystem sin conectar a ChromaDB."""
    with patch("rag_system.OpenAIEmbeddings"), \
         patch("rag_system.ChatOpenAI"):
        from rag_system import VectorRAGSystem
        sistema = VectorRAGSystem.__new__(VectorRAGSystem)
        sistema.chroma_path = MagicMock()
        sistema.embeddings = MagicMock()
        sistema.llm = MagicMock()
        sistema.vectorstore = None
        sistema.retriever = None
        return sistema


def _crear_doc(contenido: str) -> MagicMock:
    """Helper para crear un documento mock."""
    doc = MagicMock()
    doc.page_content = contenido
    return doc


class TestCalcularConfianza:
    def test_sin_documentos_retorna_cero(self, rag_system):
        assert rag_system._calcular_confianza("consulta", []) == 0.0

    def test_con_coincidencias_retorna_valor_positivo(self, rag_system):
        docs = [_crear_doc("resetear contrasena del sistema")]
        confianza = rag_system._calcular_confianza("resetear contrasena", docs)
        assert 0.0 < confianza <= 1.0

    def test_sin_coincidencias_retorna_valor_bajo(self, rag_system):
        docs = [_crear_doc("informacion sobre facturacion mensual")]
        confianza = rag_system._calcular_confianza("resetear contrasena", docs)
        assert confianza < 0.5

    def test_multiples_docs_dan_bonus(self, rag_system):
        docs_uno = [_crear_doc("resetear contrasena del sistema")]
        docs_varios = [
            _crear_doc("resetear contrasena del sistema"),
            _crear_doc("como resetear la contrasena paso a paso"),
            _crear_doc("manual de reseteo de contrasena"),
            _crear_doc("guia de contrasena y reseteo"),
        ]
        confianza_uno = rag_system._calcular_confianza("resetear contrasena", docs_uno)
        confianza_varios = rag_system._calcular_confianza("resetear contrasena", docs_varios)
        assert confianza_varios >= confianza_uno

    def test_nunca_supera_uno(self, rag_system):
        docs = [_crear_doc("a " * 2000) for _ in range(5)]
        confianza = rag_system._calcular_confianza("a b c", docs)
        assert confianza <= 1.0

    def test_palabras_cortas_ignoradas(self, rag_system):
        docs = [_crear_doc("el es un en la de")]
        confianza = rag_system._calcular_confianza("el en la de un", docs)
        # Todas las palabras tienen <= 2 caracteres, no deberian contar como coincidencias
        assert confianza < 0.5
