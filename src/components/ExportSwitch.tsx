import { useExport } from "../context/ExportContext";

const ExportSwitch = () => {
  const { isExport, setIsExport } = useExport();

  return (
    <div className="flex items-center justify-center  rounded-lg shadow-md w-full mt-10">
      <div className="flex rounded-md overflow-hidden">
        <button
          onClick={() => setIsExport(false)}
          className={`px-4 py-2  transition-colors duration-200 ${
            !isExport
              ? "bg-green-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Importação
        </button>
        <button
          onClick={() => setIsExport(true)}
          className={`px-4 py-2 m transition-colors duration-200 ${
            isExport
              ? "bg-green-600 text-white"
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
