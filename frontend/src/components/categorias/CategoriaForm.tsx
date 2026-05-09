import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCrud } from "../../hooks/useCrud";
import { categoriasApi } from "../../api/categorias";
import type { Categoria, CategoriaCreate, CategoriaUpdate } from "../../types";
import ErrorMessage from "../ui/ErrorMessage";
import { useEffect } from "react";

interface CategoriaFormProps {
  categoriaEditar?: Categoria;
}

export default function CategoriaForm({ categoriaEditar }: CategoriaFormProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const esEdicion = !!id;

  const { items: categorias, crear, isCreando, errorCrear, actualizar, isActualizando, errorActualizar } = 
    useCrud(['categorias'], categoriasApi);

  const { register, handleSubmit, reset } = useForm<CategoriaCreate>({
    defaultValues: categoriaEditar || {
      nombre: "",
      descripcion: "",
      imagen_url: "",
      parent_id: null,
    },
  });

  useEffect(() => {
    if (categoriaEditar) reset(categoriaEditar);
  }, [categoriaEditar, reset]);

  const onSubmit = async (data: CategoriaCreate) => {
    try {
      if (esEdicion) {
        await actualizar({ id: Number(id), data: data as CategoriaUpdate });
      } else {
        await crear(data);
      }
      navigate("/categorias");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6 max-w-2xl">
      {(errorCrear || errorActualizar) && <ErrorMessage message={(errorCrear || errorActualizar)?.message || ""} />}
      
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input {...register("nombre", { required: true })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 outline-none" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea {...register("descripcion")} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 outline-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Imagen URL</label>
          <input {...register("imagen_url")} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 outline-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Categoría Padre (Opcional)</label>
          <select {...register("parent_id")} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 outline-none bg-white">
            <option value="">Ninguna</option>
            {categorias.filter(c => c.id !== Number(id)).map(c => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button type="submit" disabled={isCreando || isActualizando} className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 font-medium disabled:opacity-50">
          {isCreando || isActualizando ? "Guardando..." : "Guardar"}
        </button>
        <button type="button" onClick={() => navigate("/categorias")} className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 font-medium">
          Cancelar
        </button>
      </div>
    </form>
  );
}
