"use client"

import LoadingError from "@/app/components/LoadingError"
import FormErrorMsg from "@/app/components/form/FormErrorMsg"
import { useSession } from "next-auth/react"
import { useState } from "react"
import PublicarCampeonFormInputs from "./PublicarCampeonFormInputs"
import { subirArchivoFirebase } from "@/app/utils/files/archivosFirebase"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/router"

const PublicarCampeon = () => {
    const {data: session, status} = useSession()
    const [formErrors, setFormErrors] = useState([])
    const [data, setData] = useState({
        nombreApellido: '',
        pruebasCampeon: [],
        img: ''
    })
    const router = useRouter()

    const [img, setImg] = useState(null)

    const handleSubmit = async() => {
        try {
            data.img = await subirArchivoFirebase(img, 'images/campeones/')
            const res = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/campeones`, data, {
                headers: {
                    'x-token': session.user.token
                  },

           })

            // if(res.status === 200) return router.push('/admin/campeones')
            if(res.status === 200) return router.push('/admin')

        } catch (error) {
            
            if(error instanceof AxiosError){
                const axiosErrors = error.response.data
                if(axiosErrors.errors){
                    setFormErrors(axiosErrors.errors)
                }else{
                    setFormErrors([axiosErrors])
                }
            }else{
                setFormErrors([{
                    msg: error.message
                }])
            }
        }
    }
 
    return (
        <main className="pt-[17vh] lg:pt-44 2xl:pt-52 pb-20">
            <section className="size-section flex flex-col items-start gap-4 md:gap-8 xl:mt-6">
                <h2 className="text-title title-section text-left">Publicar Campeón Nacional</h2>
                <PublicarCampeonFormInputs 
                    data={data}
                    formErrors={formErrors}
                    img={img}
                    setData={setData}
                    setImg={setImg}
                    setFormErrors={setFormErrors}
                    handleSubmit={handleSubmit}
                />
                <FormErrorMsg formErrors={formErrors} />
            </section>
        </main>
    )
}

export default PublicarCampeon