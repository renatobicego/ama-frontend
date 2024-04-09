import {
  Input,
  Option,
  Select,
  Typography,
} from "@/app/utils/materialTailwind";
import { setFormatoMarca } from "@/app/utils/utils";
import { InformationCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { validate } from "uuid";
import { PatternFormat } from "react-number-format";

const PruebaInput = ({
  pruebas,
  pruebaAgregada,
  setPruebasSelected,
  editando,
}) => {
  const handleSelect = (value) => {
    const pruebaSelected = pruebas.find((p) => p._id === value);
    setPruebasSelected((prevState) =>
      prevState.map((p) => {
        // Change only pruebaAgregada input
        if (p.id === pruebaAgregada.id) {
          return {
            ...p,
            prueba: value,
            formato: setFormatoMarca(pruebaSelected),
          };
        } else {
          return p;
        }
      })
    );
  };

  const handleInputMarca = (event) => {
    setPruebasSelected((prevState) =>
      prevState.map((p) => {
        // Change only pruebaAgregada input
        if (p.id === pruebaAgregada.id) {
          return {
            ...p,
            marca: event.target.value.trim(),
          };
        } else {
          return p;
        }
      })
    );
  };

  const deletePrueba = async () => {
    setPruebasSelected((prevState) =>
      prevState.filter((p) => p.id !== pruebaAgregada.id)
    );
    if (editando && !validate(pruebaAgregada.id)) {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_URL_API}/pruebas_atleta/${pruebaAgregada.id}`
      );
    }
  };

  return (
    <div className="flex w-full justify-between gap-6 flex-wrap md:flex-nowrap relative lg:flex-col">
      {/* <Select 
                value={pruebaAgregada.prueba} 
                onChange={handleSelect} 
                color="gray" 
                label="Seleccionar Prueba*"
                aria-labelledby="prueba"
                labelProps={{id: 'prueba'}}
                >
                    
                {pruebas.map(p => 
                    <Option key={p._id} value={p._id}>{p.nombre}</Option>
                )}
            </Select> */}
      <div className="flex flex-col">
        <label>Seleccionar Prueba</label>
        <select
          onChange={(event) => handleSelect(event.target.value)}
          value={pruebaAgregada.prueba}
          placeholder="Prueba*"
          className={`border border-gray-400 py-2.5 px-2 text-sm rounded-md`}
        >
          <option key={"disabled"} hidden>
            Seleccionar Prueba
          </option>
          {pruebas.map((p) => (
            <option key={p._id} value={p._id}>
              {p.nombre}
            </option>
          ))}
        </select>
      </div>
      {pruebaAgregada.formato && (
        <div className="w-full">
          {/* <Input 
                        value={pruebaAgregada.marca ? pruebaAgregada.marca : ''} 
                        onChange={handleInputMarca} 
                        color="gray" 
                        label="Mejor Marca de Prueba*"
                        aria-labelledby="marca-prueba"
                        labelProps={{id: 'marca-prueba'}} 
                        /> */}
          <PatternFormat
            value={pruebaAgregada.marca ? pruebaAgregada.marca : ""}
            onChange={handleInputMarca} 
            format={pruebaAgregada.formato}
            className="border-2 border-gray-400"
            placeholder="Marca"
          />
          <Typography
            variant="small"
            color="gray"
            className="flex items-center gap-1 font-normal mt-2 w-full"
          >
            <InformationCircleIcon className="w-4 h-4 -mt-px" />
            El formato de la marca debe ser {pruebaAgregada.formato.replaceAll('#', '0')} . AGREGAR LOS CEROS CORRESPONDIENTES. 
            Por ejemplo, si es una prueba de
            fondo, la marca 08:18:35 serían 8 minutos, 18 segundos y 35 centésimas.
          </Typography>
        </div>
      )}

      <button
        type="button"
        aria-label="delete prueba"
        className={`absolute -right-6 top-[42%] md:-right-10 md:top-2 rounded cursor-pointer`}
        onClick={deletePrueba}
      >
        <TrashIcon
          strokeWidth={1}
          className="h-5 w-5 md:h-7 md:w-7 text-gray-700"
        />
      </button>
    </div>
  );
};

export default PruebaInput;
