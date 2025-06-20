
import { Card, Checkbox, List, ListItem, ListItemPrefix, Typography } from "@/app/utils/materialTailwind"

const CategoriasDisponiblesLogic = ({data, setData, categorias, formErrors}) => {

    const handleChange = (e) => {
        if(data.categoriasDisponibles.includes(e.target.value)){
            setData({
                ...data,
                categoriasDisponibles: data.categoriasDisponibles.filter(categoria => categoria !== e.target.value)
            })
        }else{
            setData({
                ...data,
                categoriasDisponibles: [...data.categoriasDisponibles, e.target.value]
            })
        }
    }


    return (
        <>
            <Card>
                <div className="mb-2 p-4">
                    <Typography variant="h5" className="text-title font-title">
                        Elegir Categorías Disponibles
                    </Typography>
                </div>
                <List>
                    {categorias.map((categoria, i) => 
                        <ListItem key={i} className="p-0">
                            <label
                                htmlFor={categoria._id}
                                className="flex w-full cursor-pointer items-center px-3 py-2"
                            >
                                <ListItemPrefix className="mr-3">
                                    <Checkbox
                                        id={categoria._id}
                                        ripple={false}
                                        className="hover:before:opacity-0"
                                        value={categoria._id}
                                        onChange={handleChange}
                                        checked={data.categoriasDisponibles.includes(categoria._id)}
                                        containerProps={{
                                        className: "p-0",
                                        }} 
                                    />
                                </ListItemPrefix>
                                <Typography className=" text-title font-title">
                                    {categoria.nombre}
                                </Typography>
                            </label>
                        </ListItem>
                    )}
                </List>
            </Card>
            {/* If user doesn't add categorias, show error */}
            {formErrors.some(error => error.path === 'categoriasDisponibles') &&
                <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal mt-2">
                    <InformationCircleIcon className="w-4 h-4 -mt-px" />
                    Por favor, seleccione las categorias disponibles del torneo
                </Typography>
            }
        </>
    )
}

export default CategoriasDisponiblesLogic