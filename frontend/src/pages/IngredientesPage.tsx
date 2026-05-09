import { useNavigate } from "react-router-dom";
import { useCrud } from "../hooks/useCrud";
import { ingredientesApi } from "../api/ingredientes";
import IngredienteTable from "../components/ingredientes/IngredienteTable";
import PageHeader from "../components/ui/PageHeader";
import ErrorMessage from "../components/ui/ErrorMessage";

export default function IngredientesPage() {
  const navigate = useNavigate();
  const { items: ingredientes, isLoading, error } = useCrud(['ingredientes'], ingredientesApi);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ingredientes"
        description="Gestioná los ingredientes disponibles para tus productos."
        action={
          <button
            onClick={() => navigate("/ingredientes/nuevo")}
            className="px-4 py-2 rounded-md bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-colors"
          >
            + Nuevo ingrediente
          </button>
        }
      />

      {error && <ErrorMessage message={error.message} />}

      {isLoading ? (
        <div className="text-center py-12 text-gray-400 text-sm">Cargando...</div>
      ) : (
        <IngredienteTable items={ingredientes} />
      )}
    </div>
  );
}
