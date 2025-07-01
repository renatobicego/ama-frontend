"use client";
import { useState } from "react";
import FormLogicCrearTorneo from "./FormLogicCrearTorneo";
import VolverButton from "@/app/components/button/VolverButton";
import FormErrorMsg from "@/app/components/form/FormErrorMsg";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { subirArchivoFirebase } from "@/app/utils/files/archivosFirebase";

const FormCrearTorneo = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [data, setData] = useState({
    nombre: "",
    fecha: "",
    lugar: "",
    pruebasDisponibles: [],
    categoriasDisponibles: [],
    cantidadDias: 1,
    linkPagoFederados: "",
    linkPagoNoFederados: "",
    requerirComprobante: false,
    precioInscripcion: {
      cada: undefined,
      ama: undefined,
    },
  });

  const [programaHorario, setProgramaHorario] = useState(null);
  const [formErrors, setFormErrors] = useState([]);

  const handleProgramaHorarioChange = (e) => {
    setProgramaHorario(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      if (programaHorario) {
        data.programaHorario = await subirArchivoFirebase(
          programaHorario,
          "archivos/programaHorarioTorneos/"
        );
      }
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL_API}/torneo`,
        data,
        {
          headers: {
            "x-token": session.user.token,
          },
        }
      );

      if (res.status === 200) return router.replace("/torneos");
    } catch (error) {
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
            msg: error.message,
          },
        ]);
      }
    }
  };

  console.log(data);
  return (
    <>
      <VolverButton />
      <h2 className="text-title title-section">Crear Torneo</h2>
      <FormLogicCrearTorneo
        data={data}
        setData={setData}
        setFormErrors={setFormErrors}
        handleSubmit={handleSubmit}
        formErrors={formErrors}
        programaHorario={programaHorario}
        handleProgramaHorarioChange={handleProgramaHorarioChange}
      />
      <FormErrorMsg formErrors={formErrors} />
    </>
  );
};

export default FormCrearTorneo;
