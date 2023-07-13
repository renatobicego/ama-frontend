"use client"
import { useState } from "react";
import { useRegistroList } from "@/app/utils/hooks/useRegistroList";
import FormLogicRegistrar from "./formLogicRegistrar";
import axios from "axios";


const FormRegistrar = () => {

    // Create form data
    const [data, setData] = useState({
        nombre_apellido: '',
        dni: '',
        fecha_nacimiento: '',
        password:'',
        club: '',
        telefono: '',
        email: '',
        asociacion: '',
        federacion: '',
        pruebasFavoritas: ''
    })

    // Get form input for select dropdowns
    const { entityData, loading, error } = useRegistroList(['club', 'federaciones', 'asociaciones'])

    if (loading) {
        return <div className="mt-6">Cargando los datos del formulario...</div>;
    }
    if (error) {
      return <div>Error al cargar el formulario</div>;
    }
    
    const handleChange = (property, value) => {
        setData({...data, [property]: value})
    }
    
    const handleSubmit = async() => {  
        // create user
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/usuarios`, data)
        } catch (error) {
            
        }
    }

    return(
        <FormLogicRegistrar 
            data={data}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            entityData={entityData}
            />
    )
}


export default FormRegistrar