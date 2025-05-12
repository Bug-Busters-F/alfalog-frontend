import React, { useState } from 'react';

interface Transacao {
    id: string;
    CO_ANO: string;
    CO_MES: string;
    CO_NCM: string;
    CO_UNID: string;
    CO_PAIS: string;
    SG_UF_NCM: string;
    CO_VIA: string;
    CO_URF: string;
    QT_ESTAT: string;
    KG_LIQUIDO: string;
    VL_FOB: string;
}

const todasTransacoes: Transacao[] = [
    { id: "1", CO_ANO: "2014", CO_MES: "03", CO_NCM: "94019090", CO_UNID: "10", CO_PAIS: "275", SG_UF_NCM: "PR", CO_VIA: "01", CO_URF: "0917800", QT_ESTAT: "6", KG_LIQUIDO: "6", VL_FOB: "80" },
    { id: "2", CO_ANO: "2015", CO_MES: "05", CO_NCM: "84082029", CO_UNID: "9", CO_PAIS: "105", SG_UF_NCM: "SP", CO_VIA: "02", CO_URF: "0717800", QT_ESTAT: "8", KG_LIQUIDO: "12", VL_FOB: "120" },
    { id: "3", CO_ANO: "2016", CO_MES: "07", CO_NCM: "87032390", CO_UNID: "7", CO_PAIS: "160", SG_UF_NCM: "RJ", CO_VIA: "03", CO_URF: "0817800", QT_ESTAT: "10", KG_LIQUIDO: "20", VL_FOB: "300" },
    { id: "4", CO_ANO: "2017", CO_MES: "09", CO_NCM: "62034200", CO_UNID: "4", CO_PAIS: "320", SG_UF_NCM: "RS", CO_VIA: "01", CO_URF: "0917800", QT_ESTAT: "4", KG_LIQUIDO: "5", VL_FOB: "60" },
    { id: "5", CO_ANO: "2018", CO_MES: "11", CO_NCM: "85044090", CO_UNID: "5", CO_PAIS: "380", SG_UF_NCM: "SC", CO_VIA: "04", CO_URF: "0617800", QT_ESTAT: "6", KG_LIQUIDO: "10", VL_FOB: "150" },
    { id: "6", CO_ANO: "2019", CO_MES: "01", CO_NCM: "90031110", CO_UNID: "6", CO_PAIS: "400", SG_UF_NCM: "MG", CO_VIA: "05", CO_URF: "0517800", QT_ESTAT: "2", KG_LIQUIDO: "3", VL_FOB: "40" },
    { id: "7", CO_ANO: "2020", CO_MES: "02", CO_NCM: "91011100", CO_UNID: "3", CO_PAIS: "420", SG_UF_NCM: "BA", CO_VIA: "06", CO_URF: "0417800", QT_ESTAT: "9", KG_LIQUIDO: "14", VL_FOB: "200" },
    { id: "8", CO_ANO: "2021", CO_MES: "04", CO_NCM: "94036000", CO_UNID: "2", CO_PAIS: "440", SG_UF_NCM: "CE", CO_VIA: "07", CO_URF: "0317800", QT_ESTAT: "5", KG_LIQUIDO: "7", VL_FOB: "90" },
    { id: "9", CO_ANO: "2022", CO_MES: "06", CO_NCM: "85176231", CO_UNID: "1", CO_PAIS: "460", SG_UF_NCM: "PE", CO_VIA: "08", CO_URF: "0217800", QT_ESTAT: "3", KG_LIQUIDO: "6", VL_FOB: "110" },
    { id: "10", CO_ANO: "2023", CO_MES: "08", CO_NCM: "87021000", CO_UNID: "8", CO_PAIS: "480", SG_UF_NCM: "AM", CO_VIA: "09", CO_URF: "0117800", QT_ESTAT: "7", KG_LIQUIDO: "9", VL_FOB: "170" },
];

