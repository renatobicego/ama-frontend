import { Button,  CardFooter, IconButton, } from "@/app/utils/materialTailwind"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline"

// Función para generar el arreglo de números de página.
const generatePageNumbers = (totalPages) => {
    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
    }
    return pageNumbers
}

const Paginador = ({total, setPagina, pagina, division}) => {
    const totalPages = Math.ceil(total / division)// Calcular la cantidad de páginas.

    const pageNumbers = generatePageNumbers(totalPages) 
    
    const handleNext = () => {
        if(pagina === totalPages){
            return 
        }else{
            setPagina(prev => prev + 1)
        }
    } 
    const handlePrevious = () => {

        if(pagina === 1){
            return 
        }else{
            setPagina(prev => prev - 1)
        }
    } 

    const handlePageChange = (pageNumber) => setPagina(pageNumber)

    return (
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Button className="hidden md:block" variant="outlined" onClick={handlePrevious} color="blue-gray" size="sm">
                Anterior
            </Button>
            <Button className="block md:hidden" variant="outlined" onClick={handlePrevious} color="blue-gray" size="sm">
                <ArrowLeftIcon className="h-3 w-3" strokeWidth={3}/>
            </Button>
            <div className="flex items-center gap-2">
                {pageNumbers.map((pageNumber) => (
                    <IconButton key={pageNumber} 
                        onClick={() => handlePageChange(pageNumber)} 
                        variant={pagina === pageNumber ? 'filled' : 'text'} color="blue-gray" size="sm">
                        {pageNumber}
                    </IconButton>
                ))}
            </div>
            <Button className="hidden md:block" variant="outlined" onClick={handleNext} color="blue-gray" size="sm">
                Siguiente
            </Button>
            <Button className="block md:hidden" variant="outlined" onClick={handleNext} color="blue-gray" size="sm">
                <ArrowRightIcon className="h-3 w-3" strokeWidth={3}/>

            </Button>
        </CardFooter>
    );
}

export default Paginador