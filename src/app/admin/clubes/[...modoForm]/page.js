"use client"

import FormErrorMsg from "@/app/components/form/FormErrorMsg"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import PublicarClubFormInputs from "./PublicarClubFormInputs"
import { subirArchivoFirebase } from "@/app/utils/files/archivosFirebase"
import axios, { AxiosError } from "axios"
import { useParams, useRouter } from "next/navigation"
import VolverButton from "@/app/components/button/VolverButton"
import comprimirArchivos from "@/app/utils/files/comprimirArchivos"
import LoadingError from "@/app/components/LoadingError"

const PublicarClub = () => {
    const {data: session, status} = useSession()
    const params = useParams()
    
    const [formErrors, setFormErrors] = useState([])
    const [data, setData] = useState({
        nombre: '',
        siglas: '',
        ciudad: '',
        instagram: '',
        twitter: '',
        facebook: '',
        entrenadores: []
    })

    const router = useRouter()

    const [logoImg, setLogoImg] = useState(null)

    useEffect(() => {
        if(status === 'authenticated'){ 
            if(session.user.usuario.role === 'USER_ROLE') router.replace('/clubes')
        }
    }, [session])

    useEffect(() => {
        const fetchData = async () => {
            try {
                let res
                if(session.user.usuario.role === 'ENTRENADOR_ROLE'){
                    res = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/club/id/${session.user.usuario.club}`)
                }else{
                    res = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/club/${params.modoForm.split('/')[1]}`)
                }
                const {data: dataClub} = res
                const newData = {
                    id: dataClub.club._id,
                    nombre: dataClub.club.nombre,
                    siglas: dataClub.club.siglas,
                    ciudad: dataClub.club.ciudad,
                    instagram: dataClub.club.instagram,
                    twitter: dataClub.club.twitter,
                    facebook: dataClub.club.facebook
                }
                if(dataClub.club.entrenadores.length > 0){
                    newData['entrenadores'] = [
                        ...dataClub.club.entrenadores.map(entrenador => entrenador._id),
                        ...data.entrenadores
                    ]
                }else{
                    newData['entrenadores'] = [
                        ...data.entrenadores
                    ]
                }
                setData(newData)
            } catch (error) {
                console.log(error)
                setFormErrors([{msg: 'Error al cargar el formulario'}])
            }
        }
    
        if (params.modoForm.split('/')[0] === 'editar') {
            fetchData()
        }
    }, [params.modoForm])
    if(status === 'loading') {
        return (
            <main className="pt-[17vh] lg:pt-44 2xl:pt-52 pb-20">
                <section className="size-section flex flex-col items-start gap-4 md:gap-8 xl:mt-6">
                    <LoadingError loading={true} />
                </section>
            </main>
        )
    }

    const handleSubmit = async() => {
        try {
            let res
            if(params.modoForm === 'publicar'){
                data.logoImg = await subirArchivoFirebase(await comprimirArchivos(logoImg), 'images/clubes/')
                res = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/club`, data, {
                    headers: {
                        'x-token': session.user.token
                      },
               })
            }else if (params.modoForm.split('/')[0] === 'editar'){
                if(logoImg){
                    data.logoImg = await subirArchivoFirebase(await comprimirArchivos(logoImg, 'png'), 'images/clubes/')
                }
                if(data.entrenadores.length > 0){
                    await Promise.all(data.entrenadores.map(async(entrenador) => {
                        await axios.put(`${process.env.NEXT_PUBLIC_URL_API}/usuarios/${entrenador}`, {
                            role: 'ENTRENADOR_ROLE'
                        })
                    }))
                }
                res = await axios.put(`${process.env.NEXT_PUBLIC_URL_API}/club/${data.id}`, data, {
                    headers: {
                        'x-token': session.user.token
                      },
               })
            }else{
                throw new Error('Error. Por favor, visite este sitio de nuevo y no cambie la url')
            }
            
            if(res.status === 200) return router.push('/admin')

        } catch (error) {
            console.log(error);
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
                    {params.modoForm.split('/')[0] === 'editar' ? 'Editar Club': 'Publicar Club'}
                </h2>
                <PublicarClubFormInputs 
                    data={data}
                    formErrors={formErrors}
                    logoImg={logoImg}
                    setData={setData}
                    setLogoImg={setLogoImg}
                    setFormErrors={setFormErrors}
                    handleSubmit={handleSubmit}
                    creando={params.modoForm === 'publicar'}
                />
                <FormErrorMsg formErrors={formErrors} />
            </section>
        </main>
    )
}

export default PublicarClub