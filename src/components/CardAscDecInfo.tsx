import React, { useState } from "react"

export interface InfoButtonProps {
  title?: string
  message?: string
  imageSrc?: string
  imageAlt?: string
}

const InfoButton: React.FC<InfoButtonProps> = ({
  title = "Informações",
  message = "O Ranking dos estados é definido com base na balança comercial, calculada pela diferença entre exportações e importações (valor total FOB do ano). A variação percentual considera a diferença entre os valores da balança no ano inicial e final, conforme a fórmula abaixo:",
  imageSrc = "/formula_variacao_comercial.svg",
  imageAlt = "Fórmula da variação percentual da balança comercial",
}) => {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowInfo(!showInfo)}
        className="w-6 h-6 flex items-center justify-center rounded-full bg-sky-700 text-white text-sm font-bold hover:bg-sky-600 focus:outline-none"
        title={title}
      >
        i
      </button>

      {showInfo && (
        <div className="absolute z-10 bottom-full mt-2 p-4 w-96 bg-white border border-gray-300 rounded shadow-lg right-0">
          <p className="text-sm text-gray-800">{message}</p>
          <img
            src={imageSrc}
            alt={imageAlt}
            className="my-2 w-full max-w-md mx-auto scale-75"
          />
        </div>
      )}
    </div>
  )
}

export default InfoButton