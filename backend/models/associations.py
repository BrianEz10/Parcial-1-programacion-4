from __future__ import annotations
from typing import Optional
from sqlmodel import Field, SQLModel
from sqlalchemy.orm import relationship


class ProductoCategoria(SQLModel, table=True):
    __tablename__ = "producto_categoria"

    producto_id: Optional[int] = Field(
        default=None, foreign_key="producto.id", primary_key=True
    )
    categoria_id: Optional[int] = Field(
        default=None, foreign_key="categoria.id", primary_key=True
    )
    es_principal: bool = Field(default=False)

ProductoCategoria.producto = relationship(
    "Producto", back_populates="categoria_links", lazy="joined"
)
ProductoCategoria.categoria = relationship(
    "Categoria", back_populates="producto_links", lazy="joined"
)

class ProductoIngrediente(SQLModel, table=True):
    __tablename__ = "producto_ingrediente"

    producto_id: Optional[int] = Field(
        default=None, foreign_key="producto.id", primary_key=True
    )
    ingrediente_id: Optional[int] = Field(
        default=None, foreign_key="ingrediente.id", primary_key=True
    )
    es_removible: bool = Field(default=False)

ProductoIngrediente.producto = relationship(
    "Producto", back_populates="ingrediente_links", lazy="joined"
)
ProductoIngrediente.ingrediente = relationship(
    "Ingrediente", back_populates="producto_links", lazy="joined"
)
