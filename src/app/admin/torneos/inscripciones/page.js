import VolverButton from "@/app/components/button/VolverButton";
import ListTorneosInscripcion from "./ListTorneoInscripcion";
import GenerateListCADA from "./GenerateListCADA";

export default function InscripcionesTorneo() {
  return (
    <main className="pt-[17vh] lg:pt-44 2xl:pt-52 pb-20">
      <section className="size-section flex flex-col items-start gap-4 md:gap-8 xl:mt-6">
        <VolverButton />
        <h2 className="text-title title-section">Descargar Inscripciones</h2>
        <GenerateListCADA />
        <ListTorneosInscripcion />
      </section>
    </main>
  );
}
