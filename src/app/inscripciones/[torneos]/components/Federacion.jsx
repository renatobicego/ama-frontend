import { Input, Option, Select} from "@/app/utils/materialTailwind";

const clubes = [
    {
        name: 'Club 1',
        value: 'club1'
    },
    {
        name: 'Club 2',
        value: 'club2'
    },

]

const federaciones = [
    {
        name: 'Mendoza',
        value: 'mza'
    },
    {
        name: 'San Luis',
        value: 'sl'
    },
    {
        name: 'San Juan',
        value: 'sj'
    },
]

const asociaciones = [
    {
        name: 'Mendoza',
        value: 'mza'
    },
    {
        name: 'San Luis',
        value: 'sl'
    },
    {
        name: 'San Juan',
        value: 'sj'
    },
]

const Federacion = ({data, handleChange}) => {

    return (
        <>
            <div className="flex w-full justify-between gap-6">
                <Select 
                    onChange={(value) => handleChange('club', value)} 
                    defaultValue={data.club} 
                    color="gray" 
                    label="Club*">

                    {clubes.map((club, i) => 
                        <Option key={i} value={club.value}>
                            {club.name}
                        </Option>
                        )}

                </Select>

                <Select 
                    onChange={(value) => handleChange('federacion', value)} 
                    defaultValue={data.federacion} 
                    color="gray" 
                    label="Federación*">

                    {federaciones.map((fed, i) => 
                        <Option key={i} value={fed.value}>
                            {fed.name}
                        </Option>
                    )}
                </Select>

            </div>

            <div className="flex w-full justify-between gap-6">

                <Select 
                    onChange={(value) => handleChange('asociacion', value)} 
                    defaultValue={data.asociacion} 
                    color="gray" 
                    label="Asociación*">

                    {asociaciones.map((asoc, i) => 
                        <Option key={i} value={asoc.value}>
                            {asoc.name}
                        </Option>
                        )}

                </Select>

                <Input 
                    onChange={(e) => handleChange('pais', e.target.value)}  
                    defaultValue={data.pais} 
                    color="gray" 
                    label="Pais*" />
            </div>
        </> 
    )
}

export default Federacion