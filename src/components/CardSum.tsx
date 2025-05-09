import { IoStatsChart } from "react-icons/io5";
import { MdPayments } from "react-icons/md";

type Props = {
    titulo: string
    valor: string
    tipo: string
}

const CardSum = (props: Props) => {
    let tipoICon
    if (props.tipo === 'R$'){
        tipoICon = <MdPayments color='#00a63e' size={25}/>
    }else{
        
        tipoICon = <IoStatsChart color='#00a63e' size={20}/>     
    }
  return (
    <div className='flex w-[45%] sm:w-[40%] md:w-[45%] lg:w-[18%] bg-white shadow-md p-4 rounded-2xl items-center gap-5'>
        <div className='rounded-full w-10 h-10 bg-gray-200 flex items-center justify-center'>
           {tipoICon}
        </div>
        <div>
            <h4 className='text-xs text-gray-500'>{props.titulo}</h4>
            <p className='text-xl font-bold'>{props.valor}</p>
        </div>
    </div>
  )
}

export default CardSum