import React, { useState } from "react";

interface Transacao {
    id: number;
    ano: number;
    mes: string;
    pais: string;
    produto: string;
    valor: number;
}

const testeTransacoes: Transacao[] = [
    { id: 1, ano: 2023, mes: "Janeiro", pais: "Brasil", produto: "Soja", valor: 12000 },
    { id: 2, ano: 2023, mes: "Fevereiro", pais: "Argentina", produto: "Carne", valor: 8000 },
    { id: 3, ano: 2024, mes: "Março", pais: "China", produto: "Minério de Ferro", valor: 20000 },
    { id: 4, ano: 2024, mes: "Abril", pais: "Estados Unidos", produto: "Café", valor: 5000 },
    { id: 5, ano: 2024, mes: "Maio", pais: "Alemanha", produto: "Aço", valor: 15000 },
];

const SearchTable = () => {
    const [pesquisa, setPesquisa] = useState("");

    const filtradas = testeTransacoes.filter((transacao) =>
        Object.values(transacao)
            .join(" ")
            .toLowerCase()
            .includes(pesquisa.toLowerCase())
    );

    return (
        <div className="p-6">
            <div className="flex justify-center">
                <input
                    type="text"
                    placeholder="Pesquisar transações..."
                    value={pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}
                    className="mb-4 w-full md:w-1/2 px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border">Ano</th>
                            <th className="py-2 px-4 border">Mês</th>
                            <th className="py-2 px-4 border">País</th>
                            <th className="py-2 px-4 border">Produto</th>
                            <th className="py-2 px-4 border">Valor (R$)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtradas.length > 0 ? (
                            filtradas.map((t) => (
                                <tr key={t.id} className="text-center hover:bg-gray-50">
                                    <td className="py-2 px-4 border">{t.ano}</td>
                                    <td className="py-2 px-4 border">{t.mes}</td>
                                    <td className="py-2 px-4 border">{t.pais}</td>
                                    <td className="py-2 px-4 border">{t.produto}</td>
                                    <td className="py-2 px-4 border">R$ {t.valor.toLocaleString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="py-4 text-center text-gray-500">
                                    Nenhuma transação encontrada.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SearchTable;
