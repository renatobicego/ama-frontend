import { Input, Option, Select } from "@/app/utils/materialTailwind"

const PruebaInput = ({pruebas, pruebaAgregada, setPruebasSelected}) => {


    const handleSelect = (value) => {
        setPruebasSelected(prevState => prevState.map(p => {
            if(p.id === pruebaAgregada.id){
                return {
                    ...p,
                    prueba: value
                }
            }else{
                return p
            }
        }))
    }

    const handleInputMarca = (event) => {
        setPruebasSelected(prevState => prevState.map(p => {
            if(p.id === pruebaAgregada.id){
                return {
                    ...p,
                    marca: event.target.value
                }
            }else{
                return p
            }
        }))
    }

    return (
        <div className="flex w-full justify-between gap-6">
            <Select value={pruebaAgregada.value} onChange={handleSelect} color="gray" label="Seleccionar Prueba*">
                {pruebas.map((p, i) => 
                    <Option key={i} value={p.value}>{p.name}</Option>
                )}
            </Select>
            <Input value={pruebaAgregada.marca} onChange={handleInputMarca} color="gray" label="Mejor Marca de Prueba*" />
            
        </div>
    )
}

export default PruebaInput