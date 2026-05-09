from sqlmodel import Session
from models.categoria import Categoria
from .base import BaseRepository

class CategoriaRepository(BaseRepository[Categoria]):
    def __init__(self, session: Session):
        super().__init__(session, Categoria)
