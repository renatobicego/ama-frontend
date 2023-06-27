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

const Federacion = ({data, handleChange, errorInput}) => {

    return (
        <>
            <div className="flex w-full justify-between flex-wrap md:flex-nowrap gap-6">
                <Select 
                    aria-labelledby="club"
                    tabIndex={7}
                    onChange={(value) => handleChange('club', value)} 
                    defaultValue={data.club} 
                    error={errorInput === 'club' ? true : false}
                    color="gray" 
                    label="Club*"
                    labelProps={{id: 'club'}}
                    >

                    {clubes.map((club, i) => 
                        <Option key={i} value={club.value}>
                            {club.name}
                        </Option>
                        )}

                </Select>

                <Select 
                    tabIndex={8}
                    onChange={(value) => handleChange('federacion', value)} 
                    defaultValue={data.federacion} 
                    error={errorInput === 'federacion' ? true : false}
                    color="gray" 
                    label="Federación*"
                    labelProps={{id: 'federacion'}}
                    aria-labelledby="federacion"
                    >

                    {federaciones.map((fed, i) => 
                        <Option key={i} value={fed.value}>
                            {fed.name}
                        </Option>
                    )}
                </Select>

            </div>

            <div className="flex w-full justify-between flex-wrap md:flex-nowrap gap-6">

                <Select 
                    tabIndex={9}
                    onChange={(value) => handleChange('asociacion', value)} 
                    defaultValue={data.asociacion} 
                    error={errorInput === 'asociacion' ? true : false}
                    color="gray" 
                    label="Asociación*"
                    labelProps={{id: 'asociacion'}}
                    aria-labelledby="asociacion"
                    >

                    {asociaciones.map((asoc, i) => 
                        <Option key={i} value={asoc.value}>
                            {asoc.name}
                        </Option>
                        )}

                </Select>

                <Input 
                    tabIndex={10}
                    onChange={(e) => handleChange('pais', e.target.value)}  
                    defaultValue={data.pais} 
                    error={errorInput === 'pais' ? true : false}
                    color="gray" 
                    label="Pais*" 
                    labelProps={{id: 'pais'}}
                    aria-labelledby="pais"
                    />
            </div>
        </> 
    )
}

export default Federacion