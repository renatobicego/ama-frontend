
import { Option, Select } from "@/app/utils/materialTailwind";

const categorias = [
    {
        name: 'U12',
        value: 'u12'
    },
    {
        name: 'U14',
        value: 'u14'
    },
    {
        name: 'U16',
        value: 'u16'
    },
    {
        name: 'U18',
        value: 'u18'
    },
    {
        name: 'U20',
        value: 'u20'
    },
    {
        name: 'U23',
        value: 'u23'
    },
    {
        name: 'Mayores',
        value: 'mayores'
    },
    {
        name: 'Master',
        value: 'master'
    },

]

const torneos = [
    {
        name: 'Torneo 1',
        value: 'torneo1'
    },
    {
        name: 'Torneo 2',
        value: 'torneo2'
    },
    {
        name: 'Torneo 3',
        value: 'torneo3'
    },

]

const CategoriaTorneo = ({data, handleChange, errorInput}) => {
    return (
        <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">
            <Select 
                value={data.torneo}
                tabIndex={1}
                color="gray" 
                label="Torneo a Inscribirse*"
                error={errorInput === 'torneo' ? true : false}
                onChange={(value) => handleChange('torneo', value)} 
                >
                {torneos.map((torneo, i) => 
                            <Option key={i} value={torneo.value}>
                                {torneo.name}
                            </Option>
                            )}
            </Select>
            <Select 
                name="categoria" 
                tabIndex={2}
                color="gray" 
                label="Categoría*"
                error={errorInput === 'categoria' ? true : false}
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