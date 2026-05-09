import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCrud } from "../../hooks/useCrud";
import { ingredientesApi } from "../../api/ingredientes";
import type { Ingrediente, IngredienteCreate, IngredienteUpdate } from "../../types";
import ErrorMessage from "../ui/ErrorMessage";
import { useEffect } from "react";

interface IngredienteFormProps {
  ingredienteEditar?: Ingrediente;
}

export default function IngredienteForm({ ingredienteEditar }: IngredienteFormProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const esEdicion = !!id;

  const { crear, isCreando, errorCrear, actualizar, isActualizando, errorActualizar } = 
    useCrud(['ingredientes'], ingredientesApi);

  const { register, handleSubmit, reset } = useForm<IngredienteCreate>({
    defaultValues: ingredienteEditar || {
      nombre: "",
      descripcion: "",
      es_alergeno: false,
    },
  });

  useEffect(() => {
    if (ingredienteEditar) reset(ingredienteEditar);
  }, [ingredienteEditar, reset]);

  const onSubmit = async (data: IngredienteCreate) => {
    try {
      if (esEdicion) {
        await actualizar({ id: Number(id), data: data as IngredienteUpdate });
      } else {
        await crear(data);
      }
      navigate("/ingredientes");
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

        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
          <input type="checkbox" {...register("es_alergeno")} className="w-5 h-5 accent-orange-500" />
          <label className="text-sm font-medium text-gray-700">Es un ingrediente alérgeno</label>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button type="submit" disabled={isCreando || isActualizando} className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 font-medium disabled:opacity-50">
          {isCreando || isActualizando ? "Guardando..." : "Guardar"}
        </button>
        <button type="button" onClick={() => navigate("/ingredientes")} className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 font-medium">
          Cancelar
        </button>
      </div>
    </form>
  );
}
