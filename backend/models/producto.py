from __future__ import annotations
from datetime import datetime
from typing import Optional, List
from sqlmodel import Field, SQLModel
from sqlalchemy import Column
from sqlalchemy.dialects.postgresql import ARRAY, TEXT
from sqlalchemy.orm import relationship


class Producto(SQLModel, table=True):
    __tablename__ = "producto"

    id: Optional[int] = Field(default=None, primary_key=True)
    nombre: str = Field(min_length=2, max_length=150, nullable=False)
    descripcion: Optional[str] = Field(default=None, max_length=1000)
    precio_base: float = Field(ge=0.0, nullable=False)
    imagenes_url: Optional[List[str]] = Field(
        default=None, sa_column=Column(ARRAY(TEXT))
    )
    stock_cantidad: int = Field(default=0, ge=0, nullable=False)
    disponible: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    updated_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    deleted_at: Optional[datetime] = Field(default=None)


Producto.categoria_links = relationship(
    "ProductoCategoria",
    back_populates="producto",
    lazy="joined",
)
Producto.ingrediente_links = relationship(
    "ProductoIngrediente",
    back_populates="producto",
    lazy="joined",
)
