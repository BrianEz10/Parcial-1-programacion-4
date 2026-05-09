export interface Categoria {
    id: number;
    nombre: string;
    descripcion: string | null;
    imagen_url: string | null;
    parent_id: number | null;
    subcategorias: CategoriaSimple[];
    created_at: string;
    updated_at: string;
}

export interface CategoriaSimple {
    id: number;
    nombre: string;
    parent_id: number | null;
}

export interface CategoriaCreate {
    nombre: string;
    descripcion?: string;
    imagen_url?: string;
    parent_id?: number | null;
}

export interface CategoriaUpdate extends Partial<CategoriaCreate> { }
