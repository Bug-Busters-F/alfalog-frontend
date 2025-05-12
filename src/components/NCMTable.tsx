import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

interface NcmEntry {
    code: string;
    description: string;
}

const NCMTable: React.FC = () => {
    const [data, setData] = useState<NcmEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const rowsPerPage = 10;

    const filteredData = data.filter((item) =>
        item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const limparFiltros = () => {
        setSearchTerm('');
        setCurrentPage(1);
        setSearchInput('');
    };

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

    useEffect(() => {
        fetch('../public/NCMFiltrado.csv')
            .then((response) => {
                if (!response.ok) throw new Error('Falha ao carregar CSV');
                return response.text();
            })
            .then((csvText) => {
                Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        const parsed = results.data as Record<string, string>[];
                        const entries: NcmEntry[] = parsed.map((row) => ({
                            code: row['CO_NCM'] || '',
                            description: row['NO_NCM_POR'] || ''
                        }));
                        setData(entries);
                        setLoading(false);
                    },
                    error: (err: any) => {
                        setError(err.message);
                        setLoading(false);
                    }
                });
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="p-4">Carregando NCMs...</p>;
    if (error) return <p className="p-4 text-red-600">Erro: {error}</p>;

    return (
        <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Tabela de NCMs</h2>
            <div className="overflow-x-auto">
                <div className="flex display-row w-120 mb-3">
                    <input
                        type="text"
                        placeholder="Pesquisar NCM"
                        value={searchInput}
                        onChange={e => setSearchInput(e.target.value)}
                        className="border px-3 py-2 rounded w-50 mr-3"
                    />
                    <button
                        onClick={() => {
                            setSearchTerm(searchInput);
                            setCurrentPage(1);
                        }}
                        className="bg-green-600 text-white rounded px-3 py-2 mr-3"
                    >
                        Pesquisar
                    </button>
                    <button
                        onClick={limparFiltros}
                        className="px-4 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
                    >
                        Limpar Filtros
                    </button>
                </div>

                <table className="min-w-full border border-gray-300 text-sm text-left">
                    <thead className="bg-sky-900 text-white">
                        <tr>
                            <th className="px-4 py-2">Código</th>
                            <th className="px-4 py-2">Descrição</th>
                        </tr>
                    </thead>
                    {paginatedData.map((item, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'}>
                            <td className="px-4 py-2 w-20">{item.code}</td>
                            <td className="px-4 py-2">{item.description}</td>
                        </tr>
                    ))}
                </table>
            </div>

            <div className="flex justify-between items-center mt-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                    className="px-4 py-2 rounded bg-sky-900 text-white disabled:bg-gray-300"
                >
                    Anterior
                </button>
                <span>
                    Página {currentPage} de {totalPages}
                </span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => p + 1)}
                    className="px-4 py-2 rounded bg-sky-900 text-white disabled:bg-gray-300"
                >
                    Próxima
                </button>
            </div>
        </div>
    );
};

export default NCMTable;