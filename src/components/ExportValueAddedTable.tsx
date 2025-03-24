import { useState } from "react";

interface Data {
  ncm: string;
  nome: string;
  pais: string;
  via: string;
  valor: number;
}


interface ExportValueAddedTableProps {
  data: Data[];
}

const PAGE_SIZE = 5;

export default function ExportValueAddedTable({ data }: ExportValueAddedTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const currentData = data.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="p-4 w-full max-w-4xl mx-auto bg-sky-900 text-white rounded-lg shadow-lg">
      <h2 className="text-center text-xl font-bold mb-4">Valor Agregado das Exportações</h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-200">
          <thead className="text-xs uppercase bg-sky-500 text-white">
            <tr>
              <th scope="col" className="px-6 py-3">NCM</th>
              <th scope="col" className="px-6 py-3">Nome</th>
              <th scope="col" className="px-6 py-3">País</th>
              <th scope="col" className="px-6 py-3">Via</th>
              <th scope="col" className="px-6 py-3">Valor</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr key={item.ncm} className="bg-gray-200 border-b border-sky-700 hover:bg-gray-300">
                <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                  {item.ncm}
                </th>
                <td 
  className="px-6 py-4 max-w-[150px] md:truncate whitespace-nowrap overflow-hidden cursor-pointer text-black" 
  title={item.nome}
>
  <span className="md:hidden">{item.nome}</span>
  <span className="hidden md:inline">
    {item.nome.length > 10 ? `${item.nome.slice(0, 10)}...` : item.nome}
  </span>
</td>

                <td className="px-6 py-4 text-black">{item.pais}</td>
                <td className="px-6 py-4 text-black">{item.via}</td>
                <td className="px-6 py-4 text-black">{item.valor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-sky-500 hover:bg-sky-600 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Voltar
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-sky-500 hover:bg-sky-600 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Avançar
        </button>
      </div>
    </div>
  );
}
