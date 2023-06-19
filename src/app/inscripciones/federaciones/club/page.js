"use client"
import { useRouter } from "next/navigation";
import FormFederacionClub from "./components/FormFederacionClub";
import { Button } from "@/app/utils/materialTailwind";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";


export default function FederacionClub(){
    const router = useRouter()
    return (
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
                <h2 className="text-title title-section text-left">Federación Club</h2>
                <FormFederacionClub />
            </section>
        </main>
    )
}