const SearchTable = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filtros, setFiltros] = useState<Partial<Transacao>>({});
    const rowsPerPage = 10;

    const valoresUnicos = (campo: keyof Transacao) => {
        return Array.from(new Set(todasTransacoes.map(t => t[campo]))).sort();
    };

    const handleFiltroChange = (campo: keyof Transacao, valor: string) => {
        setFiltros(prev => ({
            ...prev,
            [campo]: valor === '' ? undefined : valor
        }));
        setCurrentPage(1);
    };

    const limparFiltros = () => {
        setFiltros({});
        setSearchTerm('');
        setCurrentPage(1);
    };

    const dadosFiltrados = todasTransacoes.filter((t) => {
        return Object.entries(filtros).every(([campo, valor]) => {
            return valor === undefined || t[campo as keyof Transacao] === valor;
        }) && t.CO_NCM.includes(searchTerm);
    });

    const totalPages = Math.ceil(dadosFiltrados.length / rowsPerPage);
    const inicio = (currentPage - 1) * rowsPerPage;

    const labels: Record<keyof Transacao, string> = {
        id: 'ID',
        CO_ANO: 'Ano',
        CO_MES: 'Mês',
        CO_NCM: 'NCM',
        CO_UNID: 'Unidade',
        CO_PAIS: 'País',
        SG_UF_NCM: 'UF',
        CO_VIA: 'Via',
        CO_URF: 'URF',
        QT_ESTAT: 'Quantidade',
        KG_LIQUIDO: 'KG Líquido',
        VL_FOB: 'Valor FOB'
    };

    const [ordem, setOrdem] = useState<{ coluna: keyof Transacao; direcao: 'asc' | 'desc' | null }>({
        coluna: 'CO_ANO',
        direcao: null
    });

    const toggleOrdem = (coluna: keyof Transacao) => {
        setOrdem(prev => {
            if (prev.coluna === coluna) {
                if (prev.direcao === 'asc') return { coluna, direcao: 'desc' };
                if (prev.direcao === 'desc') return { coluna, direcao: null };
                return { coluna, direcao: 'asc' };
            }
            return { coluna, direcao: 'asc' };
        });
    };

    const dadosFiltradosOrdenados = [...dadosFiltrados].sort((a, b) => {
        if (!ordem.direcao) return 0;

        const valorA = a[ordem.coluna];
        const valorB = b[ordem.coluna];

        if (typeof valorA === 'number' && typeof valorB === 'number') {
            return ordem.direcao === 'asc' ? valorA - valorB : valorB - valorA;
        }

        return ordem.direcao === 'asc'
            ? String(valorA).localeCompare(String(valorB))
            : String(valorB).localeCompare(String(valorA));
    });

    const visiveis = dadosFiltradosOrdenados.slice(inicio, inicio + rowsPerPage);

    return (
        <div className="p-4">
            {/* Filtros superiores */}
            <div className="mb-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-9 gap-2">
                <input
                    type="text"
                    placeholder="Pesquisar por NCM"
                    value={searchTerm}
                    onChange={e => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="border px-3 py-2 rounded w-full"
                />
                {(['CO_ANO', 'CO_PAIS', 'SG_UF_NCM', 'CO_VIA', 'CO_URF'] as (keyof Transacao)[]).map((campo) => (
                    <select
                        key={campo}
                        value={filtros[campo] || ''}
                        onChange={e => handleFiltroChange(campo, e.target.value)}
                        className="border px-3 py-2 rounded w-full"
                    >
                        <option value="">{`${labels[campo]}`}</option>
                        {valoresUnicos(campo).map(valor => (
                            <option key={valor} value={valor}>{valor}</option>
                        ))}
                    </select>
                ))}
            </div>

            {/* Botão Limpar Filtros */}
            <div className="mb-4">
                <button
                    onClick={limparFiltros}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
                >
                    Limpar Filtros
                </button>
            </div>


            {/* Tabela */}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 text-sm text-left">
                    <thead>
                        <tr className="bg-sky-900 text-white">
                            {(Object.keys(labels) as (keyof Transacao)[])
                                .filter(coluna => coluna !== 'id')
                                .map(coluna => (
                                    <th
                                        key={coluna}
                                        onClick={() => toggleOrdem(coluna)}
                                        className={`px-4 py-2 text-left cursor-pointer ${ordem.coluna === coluna ? 'bg-sky-800' : ''
                                            }`}
                                    >
                                        {labels[coluna]}
                                        <span className="ml-1 text-xs">
                                            {ordem.coluna === coluna
                                                ? ordem.direcao === 'asc'
                                                    ? '▲'
                                                    : ordem.direcao === 'desc'
                                                        ? '▼'
                                                        : '↕'
                                                : '↕'}
                                        </span>
                                    </th>
                                ))}
                        </tr>
                    </thead>
                    <tbody>
                        {visiveis.map((row, i) => (
                            <tr key={row.id} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'}>
                                {(Object.keys(labels) as (keyof Transacao)[])
                                    .filter(coluna => coluna !== 'id')
                                    .map(coluna => (
                                        <td key={coluna} className="px-4 py-2">{row[coluna]}</td>
                                    ))}
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {/* Paginação */}
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

export default SearchTable;
