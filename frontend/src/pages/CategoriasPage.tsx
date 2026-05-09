import { useNavigate } from "react-router-dom";
import { useCrud } from "../hooks/useCrud";
import { categoriasApi } from "../api/categorias";
import CategoriaTable from "../components/categorias/CategoriaTable";
import PageHeader from "../components/ui/PageHeader";
import ErrorMessage from "../components/ui/ErrorMessage";

export default function CategoriasPage() {
  const navigate = useNavigate();
  const { items: categorias, isLoading, error } = useCrud(['categorias'], categoriasApi);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Categorías"
        description="Gestioná las categorías de tu menú."
        action={
          <button
            onClick={() => navigate("/categorias/nueva")}
            className="px-4 py-2 rounded-md bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-colors"
          >
            + Nueva categoría
          </button>
        }
      />

      {error && <ErrorMessage message={error.message} />}

      {isLoading ? (
        <div className="text-center py-12 text-gray-400 text-sm">Cargando...</div>
      ) : (
        <CategoriaTable items={categorias} />
      )}
    </div>
  );
}
