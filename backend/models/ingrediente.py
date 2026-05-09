from __future__ import annotations
from datetime import datetime
from typing import Optional
from sqlmodel import Field, SQLModel
from sqlalchemy.orm import relationship


class Ingrediente(SQLModel, table=True):
    __tablename__ = "ingrediente"

    id: Optional[int] = Field(default=None, primary_key=True)
    nombre: str = Field(min_length=2, max_length=100, nullable=False, index=True)
    descripcion: Optional[str] = Field(default=None, max_length=500)
    es_alergeno: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    updated_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    deleted_at: Optional[datetime] = Field(default=None)

Ingrediente.producto_links = relationship(
    "ProductoIngrediente",
    back_populates="ingrediente",
    lazy="joined",
)
