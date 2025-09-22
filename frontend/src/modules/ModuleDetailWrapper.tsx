import React from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import ModuleDetail from "./ModuleDetail";

const ModuleDetailWrapper: React.FC = () => {
  const { id } = useParams();
  const [search] = useSearchParams();
  const navigate = useNavigate();

  if (!id) return <p>Module not found</p>;

  return (
    <div className="p-4">
  <button
  className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
  onClick={() => navigate("/dashboard/modules")} // Corrected path
>
  ← Back to Modules
</button>

      {/* Just render ModuleDetail normally; it handles language & module itself */}
      <ModuleDetail />
    </div>
  );
};

export default ModuleDetailWrapper;
