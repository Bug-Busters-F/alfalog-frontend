import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Transacao {
    id: string;
    ano: string;
    mes: string;
    ncm: string;
    unid: string;
    pais: string;
    uf: string;
    via: string;
    urf: string;
    peso: string;
    valor: string;
}

interface ApiResponse {
    data: Transacao[];
    page: number;
    perPage: number;
    totalPages: number;
    totalCount: number;
}

interface Option {
    id: string;
    label: string;
}

const rowsPerPage = 10;

const SearchTable: React.FC = () => {
    const [filtros, setFiltros] = useState<Partial<Record<'coAno' | 'coMes' | 'coPais' | 'sgUfNcm' | 'coVia' | 'noUrf', string>>>({});
    const [searchInput, setSearchInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState<Transacao[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const [sortBy, setSortBy] = useState<keyof Transacao>('ano');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    // Estados para opções de filtro como Option[]
    const [anosOpts, setAnosOpts] = useState<Option[]>([]);
    const [mesOpts, setMesOpts] = useState<Option[]>([]);
    const [paisOpts, setPaisOpts] = useState<Option[]>([]);
    const [ufOpts, setUfOpts] = useState<Option[]>([]);
    const [viaOpts, setViaOpts] = useState<Option[]>([]);
    const [urfOpts, setUrfOpts] = useState<Option[]>([]);

    // Fetch distinct filter options uma vez
    useEffect(() => {
        const fetchDistinct = async () => {
            try {
                const [
                    respAnos,
                    respMes,
                    respPais,
                    respUF,
                    respVia,
                    respURF
                ] = await Promise.all([
                    axios.get<{ values: Option[] }>('http://localhost:5000/api/transacoes/distinct?field=coAno'),
                    axios.get<{ values: Option[] }>('http://localhost:5000/api/transacoes/distinct?field=coMes'),
                    axios.get<{ values: Option[] }>('http://localhost:5000/api/transacoes/distinct?field=coPais'),
                    axios.get<{ values: Option[] }>('http://localhost:5000/api/transacoes/distinct?field=sgUfNcm'),
                    axios.get<{ values: Option[] }>('http://localhost:5000/api/transacoes/distinct?field=coVia'),
                    axios.get<{ values: Option[] }>('http://localhost:5000/api/transacoes/distinct?field=noUrf'),
                ]);

                setAnosOpts(respAnos.data.values);
                setMesOpts(respMes.data.values);    
                setPaisOpts(respPais.data.values);
                setUfOpts(respUF.data.values);
                setViaOpts(respVia.data.values);
                setUrfOpts(respURF.data.values);
            } catch (err) {
                console.error('Erro ao carregar filtros', err);
            }
        };

        fetchDistinct();
    }, []);


    const fetchTransacoes = async (page = currentPage) => {
        setLoading(true);
        try {
            const params = {
                ...filtros,
                searchNcm: searchTerm,
                page,
                perPage: rowsPerPage,
                sortBy,
                sortOrder
            };
            const resp = await axios.get<ApiResponse>(
                'http://localhost:5000/api/transacoes',
                { params }
            );
            setData(resp.data.data);
            setTotalPages(resp.data.totalPages);
            setCurrentPage(resp.data.page);
        } catch (err) {
            console.error('Erro ao buscar transações', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchTerm) fetchTransacoes(currentPage);
    }, [sortBy, sortOrder]);

    const onPesquisar = () => {
        setSearchTerm(searchInput);
        fetchTransacoes(1);
    };

    const handleFiltroChange = (
        campo: 'coAno' | 'coMes' | 'coPais' | 'sgUfNcm' | 'coVia' | 'noUrf',
        valor: string
    ) => {
        setFiltros(prev => ({
            ...prev,
            [campo]: valor || undefined
        }));
        setCurrentPage(1);
    };

    const limparFiltros = () => {
        setFiltros({});
        setSearchInput('');
        setSearchTerm('');
        setData([]);
        setCurrentPage(1);
    };

    const handleSort = (coluna: keyof Transacao) => {
        if (sortBy === coluna) {
            setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortBy(coluna);
            setSortOrder('asc');
        }
        fetchTransacoes(currentPage);
    };

    // Reordenar colunas dinamicamente
    const desiredOrder: (keyof Transacao)[] = [
        'ano', 'mes', 'ncm', 'pais', 'uf', 'via', 'urf', 'peso', 'valor'
    ];
    const colunas = data.length > 0
        ? (Object.keys(data[0]) as (keyof Transacao)[])
            .filter(c => c !== 'id')
            .sort((a, b) => desiredOrder.indexOf(a) - desiredOrder.indexOf(b))
        : [];

    return (
        <div className="p-4">
            {/* Filtros superiores */}
            <div className="mb-2 w-full gap-2 grid grid-cols-9">
                <input
                    type="text"
                    placeholder="NCM"
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                    className="border px-3 py-2 rounded w-full"
                />

                {/* Dropdowns usando Option[] */}
                <select
                    value={filtros.coAno || ''}
                    onChange={e => handleFiltroChange('coAno', e.target.value)}
                    className="border px-3 rounded"
                >
                    <option value="">Ano</option>
                    {anosOpts.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
                </select>

                <select
                    value={filtros.coMes || ''}
                    onChange={e => handleFiltroChange('coMes', e.target.value)}
                    className="border px-3 rounded"
                >
                    <option value="">Mês</option>
                    {mesOpts.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
                </select>

                <select
                    value={filtros.coPais || ''}
                    onChange={e => handleFiltroChange('coPais', e.target.value)}
                    className="border px-3 rounded"
                >
                    <option value="">País</option>
                    {paisOpts.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
                </select>

                <select
                    value={filtros.sgUfNcm || ''}
                    onChange={e => handleFiltroChange('sgUfNcm', e.target.value)}
                    className="border px-3 rounded"
                >
                    <option value="">UF</option>
                    {ufOpts.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
                </select>

                <select
                    value={filtros.coVia || ''}
                    onChange={e => handleFiltroChange('coVia', e.target.value)}
                    className="border px-3 rounded"
                >
                    <option value="">Via</option>
                    {viaOpts.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
                </select>

                <select
                    value={filtros.noUrf || ''}
                    onChange={e => handleFiltroChange('noUrf', e.target.value)}
                    className="border px-3 rounded"
                >
                    <option value="">URF</option>
                    {urfOpts.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
                </select>

                <button
                    onClick={onPesquisar}
                    className="bg-green-600 text-white rounded px-3 py-2"
                >
                    Pesquisar
                </button>

                <button
                    onClick={limparFiltros}
                    className="bg-red-500 text-white rounded px-3 py-2"
                >
                    Limpar
                </button>
            </div>

            {/* Loading */}
            {loading && <div>Carregando...</div>}

            {/* Tabela */}
            {!loading && data.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 text-sm text-left">
                        <thead>
                            <tr className="bg-sky-900 text-white">
                                {colunas.map(coluna => (
                                    <th
                                        key={coluna}
                                        className="px-4 py-2 cursor-pointer select-none"
                                        onClick={() => handleSort(coluna)}
                                    >
                                        {coluna.toUpperCase()}
                                        <span className="ml-1 text-xs">
                                            {sortBy === coluna
                                                ? (sortOrder === 'asc' ? '▲' : '▼')
                                                : '↕'}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, i) => (
                                <tr key={row.id} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'}>
                                    {colunas.map(coluna => (
                                        <td key={coluna} className="px-4 py-2">
                                            {(row as any)[coluna]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Paginação */}
            {!loading && data.length > 0 && (
                <div className="flex justify-between items-center mt-4">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => fetchTransacoes(currentPage - 1)}
                        className="px-4 py-2 bg-sky-900 text-white disabled:bg-gray-300"
                    >
                        Anterior
                    </button>
                    <span>Página {currentPage} de {totalPages}</span>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => fetchTransacoes(currentPage + 1)}
                        className="px-4 py-2 bg-sky-900 text-white disabled:bg-gray-300"
                    >
                        Próxima
                    </button>
                </div>
            )}
        </div>
    );
};

export default SearchTable;