import { useExport } from "../context/ExportContext";

const ExportSwitch = () => {
  const { isExport, setIsExport } = useExport();

  return (
    <div className="flex items-center justify-center px-4 py-2 bg-white rounded-lg shadow-md w-full">
      <div className="flex border border-gray-300 rounded-md overflow-hidden">
        <button
          onClick={() => setIsExport(false)}
          className={`px-3 py-1.5 text-xs font-medium transition-colors duration-200 ${
            !isExport
              ? "bg-sky-900 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Importação
        </button>
        <button
          onClick={() => setIsExport(true)}
          className={`px-3 py-1.5 text-xs font-medium transition-colors duration-200 ${
            isExport
              ? "bg-sky-900 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Exportação
        </button>
      </div>
    </div>
  );
};

export default ExportSwitch;
