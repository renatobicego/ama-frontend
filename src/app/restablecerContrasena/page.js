import FormResetPassword from "./FormResetPassword";

export default function ResetPassword() {
  return (
    <main className="pt-[17vh] lg:pt-44 2xl:pt-52 pb-20 ">
      <section className="size-section xl:mt-6">
        <h2 className="text-title title-section text-left">
          Restablecer Contraseña
        </h2>
        <FormResetPassword />
      </section>
    </main>
  );
}
