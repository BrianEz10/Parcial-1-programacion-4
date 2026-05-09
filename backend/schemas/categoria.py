from __future__ import annotations
from datetime import datetime
from typing import Optional, List, Annotated
from pydantic import Field, field_validator
from sqlmodel import SQLModel


class CategoriaCreate(SQLModel):
    parent_id: Optional[int] = None
    nombre: Annotated[str, Field(min_length=2, max_length=100)]
    descripcion: Annotated[Optional[str], Field(default=None, max_length=500)]
    imagen_url: Annotated[Optional[str], Field(default=None, max_length=2048)]

    @field_validator("nombre")
    @classmethod
    def nombre_no_solo_espacios(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("El nombre no puede ser solo espacios en blanco.")
        return v.strip()

class CategoriaUpdate(SQLModel):
    parent_id: Optional[int] = None
    nombre: Annotated[Optional[str], Field(default=None, min_length=2, max_length=100)]
    descripcion: Annotated[Optional[str], Field(default=None, max_length=500)]
    imagen_url: Annotated[Optional[str], Field(default=None, max_length=2048)]

class CategoriaRead(SQLModel):
    id: int
    parent_id: Optional[int]
    nombre: str
    descripcion: Optional[str]
    imagen_url: Optional[str]
    created_at: datetime
    updated_at: datetime
    subcategorias: List["CategoriaReadSimple"] = []

class CategoriaReadSimple(SQLModel):
    id: int
    nombre: str
    parent_id: Optional[int]
