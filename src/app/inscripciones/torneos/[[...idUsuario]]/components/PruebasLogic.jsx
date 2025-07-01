import { Button, Typography } from "@/app/utils/materialTailwind";
import { InformationCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import PruebaInput from "./PruebaInput";
import { v4 as uuidv4 } from "uuid";

const PruebasLogic = ({
  pruebasSelected,
  setPruebasSelected,
  formErrors,
  pruebas,
  usuario,
  editando = false,
}) => {
  // Create prueba added
  const handleAdd = () => {
    setPruebasSelected([
      ...pruebasSelected,
      {
        id: uuidv4(),
        prueba: "disabled",
        formato: "",
        atleta: usuario._id ? usuario._id : usuario.uid,
      },
    ]);
  };

  return (
    <>
      <h3 className="text-text font-text">
        Si no tiene marca en una prueba,{" "}
        <strong>deje el casillero vacío</strong>. Si una prueba que está en el
        programa horario no aparece, es porque no está disponible en su
        categoría seleccionada. Por ejemplo, no podrá seleccionar 100 metros en
        la categoría U14; deberá seleccionar otra categoría.
      </h3>
      {/* For each prueba added, render Prueba chosen and Marca input */}
      {pruebasSelected.map((pruebaAgregada, i) => (
        <PruebaInput
          key={i}
          pruebas={pruebas}
          pruebaAgregada={pruebaAgregada}
          setPruebasSelected={setPruebasSelected}
          editando={editando}
        />
      ))}
      <div>
        <Button
          className="flex items-center gap-3 text-primary2 bg-secondary1 rounded-3xl"
          color="white"
          onClick={handleAdd}
        >
          <PlusIcon strokeWidth={2} className="h-5 w-5" />
          Agregar Prueba
        </Button>

        {/* If user doesn't add pruebas, show error */}
        {formErrors.some((error) => error.path === "pruebasInscripto") && (
          <Typography
            variant="small"
            color="red"
            className="flex items-center gap-1 font-semibold mt-2"
          >
            <InformationCircleIcon className="w-4 h-4 -mt-px" />
            Por favor, corrija las pruebas
          </Typography>
        )}
      </div>
    </>
  );
};

export default PruebasLogic;
