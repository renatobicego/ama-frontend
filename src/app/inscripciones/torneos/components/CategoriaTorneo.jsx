
import isError from "@/app/utils/formValidation/isErrorInput";
import { Option, Select } from "@/app/utils/materialTailwind";

const torneos = []
const categorias = []

const CategoriaTorneo = ({data, handleChange, formErrors}) => {
    return (
        <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">
            <Select 
                value={data.torneo}
                aria-labelledby="torneo"
                tabIndex={1}
                color="gray" 
                label="Torneo a Inscribirse*"
                labelProps={{id: 'torneo'}}
                error={isError('torneo', formErrors)}
                onChange={(value) => handleChange('torneo', value)} 
                >
                {torneos.map((torneo, i) => 
                            <Option key={i} value={torneo.value}>
                                {torneo.name}
                            </Option>
                            )}
            </Select>
            <Select 
                tabIndex={2}
                aria-labelledby="categoria"
                labelProps={{id: 'categoria'}}
                color="gray" 
                label="Categoría*"
                error={isError('categoria', formErrors)}
                value={data.categoria}
                onChange={(value) => handleChange('categoria', value)} 
                >
                {categorias.map((cat, i) => 
                                <Option key={i} value={cat.value}>
                                    {cat.name}
                                </Option>
                                )}
            </Select>
        </div>
    )
}

export default CategoriaTorneo