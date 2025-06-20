"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/app/utils/materialTailwind"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"

const VolverButton = () => {
    const router = useRouter()
    return (
        <Button 
            variant="text" 
            onClick={() => router.back()}
            size="sm"
            color="red"
            className="w-32 pl-0 mb-4 flex justify-start items-center gap-3 text-title"
            >
            <ArrowLeftIcon strokeWidth={2} className="w-5"/>
            Volver
        </Button>
    )
}

export default VolverButton