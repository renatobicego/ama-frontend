import isError from "@/app/utils/formValidation/isErrorInput";
import { Button, Input, Option, Select } from "@/app/utils/materialTailwind";
import { useEffect, useState } from "react";
import PruebasLogic from "./PruebasLogic";
import Link from "next/link";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";

const FormInputs = ({
  data,
  handleChange,
  formErrors,
  entityData,
  pruebasSelected,
  setPruebasSelected,
  usuario,
  setTorneoData,
  torneoData,
}) => {
  const { torneos } = entityData["torneo/activos"];

  useEffect(() => {
    if (torneoData.pruebasDisponibles) {
      setTorneoData((prevTorneoData) => ({
        ...prevTorneoData,
        pruebasParaElegir: prevTorneoData.pruebasDisponibles.filter((p) => {
          if (!p.categorias) {
            return p;
          } else if (p.categorias.some((c) => c._id === data.categoria)) {
            return p;
          }
        }),
      }));
    }

    setPruebasSelected([]);
  }, [data.categoria]);

  return (
    <>
      <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">
        <Select
          value={data.torneo}
          aria-labelledby="torneo"
          tabIndex={1}
          color="gray"
          label="Torneo a Inscribirse*"
          labelProps={{ id: "torneo" }}
          error={isError("torneo", formErrors)}
          onChange={(value) => {
            handleChange("torneo", value);
            setTorneoData(torneos.find((torneo) => torneo._id === value));
          }}
        >
          {torneos.map((torneo, i) => (
            <Option key={i} value={torneo._id}>
              {torneo.nombre}
            </Option>
          ))}
        </Select>
        {torneoData.categoriasDisponibles && (
          <Select
            tabIndex={2}
            aria-labelledby="categoria"
            labelProps={{ id: "categoria" }}
            color="gray"
            label="Categoría*"
            error={isError("categoria", formErrors)}
            defaultValue={data.categoria}
            onChange={(value) => handleChange("categoria", value)}
          >
            {torneoData.categoriasDisponibles.map((categoria) => (
              <Option key={categoria._id} value={categoria._id}>
                {categoria.nombre}
              </Option>
            ))}
          </Select>
        )}
      </div>
      {data.categoria !== "" &&
        data.torneo !== "" &&
        torneoData.pruebasParaElegir && (
          <>
            <h3 className="text-text font-text font-semibold border-2 p-2">
              Para editar los siguientes datos personales, edite su perfil en
              <Link href={"/perfil"} className="text-light-blue-800">
                {" "}
                Mi Perfil
              </Link>
            </h3>
            <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6 ">
              <Input
                aria-labelledby="nombre_apellido"
                color="gray"
                label="Nombre y Apellido*"
                labelProps={{
                  id: "nombre_apellido",
                }}
                defaultValue={usuario.nombre_apellido}
                disabled
              />

              <Input
                aria-labelledby="sexo"
                defaultValue={usuario.sexo}
                color="gray"
                label="Sexo*"
                labelProps={{ id: "sexo" }}
                disabled
              ></Input>
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">
              <Input
                aria-labelledby="dni"
                color="gray"
                label="DNI*"
                labelProps={{ id: "dni" }}
                defaultValue={usuario.dni}
                disabled
              />

              <Input
                aria-labelledby="fecha_nacimiento"
                type="date"
                color="gray"
                label="Fecha de Nacimiento*"
                labelProps={{ id: "fecha_nacimiento" }}
                defaultValue={
                  new Date(usuario.fecha_nacimiento).toISOString().split("T")[0]
                }
                disabled
              />
            </div>
            <div className="flex w-full justify-between flex-wrap md:flex-nowrap gap-6">
              <Input
                aria-labelledby="club"
                defaultValue={
                  usuario.club ? usuario.club.nombre : "Club No Elegido"
                }
                disabled
                color="gray"
                label="Club*"
                labelProps={{ id: "club" }}
              ></Input>

              <Input
                defaultValue={usuario.federacion.nombre}
                color="gray"
                label="Federación*"
                labelProps={{ id: "federacion" }}
                aria-labelledby="federacion"
                disabled
              ></Input>
            </div>

            <div className="flex w-full justify-between flex-wrap md:flex-nowrap gap-6">
              <Input
                defaultValue={usuario.asociacion.nombre}
                color="gray"
                label="Asociación*"
                labelProps={{ id: "asociacion" }}
                aria-labelledby="asociacion"
                disabled
              ></Input>

              <Input
                disabled
                defaultValue={usuario.pais}
                color="gray"
                label="Pais*"
                labelProps={{ id: "pais" }}
                aria-labelledby="pais"
              />
            </div>
            <PruebasLogic
              // Filter for categoriasDisponibles. If prueba.categorias includes categoria
              // selected, show prueba, else don't show
              pruebas={torneoData.pruebasParaElegir}
              pruebasSelected={pruebasSelected}
              setPruebasSelected={setPruebasSelected}
              formErrors={formErrors}
              usuario={usuario}
            />
            <div className="flex flex-col gap-4 items-left justify-start">
              {(torneoData.linkPagoFederados ||
                torneoData.linkPagoNoFederados) && (
                <h3 className="text-text font-text font-semibold p-2">
                  Por favor, guarde el comprobante de pago. En caso de no tener
                  los medios de pagos aceptados, puede contactar por este mail:
                  master1963@live.com.ar. También, puede pagar luego en
                  <Link href={"/perfil"} className="text-light-blue-800">
                    {" "}
                    Mi Perfil {">"} Mis Inscripciones
                  </Link>
                </h3>
              )}
              {torneoData.linkPagoFederados && (
                <Link target="_blank" href={torneoData.linkPagoFederados}>
                  <Button
                    className="flex items-center gap-3 text-primary2 bg-secondary1 rounded-3xl"
                    color="white"
                  >
                    <CurrencyDollarIcon strokeWidth={2} className="h-5 w-5" />
                    Pagar Inscripción Federados
                  </Button>
                </Link>
              )}
              {torneoData.linkPagoNoFederados && (
                <Link target="_blank" href={torneoData.linkPagoNoFederados}>
                  <Button
                    className="flex items-center gap-3 text-primary2 bg-secondary1 rounded-3xl"
                    color="white"
                  >
                    <CurrencyDollarIcon strokeWidth={2} className="h-5 w-5" />
                    Pagar Inscripción No Federados
                  </Button>
                </Link>
              )}
            </div>

            {torneoData.requerirComprobante && (
              <div className="flex flex-col gap-4 items-left justify-start">
                <div className="flex items-center gap-2">
                  <p>
                    Precio Pago Online:{" "}
                    <b>${torneoData.precioInscripcion.cada}</b>
                  </p>
                  <p>
                    Precio Pago en Pista{" "}
                    <b>${torneoData.precioInscripcion.ama}</b>
                  </p>
                </div>
                <p>
                  La inscripcion al torneo puede abonarse con un descuento
                  pagando con transferencia bancaria. Por favor, transfiera el
                  dinero al alias:{" "}
                  <span className="text-primary2 font-semibold">
                    pajaromurgo
                  </span>{" "}
                  (Ruben Marcelo Murgo) el monto de{" "}
                  <b>${torneoData.precioInscripcion.cada}</b> y adjunte el
                  comprobante.
                </p>
                <h3 className="text-text font-text font-semibold">
                  Por favor, suba el comprobante de pago.
                </h3>
                <Input
                  type="file"
                  color="gray"
                  label="Comprobante de Pago*"
                  id="comprobante"
                  error={isError("comprobante", formErrors)}
                  labelProps={{ id: "comprobante" }}
                  aria-labelledby="comprobante_pago"
                  accept="image/*, application/pdf"
                  onChange={(e) =>
                    handleChange("comprobante", e.target.files[0])
                  }
                />
              </div>
            )}
          </>
        )}
    </>
  );
};

export default FormInputs;
