"use client";
import isError from "@/app/utils/formValidation/isErrorInput";
import { Input, Typography } from "@/app/utils/materialTailwind";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FormLogin = () => {
  // Create form data
  const [data, setData] = useState({
    dni: "",
  });

  const [formErrors, setFormErrors] = useState([]);
  const router = useRouter();
  const handleChange = (property, value) => {
    setData({ ...data, [property]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // create user
    const res = await signIn("credentials", {
      dni: data.dni,
      redirect: false,
    });

    if (res.error) {
      const serverErrors = JSON.parse(res.error);
      // Si el middleware devuelve errores, lo hace en un array errors
      if (serverErrors.errors) {
        setFormErrors(serverErrors.errors);
      } else {
        setFormErrors([serverErrors]);
      }
    } else {
      const callbackUrl = new URL(res.url).searchParams.get("callbackUrl");
      return router.replace(callbackUrl);
    }
  };

  return (
    <>
      <form
        className="w-full lg:w-2/3 mt-10 flex flex-col items-start gap-6"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">
          <Input
            tabIndex={1}
            type="dni"
            color="gray"
            label="DNI*"
            aria-labelledby="dni"
            labelProps={{ id: "dni" }}
            error={isError("dni", formErrors)}
            value={data.dni}
            onChange={(e) => handleChange("dni", e.target.value)}
          />
        </div>
        <button type="submit" className="btn-primary">
          Iniciar Sesión
        </button>
      </form>
      <div>
        {formErrors.length > 0 &&
          formErrors.map((error, i) => (
            <Typography
              variant="small"
              color="gray"
              className="flex items-center gap-1 font-normal mt-2"
              key={i}
            >
              <InformationCircleIcon className="w-4 h-4 -mt-px" />
              {error.msg}
            </Typography>
          ))}
      </div>
    </>
  );
};

export default FormLogin;
