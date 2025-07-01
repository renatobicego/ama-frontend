"use client";
import FormLogicTorneo from "./components/FormLogic";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import VolverButton from "@/app/components/button/VolverButton";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import LoadingError from "@/app/components/LoadingError";

export default function InscripcionesTorneos({ params }) {
  //If user logged in, fetch user data
  const { data: session, status } = useSession();
  const router = useRouter();

  const [data, setData] = useState({
    torneo: "",
    categoria: "",
    atleta: "",
    pruebasInscripto: [],
  });
  // Which input returned error and the message
  const [formErrors, setFormErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (params.idUsuario) {
      setData((prevData) => ({ ...prevData, atleta: params.idUsuario[0] }));
    } else if (session) {
      setData((prevData) => ({
        ...prevData,
        atleta: session.user.usuario.uid,
      }));
    }
  }, [session, params]);

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      categoria: "",
    }));
    setFormErrors([]);
  }, [data.torneo]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL_API}/inscripciones`,
        data,
        {
          headers: {
            "x-token": session.user.token,
          },
        }
      );
      if (res.status === 200) {
        setSubmitting(false);
        if (params.idUsuario) {
          router.replace("/admin/atletas/inscripciones");
        } else {
          router.replace("/perfil");
        }
      }
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
            msg: "Error en el servidor",
          },
        ]);
      }
    }
  };

  if (status === "loading") {
    return (
      <main className="pt-[15vh] lg:pt-44 2xl:pt-52 pb-20">
        <section className="size-section xl:mt-6">
          <LoadingError loading={true} />
        </section>
      </main>
    );
  }

  return (
    <main className="pt-[15vh] lg:pt-44 2xl:pt-52 pb-20">
      <section className="size-section xl:mt-6">
        <VolverButton />
        <h2 className="text-title title-section text-left">
          Inscripciones a Torneos
        </h2>
        {data.atleta !== "" && (
          <FormLogicTorneo
            submitting={submitting}
            setSubmitting={setSubmitting}
            data={data}
            setData={setData}
            handleSubmit={handleSubmit}
            formErrors={formErrors}
            setFormErrors={setFormErrors}
            entrenador={params.idUsuario !== undefined}
          />
        )}
      </section>
    </main>
  );
}
