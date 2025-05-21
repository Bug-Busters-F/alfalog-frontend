import React, { useEffect, useState } from 'react';
import { getFormattedDataForAddedValuesTable } from '../util/formattedData';

interface FormattedData {
  ncm: number;
  nome: string;
  pais: string;
  via: string;
  valor: number;
  peso: number;
}

interface PaginatedTableProps {
  isExport: boolean;
  uf_id: number;
  ano: number;
}

const PaginatedTable: React.FC<PaginatedTableProps> = ({
  isExport,
  uf_id,
  ano
}) => {
  const [formattedData, setFormattedData] = useState<FormattedData[]>([]);
  const [hasNext, setHasNext] = useState<boolean>(false);
  const [hasPrevious, setHasPrevious] = useState<boolean>(false);
  const [pagina, setPagina] = useState<number>(0);
  const [cursor, setCursor] = useState<number>(1);
  const [sortOption, setSortOption] = useState<'valor' | 'peso'>('valor');

  const fetchFormattedData = async () => {
    try {
      const response = await getFormattedDataForAddedValuesTable(
        isExport,
        uf_id,
        ano,
        sortOption,
        cursor
      );
      setFormattedData(response.formattedData);
      setHasNext(response.has_next);
      setHasPrevious(response.has_previous);
      setPagina(response.pagina);
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  };

  useEffect(() => {
    fetchFormattedData();
  }, [isExport, uf_id, ano, sortOption, cursor]);

  const handlePrevious = () => {
    if (cursor > 1) setCursor(cursor - 1);
  };

  const handleNext = () => {
    if (hasNext) setCursor(cursor + 1);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      {/* Filtro */}
      <div className="flex items-center mb-4">
        <label htmlFor="sortOption" className="font-semibold mr-2">
          Organizar por:
        </label>
        <select
          id="sortOption"
          value={sortOption}
          onChange={e => setSortOption(e.target.value as 'valor' | 'peso')}
          className="px-3 py-2 border border-gray-300 rounded focus:outline-none"
        >
          <option value="valor">Valor Agregado</option>
          <option value="peso">Peso</option>
        </select>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto rounded">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-sky-900 text-white">
              <th className="px-4 py-3 text-left">NCM</th>
              <th className="px-4 py-3 text-left">Nome</th>
              <th className="px-4 py-3 text-left">País</th>
              <th className="px-4 py-3 text-left">Via</th>
              <th className="px-4 py-3 text-left">Valor Agregado</th>
              <th className="px-4 py-3 text-left">Peso (Kg)</th>
            </tr>
          </thead>
          <tbody>
            {formattedData.map((row, i) => (
              <tr
                key={i}
                className={i % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'}
              >
                <td className="px-4 py-2">{row.ncm}</td>
                <td className="px-4 py-2">{row.nome}</td>
                <td className="px-4 py-2">{row.pais}</td>
                <td className="px-4 py-2">{row.via}</td>
                <td className="px-4 py-2">{row.valor}</td>
                <td className="px-4 py-2">{row.peso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={!hasPrevious}
          className={`px-4 py-2 rounded ${
            hasPrevious
              ? 'bg-sky-900 text-white hover:bg-sky-800'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          Anterior
        </button>
        <span className="font-medium">{`Página ${pagina}`}</span>
        <button
          onClick={handleNext}
          disabled={!hasNext}
          className={`px-4 py-2 rounded ${
            hasNext
              ? 'bg-sky-900 text-white hover:bg-sky-800'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default PaginatedTable;
