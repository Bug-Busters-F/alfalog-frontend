import { useState } from "react"
import { IoIosArrowForward } from "react-icons/io"
import NCMModal from "./NCMModal"

interface Props {
    ncm: string
}

const BtnNCMGraph: React.FC<Props> = ({ ncm }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button onClick={() => setIsOpen(!isOpen)}>
                <IoIosArrowForward />
            </button>

            {isOpen && <NCMModal isOpen={isOpen} onClose={()=>setIsOpen(false)} ncm={ncm}/>}
        </>
    )
}

export default BtnNCMGraph

