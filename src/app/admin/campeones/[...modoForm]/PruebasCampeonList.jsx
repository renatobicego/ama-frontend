import LoadingError from "@/app/components/LoadingError"
import useFetch from "@/app/utils/hooks/useFetch"
import { Card, Checkbox, List, ListItem, ListItemPrefix, Typography } from "@/app/utils/materialTailwind"

const PruebasCampeonList = ({data, setData}) => {
    const {data: pruebas, loading, error} = useFetch('pruebas')

    if(loading || error) return <LoadingError loading={loading} error={error} />

    const handleChange = (e) => {
        if(data.pruebasCampeon.includes(e.target.value)){
            setData({
                ...data,
                pruebasCampeon: data.pruebasCampeon.filter(prueba => prueba !== e.target.value)
            })
        }else{
            setData({
                ...data,
                pruebasCampeon: [...data.pruebasCampeon, e.target.value]
            })
        }
    }


    return (
        <Card>
            <div className="mb-2 p-4">
                <Typography variant="h5" className="text-title font-title">
                    Elegir Pruebas
                </Typography>
            </div>
            <List>
                {pruebas.pruebas.map((prueba, i) => 
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
                                    checked={data.pruebasCampeon.includes(prueba._id)}
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
    )
}

export default PruebasCampeonList