
import { Card, Checkbox, List, ListItem, ListItemPrefix, Typography } from "@/app/utils/materialTailwind"

const PruebasDisponiblesLogic = ({data, setData, pruebas, formErrors}) => {

    const handleChange = (e) => {
        if(data.pruebasDisponibles.includes(e.target.value)){
            setData({
                ...data,
                pruebasDisponibles: data.pruebasDisponibles.filter(prueba => prueba !== e.target.value)
            })
        }else{
            setData({
                ...data,
                pruebasDisponibles: [...data.pruebasDisponibles, e.target.value]
            })
        }
    }


    return (
        <>
            <Card>
                <div className="mb-2 p-4">
                    <Typography variant="h5" className="text-title font-title">
                        Elegir Pruebas Disponibles
                    </Typography>
                </div>
                <List>
                    {pruebas.map((prueba, i) => 
                        <ListItem key={i} className="p-0">
                            <label
                                htmlFor={prueba._id}
                                className="flex w-full cursor-pointer items-center px-3 py-2"
                            >
                                <ListItemPrefix className="mr-3">
                                    <Checkbox
                                        id={prueba._id}
                                        ripple={false}
                                        className="hover:before:opacity-0"
                                        value={prueba._id}
                                        onChange={handleChange}
                                        checked={data.pruebasDisponibles.includes(prueba._id)}
                                        containerProps={{
                                        className: "p-0",
                                        }} 
                                    />
                                </ListItemPrefix>
                                <Typography className=" text-title font-title">
                                    {prueba.nombre}
                                </Typography>
                            </label>
                        </ListItem>
                    )}
                </List>
            </Card>
            {/* If user doesn't add pruebas, show error */}
            {formErrors.some(error => error.path === 'pruebasDisponibles') &&
                <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal mt-2">
                    <InformationCircleIcon className="w-4 h-4 -mt-px" />
                    Por favor, seleccione las pruebas disponibles del torneo
                </Typography>
            }
        </>
    )
}

export default PruebasDisponiblesLogic