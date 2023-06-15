
import { Typography } from "@/app/utils/materialTailwind";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Pruebas from "./Pruebas";
import { Wallet } from "@mercadopago/sdk-react"
import CategoriaTorneo from "./CategoriaTorneo";
import DatosPersonales from "./DatosPersonales";
import Federacion from "./Federacion";

const FormLogicTorneo = ({data, setData}) => {

    const handleChange = (property, value) => {
        setData({...data, [property]: value})
    }

    //TODO validation
    return(
        <form className="w-2/3 mt-10 flex flex-col items-start gap-6">
            <CategoriaTorneo data={data} handleChange={handleChange} />

            <DatosPersonales data={data} handleChange={handleChange} />
            
            <Federacion data={data} handleChange={handleChange} />

            <Pruebas data={data} handleChange={handleChange} />

            <Wallet initialization={{ preferenceId: '<PREFERENCE_ID>' }} />

            <div>
                <button className="btn-primary opacity-50">Inscribirse</button>
                <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal mt-2">
                    <InformationCircleIcon className="w-4 h-4 -mt-px" />
                    Para inscribirse debe abonar la inscripción
                </Typography>
            </div>
            
        </form>
    )
}

export default FormLogicTorneo