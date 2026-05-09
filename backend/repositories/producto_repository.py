from sqlmodel import Session
from models.producto import Producto
from .base import BaseRepository

class ProductoRepository(BaseRepository[Producto]):
    def __init__(self, session: Session):
        super().__init__(session, Producto)
