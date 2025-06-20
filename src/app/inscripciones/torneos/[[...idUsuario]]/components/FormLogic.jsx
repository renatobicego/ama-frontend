import { useEffect, useState } from "react";
import { useRegistroList } from "@/app/utils/hooks/useRegistroList";
import FormErrorMsg from "@/app/components/form/FormErrorMsg";
import FormInputs from "./FormInputs";
import axios, { AxiosError } from "axios";
import inscripcionValidate from "@/app/utils/formValidation/inscripcionValidation";
import LoadingError from "@/app/components/LoadingError";

// The prop error in each input is to make borders red in case that input returns error

const FormLogicTorneo = ({
  data,
  setData,
  handleSubmit,
  formErrors,
  setFormErrors,
  entrenador,
  submitting,
  setSubmitting,
}) => {
  // Which pruebas user added
  const [pruebasSelected, setPruebasSelected] = useState([]);
  const [shouldSubmit, setShouldSubmit] = useState(false);
  //Get pruebas favoritas
  const { entityData, loading, error } = useRegistroList([
    "torneo/activos",
    `usuarios/${data.atleta}`,
  ]);

  useEffect(() => {
    if (shouldSubmit) {
      handleSubmit();
    }
    setShouldSubmit(false);
  }, [shouldSubmit]);

  if (loading || error) return <LoadingError loading={loading} error={error} />;

  const handleChange = (property, value) => {
    setData({ ...data, [property]: value });
  };

  // Save pruebasSelecte to data before submiting
  const saveDataOnSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const { valid, errors } = inscripcionValidate(data, pruebasSelected);

    if (valid) {
      try {
        const requests = pruebasSelected.map(async (prueba) => {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_URL_API}/pruebas_atleta`,
            prueba
          );
          return data.pruebaAtleta._id;
        });
        const pruebasInscripto = await Promise.all(requests);
        setData((data) => {
          return {
            ...data,
            pruebasInscripto,
          };
        });
        setShouldSubmit(true);
      } catch (error) {
        setSubmitting(false);
        if (error instanceof AxiosError) {
          const axiosErrors = error.response.data;
          if (axiosErrors.errors) {
            setFormErrors(axiosErrors.errors);
          } else {
            setFormErrors([axiosErrors]);
          }
        } else {
          setFormErrors([
            {
              msg: "Error en el servidor",
            },
          ]);
        }
      }
    } else {
      setSubmitting(false);
      setFormErrors(errors);
    }
  };

  return (
    <form
      className="w-full lg:w-2/3 mt-10 flex flex-col items-start gap-6"
      onSubmit={saveDataOnSubmit}
    >
      <FormInputs
        data={data}
        entityData={entityData}
        formErrors={formErrors}
        handleChange={handleChange}
        pruebasSelected={pruebasSelected}
        setPruebasSelected={setPruebasSelected}
        usuario={entityData[`usuarios/${data.atleta}`].usuario}
      />

      {data.categoria !== "" && data.torneo !== "" && (
        <div>
          <button type="submit" className="btn-primary flex gap-1 items-center">
            <svg
              className={`animate-spin -ml-1 mr-3 h-5 w-5 text-white ${
                submitting ? "" : "hidden"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-55"
                cx="12"
                cy="12"
                r="10"
                stroke="#E9E9E9"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="#1F1F1F"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {entrenador ? "Inscribir Atleta" : "Inscribirse"}
          </button>
          <FormErrorMsg formErrors={formErrors} />
        </div>
      )}
    </form>
  );
};

export default FormLogicTorneo;
