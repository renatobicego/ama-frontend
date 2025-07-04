import isError from "@/app/utils/formValidation/isErrorInput";
import torneoValidate from "@/app/utils/formValidation/torneoValidation";
import { Input, Option, Select, Spinner } from "@/app/utils/materialTailwind";
import PruebasDisponiblesLogic from "./pruebasDisponibles/PruebasDisponiblesLogic";
import CategoriasDisponiblesLogic from "./categoriasDisponibles/CategoriasDisponibleLogic";
import { useRegistroList } from "@/app/utils/hooks/useRegistroList";

const FormLogicEditarTorneo = ({
  data,
  setData,
  setFormErrors,
  handleSubmit,
  formErrors,
  programaHorario,
  resultados,
  handleProgramaHorarioChange,
  handleResultadosChange,
}) => {
  const handleChange = (property, value) => {
    if (property.includes(".")) {
      const [mainProperty, subProperty] = property.split(".");
      setData({
        ...data,
        [mainProperty]: { ...data[mainProperty], [subProperty]: value },
      });
      return;
    }
    setData({ ...data, [property]: value });
  };

  // Get form input for select dropdowns
  const { entityData, loading, error } = useRegistroList([
    "pruebas",
    "categorias",
  ]);
  const { pruebas, categorias } = entityData;

  if (loading) {
    return (
      <div className="mt-6">
        <Spinner color="amber" />
      </div>
    );
  }
  if (error) {
    return (
      <h3 className="text-text font-text">Error al cargar el formulario</h3>
    );
  }

  const validateSubmit = (e) => {
    e.preventDefault();
    const { valid, errors } = torneoValidate(data, programaHorario, resultados);

    if (valid) {
      handleSubmit();
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <form
      className="w-full lg:w-2/3 mt-3 flex flex-col items-start gap-6"
      onSubmit={validateSubmit}
    >
      <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">
        <Input
          tabIndex={1}
          color="gray"
          label="Nombre del Torneo*"
          aria-labelledby="nombre"
          labelProps={{ id: "nombre" }}
          error={isError("nombre", formErrors)}
          value={data.nombre}
          onChange={(e) => handleChange("nombre", e.target.value)}
        />
        <Input
          tabIndex={2}
          color="gray"
          label="Fecha*"
          type="date"
          aria-labelledby="fecha"
          labelProps={{ id: "fecha" }}
          error={isError("fecha", formErrors)}
          value={data.fecha}
          onChange={(e) => handleChange("fecha", e.target.value)}
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">
        <Input
          tabIndex={3}
          color="gray"
          label="Lugar*"
          aria-labelledby="lugar"
          labelProps={{ id: "lugar" }}
          error={isError("lugar", formErrors)}
          value={data.lugar}
          onChange={(e) => handleChange("lugar", e.target.value)}
        />
        <div className="relative flex w-full max-w-[24rem]">
          <Input
            tabIndex={3}
            color="gray"
            type="file"
            accept=".pdf, .doc, .docx"
            className=""
            label="Programa Horario"
            aria-labelledby="programaHorario"
            labelProps={{ id: "programaHorario" }}
            error={isError("programaHorario", formErrors)}
            onChange={handleProgramaHorarioChange}
          />
        </div>
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">
        <div className="relative flex w-full max-w-[24rem]">
          <Input
            tabIndex={4}
            color="gray"
            type="file"
            accept=".pdf, .doc, .docx"
            label="Resultados"
            aria-labelledby="resultados"
            labelProps={{ id: "resultados" }}
            error={isError("resultados", formErrors)}
            onChange={handleResultadosChange}
          />
        </div>
        <Select
          tabIndex={5}
          color="gray"
          label="Inscripciones Abiertas*"
          aria-labelledby="inscripcionesAbiertas"
          labelProps={{ id: "inscripcionesAbiertas" }}
          error={isError("inscripcionesAbiertas", formErrors)}
          value={data.inscripcionesAbiertas}
          defaultValue={data.inscripcionesAbiertas}
          onChange={(value) => handleChange("inscripcionesAbiertas", value)}
        >
          <Option value={true}>Si</Option>
          <Option value={false}>No</Option>
        </Select>
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">
        <Input
          tabIndex={6}
          color="gray"
          label="Link Pago Federados"
          aria-labelledby="linkPagoFederados"
          labelProps={{ id: "linkPagoFederados" }}
          error={isError("linkPagoFederados", formErrors)}
          value={data.linkPagoFederados}
          onChange={(e) => handleChange("linkPagoFederados", e.target.value)}
        />
        <Input
          tabIndex={7}
          color="gray"
          label="Link Pago No Federados"
          aria-labelledby="linkPagoNoFederados"
          labelProps={{ id: "linkPagoNoFederados" }}
          error={isError("linkPagoNoFederados", formErrors)}
          value={data.linkPagoNoFederados}
          onChange={(e) => handleChange("linkPagoNoFederados", e.target.value)}
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">
        <Input
          tabIndex={8}
          color="gray"
          type="number"
          label="Precio Federados CADA"
          aria-labelledby="precioInscripcion.cada"
          labelProps={{ id: "precioInscripcion.cada" }}
          error={isError("precioInscripcion.cada", formErrors)}
          value={data.precioInscripcion.cada}
          onChange={(e) =>
            handleChange("precioInscripcion.cada", parseInt(e.target.value))
          }
        />
        <Input
          tabIndex={8}
          color="gray"
          type="number"
          label="Precio No Federados"
          aria-labelledby="precioInscripcion.ama"
          labelProps={{ id: "precioInscripcion.ama" }}
          error={isError("precioInscripcion.ama", formErrors)}
          value={data.precioInscripcion.ama}
          onChange={(e) =>
            handleChange("precioInscripcion.ama", parseInt(e.target.value))
          }
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">
        <PruebasDisponiblesLogic
          setData={setData}
          formErrors={formErrors}
          pruebas={pruebas.pruebas}
          data={data}
        />
        <CategoriasDisponiblesLogic
          setData={setData}
          formErrors={formErrors}
          categorias={categorias.categorias}
          data={data}
        />
      </div>
      <button type="submit" className="btn-primary">
        Editar Torneo
      </button>
    </form>
  );
};

export default FormLogicEditarTorneo;
