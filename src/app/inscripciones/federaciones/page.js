"use client"
import { Button } from "@/app/utils/materialTailwind";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function Federaciones(){
    const router = useRouter()

    return(
        <main className="pt-[15vh] lg:pt-44 2xl:pt-52 pb-20">
            <section className="size-section xl:mt-6">
                <Button 
                    variant="text" 
                    onClick={() => router.back()}
                    size="sm"
                    color="red"
                    className="w-32 pl-2 mb-4 flex justify-start items-center gap-3 text-title"
                    >
                    <ArrowLeftIcon strokeWidth={2} className="w-5"/>
                    Volver
                </Button>
                <h2 className="text-title title-section text-left">Federaciones</h2>
                <h4 className="text-title font-title text-lg mt-6 text-left">Próximamente</h4>
                {/* <div className="items-center w-full md:w-[90%] flex justify-center gap-6 md:justify-between flex-wrap mt-10">
                    <Link className="bg-tag-bg/50 relative w-4/5 md:w-[45%]" href={"/inscripciones/federaciones/club"}>
                        <Image 
                            src={'/imgs/federacion1.jpg'}
                            height={400}
                            width={500}
                            alt="Federacion Club"
                            className="object-cover object-center relative -z-10"
                        />
                        <h3 className="text-center font-title font-semibold text-base sm:text-lg md:text-xl lg:text-2xl w-52 md:w-96 text-white z-10 center-absolute">
                            Federación Club
                        </h3>
                    </Link>
                    <Link className="bg-tag-bg/50 relative w-4/5 md:w-[45%]" href={"/inscripciones/federaciones/atleta"}>
                        <Image 
                            src={'/imgs/federacion2.jpg'}
                            height={400}
                            width={500}
                            alt="Federacion atleta"
                            className="object-cover object-center relative -z-10"
                        />
                        <h3 className="text-center font-title font-semibold text-base sm:text-lg md:text-xl lg:text-2xl w-52 md:w-96 text-white z-10 center-absolute">
                            Federación Atleta
                        </h3>
                    </Link>
                </div> */}
            </section>
        </main>
    )
}