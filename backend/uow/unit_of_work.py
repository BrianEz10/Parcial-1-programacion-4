from sqlmodel import Session
from database import engine
from repositories.categoria_repository import CategoriaRepository
from repositories.producto_repository import ProductoRepository
from repositories.ingrediente_repository import IngredienteRepository

class UnitOfWork:
    def __init__(self):
        self.session: Session = None
        self.categorias: CategoriaRepository = None
        self.productos: ProductoRepository = None
        self.ingredientes: IngredienteRepository = None

    def __enter__(self) -> "UnitOfWork":
        self.session = Session(engine, expire_on_commit=False)
        self.categorias = CategoriaRepository(self.session)
        self.productos = ProductoRepository(self.session)
        self.ingredientes = IngredienteRepository(self.session)
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type:
            self.session.rollback()
        else:
            self.session.commit()
        self.session.close()

    def flush(self):
        self.session.flush()
