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

const Paginador = ({ total, setPagina, pagina, division }) => {
    const totalPages = Math.ceil(total / division);
  
    const pageNumbers = generatePageNumbers(totalPages);
  
    const handleNext = () => {
      if (pagina === totalPages) {
        return
      } else {
        setPagina(prev => prev + 1);
      }
    }
    
    const handlePrevious = () => {
      if (pagina === 1) {
        return
      } else {
        setPagina(prev => prev - 1);
      }
    }
  
    const handlePageChange = (pageNumber) => setPagina(pageNumber)
  
    return (
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button
          className="hidden md:block"
          variant="outlined"
          onClick={handlePrevious}
          color="blue-gray"
          size="sm"
        >
          Anterior
        </Button>
        <Button
          className="block md:hidden"
          variant="outlined"
          onClick={handlePrevious}
          color="blue-gray"
          size="sm"
        >
          <ArrowLeftIcon className="h-3 w-3" strokeWidth={3} />
        </Button>
        <div className="flex items-center gap-2">
            {pageNumbers.map((pageNumber, index) => {
                if (
                    totalPages <= 5 ||
                    index === 0 || // Siempre mostrar el primer número
                    index === pageNumbers.length - 1 || // Siempre mostrar el último número
                    (index === pageNumbers.length - 2 && index < totalPages - 2) || // Mostrar el penúltimo número si quedan al menos 3 páginas
                    (Math.abs(index - pageNumbers.indexOf(pagina)) <= 1) // Mostrar páginas cercanas a la actual
                ) {
                    return (
                        <IconButton
                            key={index}
                            onClick={() => handlePageChange(pageNumber)}
                            variant={pagina === pageNumber ? 'filled' : 'text'}
                            color="blue-gray"
                            size="sm"
                            >
                            {pageNumber}
                        </IconButton>
                    )
                } else if (
                    (Math.abs(index - pageNumbers.indexOf(pagina)) === 2) ||
                    (index === pageNumbers.length - 3 && pagina >= totalPages - 2)
                ) {
                    return (
                        <span key={index} className="text-blue-gray-400">
                        ...
                        </span>
                    )
                }
                return  // Si no cumple ninguna condición, no renderizar nada
            })}
        </div>
        <Button
          className="hidden md:block"
          variant="outlined"
          onClick={handleNext}
          color="blue-gray"
          size="sm"
        >
          Siguiente
        </Button>
        <Button
          className="block md:hidden"
          variant="outlined"
          onClick={handleNext}
          color="blue-gray"
          size="sm"
        >
          <ArrowRightIcon className="h-3 w-3" strokeWidth={3} />
        </Button>
      </CardFooter>
    );
  };

export default Paginador