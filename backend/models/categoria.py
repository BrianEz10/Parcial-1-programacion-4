from __future__ import annotations
from datetime import datetime
from typing import Optional
from sqlmodel import Field, SQLModel
from sqlalchemy.orm import relationship


class Categoria(SQLModel, table=True):
    __tablename__ = "categoria"

    id: Optional[int] = Field(default=None, primary_key=True)
    parent_id: Optional[int] = Field(default=None, foreign_key="categoria.id")
    nombre: str = Field(min_length=2, max_length=100, nullable=False, index=True)
    descripcion: Optional[str] = Field(default=None, max_length=500)
    imagen_url: Optional[str] = Field(default=None, max_length=2048)
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    updated_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    deleted_at: Optional[datetime] = Field(default=None)

Categoria.subcategorias = relationship(
    "Categoria",
    back_populates="parent",
    lazy="joined",
    foreign_keys="[Categoria.parent_id]",
    join_depth=2,
)
Categoria.parent = relationship(
    "Categoria",
    back_populates="subcategorias",
    lazy="joined",
    remote_side="[Categoria.id]",
    foreign_keys="[Categoria.parent_id]",
    overlaps="subcategorias",
)
Categoria.producto_links = relationship(
    "ProductoCategoria",
    back_populates="categoria",
    lazy="joined",
)
