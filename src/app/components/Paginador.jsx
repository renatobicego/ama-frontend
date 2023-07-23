import { Button,  CardFooter, IconButton, } from "@/app/utils/materialTailwind"

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
        if(pagina === pageNumbers){
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
            <Button variant="outlined" onClick={handlePrevious} color="blue-gray" size="sm">
                Anterior
            </Button>
            <div className="flex items-center gap-2">
                {pageNumbers.map((pageNumber) => (
                    <IconButton key={pageNumber} onClick={() => handlePageChange(pageNumber)} variant="text" color="blue-gray" size="sm">
                        {pageNumber}
                    </IconButton>
                ))}
            </div>
            <Button variant="outlined" onClick={handleNext} color="blue-gray" size="sm">
                Siguiente
            </Button>
        </CardFooter>
    );
}

export default Paginador