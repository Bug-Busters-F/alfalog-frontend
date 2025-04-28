const DownloadButton = () => {
  const handleDownload = async (tipo: "exportacoes" | "importacoes") => {
    try {
      const response = await fetch(`http://localhost:5000/api/${tipo}/download`, {
        method: "GET"
      });

      if (!response.ok) throw new Error("Erro ao baixar o arquivo");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${tipo}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Não foi possível baixar o arquivo.");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => handleDownload("exportacoes")}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
      >
        Baixar Exportações
      </button>

      <button
        onClick={() => handleDownload("importacoes")}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
      >
        Baixar Importações
      </button>
    </div>
  );
};

export default DownloadButton;
