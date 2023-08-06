import LoadingError from "@/app/components/LoadingError"
import useFetch from "@/app/utils/hooks/useFetch"
import { Card, Checkbox, List, ListItem, ListItemPrefix, Typography } from "@/app/utils/materialTailwind"

const EntrenadoresList = ({data, setData}) => {
    const {data: usuarios, loading, error} = useFetch('usuarios/club/' + data.id)

    if(loading || error) return <LoadingError loading={loading} error={error} />

    const handleChange = (e) => {
        if(data.entrenadores.includes(e.target.value)){
            setData({
                ...data,
                entrenadores: data.entrenadores.filter(entrenador => entrenador !== e.target.value)
            })
        }else{
            setData({
                ...data,
                entrenadores: [...data.entrenadores, e.target.value]
            })
        }
    }


    return (
        <Card>
            <div className="mb-2 p-4">
                <Typography variant="h5" className="text-title font-title">
                    Elegir Entrenadores
                </Typography>
            </div>
            <List>
                {usuarios.usuarios.map((usuario, i) => 
                    <ListItem key={i} className="p-0">
                        <label
                            htmlFor={usuario._id}
                            className="flex w-full cursor-pointer items-center px-3 py-2"
                        >
                            <ListItemPrefix className="mr-3">
                                <Checkbox
                                    id={usuario._id}
                                    ripple={false}
                                    className="hover:before:opacity-0"
                                    value={usuario._id}
                                    onChange={handleChange}
                                    checked={data.entrenadores.includes(usuario._id)}
                                    containerProps={{
                                    className: "p-0",
                                    }} 
                                />
                            </ListItemPrefix>
                            <Typography className=" text-title font-title">
                                {usuario.nombre_apellido}
                            </Typography>
                        </label>
                    </ListItem>
                )}
            </List>
        </Card>
    )
}

export default EntrenadoresList