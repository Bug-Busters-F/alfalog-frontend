import { useExport } from "../context/ExportContext";

const ExportSwitch = () => {
  const { isExport, setIsExport } = useExport();

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white rounded-lg shadow-md w-full">
      <span className="text-black font-semibold text-sm">
        {isExport ? "Exportação" : "Importação"}
      </span>

      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isExport}
          onChange={() => setIsExport((prev) => !prev)}
          className="sr-only peer"
        />
        <div
          className={`w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 transition-colors duration-300`}
        ></div>
        <span
          className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white border rounded-full transition-transform duration-300 ${
            isExport ? "translate-x-5" : ""
          }`}
        ></span>
      </label>
    </div>
  );
};

export default ExportSwitch;
