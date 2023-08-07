"use client"

import FormErrorMsg from "@/app/components/form/FormErrorMsg"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import PublicarCampeonFormInputs from "./PublicarCampeonFormInputs"
import { subirArchivoFirebase } from "@/app/utils/files/archivosFirebase"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import VolverButton from "@/app/components/button/VolverButton"
import comprimirArchivos from "@/app/utils/files/comprimirArchivos"

const PublicarCampeon = ({params}) => {
    const {data: session} = useSession()

    const [formErrors, setFormErrors] = useState([])
    const [data, setData] = useState({
        nombre_apellido: '',
        pruebasCampeon: [],
    })
    const {modoForm} = params
    const router = useRouter()

    const [img, setImg] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data: dataCampeon}= await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/campeones/${modoForm[1]}`)
                setData({
                    id: dataCampeon.campeon._id,
                    nombre_apellido: dataCampeon.campeon.nombre_apellido,
                    pruebasCampeon: [
                        ...dataCampeon.campeon.pruebasCampeon.map(prueba => prueba._id), 
                        ...data.pruebasCampeon
                    ]
                })
            } catch (error) {
                console.log(error)
                setFormErrors([{msg: 'Error al cargar el formulario'}])
            }
        }
    
        if (modoForm[0] === 'editar') {
            fetchData()
        }
    }, [modoForm])

    const handleSubmit = async() => {
        try {
            let res
            if(modoForm[0] === 'publicar'){

                data.img = await subirArchivoFirebase(await comprimirArchivos(img, 'jpeg'), 'images/campeones/')
                res = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/campeones`, data, {
                    headers: {
                        'x-token': session.user.token
                      },
               })
            }else if (modoForm[0] === 'editar'){
                if(img){
                    data.img = await subirArchivoFirebase(await comprimirArchivos(img, 'jpeg'), 'images/campeones/')
                }
                res = await axios.put(`${process.env.NEXT_PUBLIC_URL_API}/campeones/${data.id}`, data, {
                    headers: {
                        'x-token': session.user.token
                      },
               })
            }else{
                throw new Error('Error. Por favor, visite este sitio de nuevo y no cambie la url')
            }

            if(res.status === 200) return router.push('/admin/campeones')

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
                <VolverButton />
                <h2 className="text-title title-section text-left">
                    {modoForm[0] === 'editar' ? 'Editar Campeón Nacional': 'Publicar Campeón Nacional'}
                </h2>
                <PublicarCampeonFormInputs 
                    data={data}
                    formErrors={formErrors}
                    img={img}
                    setData={setData}
                    setImg={setImg}
                    setFormErrors={setFormErrors}
                    handleSubmit={handleSubmit}
                    creando={modoForm[0] === 'publicar'}
                />
                <FormErrorMsg formErrors={formErrors} />
            </section>
        </main>
    )
}

export default PublicarCampeon