import { useEffect, useState } from "react";
import {
  Input,
  Option,
  Select,
  Spinner,
  Typography,
} from "@/app/utils/materialTailwind";
import { InformationCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import registerValidate from "@/app/utils/formValidation/registerValidation";
import { useRegistroList } from "@/app/utils/hooks/useRegistroList";
import isError from "@/app/utils/formValidation/isErrorInput";
import LoadingError from "@/app/components/LoadingError";

const FormLogicRegistrar = ({
  data,
  handleChange,
  handleSubmit,
  setFormErrors,
  formErrors,
  mode,
}) => {
  const [passwordRepeat, setPasswordRepeat] = useState("");
  // Get form input for select dropdowns
  const { entityData, loading, error } = useRegistroList([
    "club",
    "federaciones",
    "asociaciones",
  ]);
  const { club, federaciones, asociaciones } = entityData;

  if (loading || error) return <LoadingError loading={loading} error={error} />;

  const validateSubmit = (e) => {
    e.preventDefault();

    const { valid, errors } = registerValidate(
      data,
      mode === "create" && passwordRepeat
    );

    if (valid) {
      handleSubmit();
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <form
      className="w-full lg:w-2/3 mt-10 flex flex-col items-start gap-6"
      onSubmit={validateSubmit}
    >
      <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">
        <Input
          tabIndex={1}
          color="gray"
          label="Apellido y Nombre*"
          aria-labelledby="nombre"
          labelProps={{ id: "nombre" }}
          error={isError("nombre_apellido", formErrors)}
          value={data.nombre_apellido}
          onChange={(e) => handleChange("nombre_apellido", e.target.value)}
        />

        <div className="w-full relative">
          {/* <Select 
                        tabIndex={2}
                        onChange={(value) => handleChange('club', value)} 
                        value={data.club} 
                        color="gray"
                        error={isError('club', formErrors)}
                        // dismiss={{
                        //     ancestorScroll: true
                        // }}
                        aria-labelledby="club"
                        labelProps={{id: 'club'}}
                        label="Club*">
            
                        {club.clubes.map((club, i) => 
                            <Option key={i} value={club._id}>
                                {club.nombre}
                            </Option>
                            )}

                    </Select> */}
          <select
            tabIndex={2}
            onChange={(event) => handleChange("club", event.target.value)}
            value={data.club}
            aria-labelledby="club"
            labelProps={{ id: "club" }}
            placeholder="Club*"
            className={`border border-gray-400 py-2.5 px-2 text-sm rounded-md
                                    ${
                                      isError("club", formErrors)
                                        ? "border-red-700"
                                        : ""
                                    }`}
          >
            <option value={""}>Seleccionar Club</option>
            {club.clubes.map((club, i) => (
              <option key={i} value={club._id}>
                {club.nombre}
              </option>
            ))}
          </select>
          <Typography
            variant="small"
            color="gray"
            className="flex items-center gap-1 font-normal mt-2"
          >
            <InformationCircleIcon className="w-4 h-4 -mt-px" />
            Si no tiene club y es atleta libre, no seleccione nada
          </Typography>
          <button
            aria-label="delete club"
            type="button"
            className={`absolute -right-6 top-[42%] md:-right-10 md:top-2 rounded cursor-pointer`}
            onClick={() => handleChange("club", "")}
          >
            <TrashIcon
              strokeWidth={1}
              className="h-5 w-5 md:h-7 md:w-7 text-gray-700"
            />
          </button>
        </div>
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">
        <div className="w-full">
          <Input
            tabIndex={3}
            color="gray"
            label="DNI*"
            pattern="^[0-9]*$"
            error={isError("dni", formErrors)}
            value={data.dni}
            aria-labelledby="dni"
            labelProps={{ id: "dni" }}
            onChange={(e) => handleChange("dni", e.target.value)}
          />
          <Typography
            variant="small"
            color="gray"
            className="flex items-center gap-1 font-normal mt-2"
          >
            <InformationCircleIcon className="w-4 h-4 -mt-px" />
            Solo números, no agregar puntos.
          </Typography>
        </div>

        <Input
          tabIndex={4}
          type="date"
          color="gray"
          label="Fecha de Nacimiento*"
          aria-labelledby="fecha-nacimiento"
          labelProps={{ id: "fecha-nacimiento" }}
          error={isError("fecha_nacimiento", formErrors)}
          value={data.fecha_nacimiento}
          onChange={(e) => handleChange("fecha_nacimiento", e.target.value)}
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">
        <Select
          tabIndex={5}
          onChange={(value) => handleChange("pais", value)}
          value={data.pais}
          color="gray"
          error={isError("pais", formErrors)}
          aria-labelledby="pais"
          labelProps={{ id: "pais" }}
          label="Pais*"
        >
          <Option value={"ARG"}>Argentina</Option>
          <Option value={"Otro"}>Otro</Option>
        </Select>

        <Select
          tabIndex={6}
          onChange={(value) => handleChange("sexo", value)}
          value={data.sexo}
          color="gray"
          error={isError("sexo", formErrors)}
          aria-labelledby="sexo"
          labelProps={{ id: "sexo" }}
          label="Sexo*"
        >
          <Option key={1} value={"M"}>
            Masculino
          </Option>
          <Option key={1} value={"F"}>
            Femenino
          </Option>
        </Select>
      </div>

      <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">
        <Input
          tabIndex={7}
          color="gray"
          label="Teléfono*"
          type="tel"
          aria-labelledby="telefono"
          labelProps={{ id: "telefono" }}
          error={isError("telefono", formErrors)}
          value={data.telefono}
          onChange={(e) => handleChange("telefono", e.target.value)}
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">
        {/* <Select 
                    tabIndex={9}
                    onChange={(value) => handleChange('federacion', value)} 
                    value={data.federacion} 
                    aria-labelledby="federacion"
                    labelProps={{id: 'federacion'}}
                    color="gray"
                    error={isError('federacion', formErrors)}
                    label="Federación*">

                    {federaciones.federaciones.map((federacion, i) => 
                        <Option key={i} value={federacion._id}>
                            {federacion.nombre}
                        </Option>
                        )}

                </Select>
                <Select 
                    tabIndex={10}
                    onChange={(value) => handleChange('asociacion', value)} 
                    value={data.asociacion} 
                    aria-labelledby="asociacion"
                    
                    labelProps={{id: 'asociacion'}}
                    color="gray"
                    error={isError('asociacion', formErrors)}
                    label="Asociación*">

                    {asociaciones.asociaciones.map((asociacion, i) => 
                        <Option key={i} value={asociacion._id}>
                            {asociacion.nombre}
                        </Option>
                        )}

                </Select> */}
        <select
          tabIndex={8}
          onChange={(event) => handleChange("federacion", event.target.value)}
          value={data.federacion}
          aria-labelledby="federacion"
          labelProps={{ id: "federacion" }}
          placeholder="Federación*"
          className={`border border-gray-400 py-2.5 px-2 text-sm rounded-md
                                ${
                                  isError("federacion", formErrors)
                                    ? "border-red-700"
                                    : ""
                                }`}
        >
          <option value={""}>Seleccionar Federación</option>
          {federaciones.federaciones.map((federacion, i) => (
            <option key={i} value={federacion._id}>
              {federacion.nombre}
            </option>
          ))}
        </select>
        <select
          tabIndex={9}
          onChange={(event) => handleChange("asociacion", event.target.value)}
          value={data.asociacion}
          aria-labelledby="asociacion"
          labelProps={{ id: "asociacion" }}
          placeholder="Asociacion*"
          className={`border border-gray-400 py-2.5 px-2 text-sm rounded-md
                                ${
                                  isError("asociacion", formErrors)
                                    ? "border-red-700"
                                    : ""
                                }`}
        >
          <option value={""}>Seleccionar Asociación</option>
          {asociaciones.asociaciones.map((asociacion, i) => (
            <option key={i} value={asociacion._id}>
              {asociacion.nombre}
            </option>
          ))}
        </select>
      </div>

      {mode === "create" && (
        <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">
          <div className="w-full">
            <Input
              tabIndex={10}
              color="gray"
              label="Contraseña*"
              aria-labelledby="password"
              labelProps={{ id: "password" }}
              type="password"
              error={isError("password", formErrors)}
              value={data.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
            <Typography
              variant="small"
              color="gray"
              className="flex items-center gap-1 font-normal mt-2"
            >
              <InformationCircleIcon className="w-4 h-4 -mt-px" />
              La contraseña debe tener 8 o más caracteres
            </Typography>
          </div>

          <Input
            tabIndex={11}
            type="password"
            color="gray"
            label="Repetir Contraseña*"
            aria-labelledby="password-check"
            labelProps={{ id: "password-check" }}
            error={isError("password", formErrors)}
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
          />
        </div>
      )}
      <button type="submit" className="btn-primary">
        {mode === "create" ? "Crear Usuario" : "Editar Perfil"}
      </button>
    </form>
  );
};

export default FormLogicRegistrar;
