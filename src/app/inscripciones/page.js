import Image from "next/image";
import Link from "next/link";


export default function Inscripciones(){
    return(
        <main className="pt-[17vh] lg:pt-44 2xl:pt-52 pb-20">
            <section className="size-section xl:mt-6">
                <h2 className="text-title title-section text-left">Inscripciones</h2>
                <div className="items-center w-full md:w-[90%] flex justify-center gap-6 md:justify-between flex-wrap mt-10">
                    <Link className="bg-tag-bg/50 relative w-4/5 md:w-[45%]" href={"/inscripciones/federaciones"} role="link" prefetch={false}>
                        <Image 
                            src={'/imgs/inscripciones1.png'}
                            height={400}
                            width={500}
                            alt="Inscripciones"
                            className="object-cover object-center relative -z-10"
                        />
                        <h3 className="text-center font-title font-semibold text-base sm:text-lg md:text-xl lg:text-2xl w-52 md:w-96 text-white z-10 center-absolute">
                            Federación Anual AMA
                        </h3>
                    </Link>
                    <Link className="bg-tag-bg/50 relative w-4/5 md:w-[45%]" href={"/inscripciones/torneos"} role="link" prefetch={false}>
                        <Image 
                            src={'/imgs/inscripciones2.png'}
                            height={400}
                            width={500}
                            alt="Inscripciones"
                            className="object-cover object-center relative -z-10"
                        />
                        <h3 className="text-center font-title font-semibold text-base sm:text-lg md:text-xl lg:text-2xl w-52 md:w-96 text-white z-10 center-absolute">
                            Inscripción a Torneos
                        </h3>
                    </Link>
                </div>
            </section>
        </main>
    )
}