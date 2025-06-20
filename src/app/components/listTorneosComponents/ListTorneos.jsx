import { Card, Typography } from "@/app/utils/materialTailwind";
import Paginador from "../Paginador";
import ListTorneoRow from "./ListTorneosRow";
import ListInscripcionRow from "./ListInscripcionRow";

const ListTorneos = ({
  tableHead,
  data,
  pagina,
  setPagina,
  division,
  urlBtn,
  placeholder,
  showList,
}) => {
  return (
    <Card className="h-full w-full md:w-3/4">
      <table className="w-full table-auto text-left">
        <thead>
          <tr>
            {tableHead.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-2 md:p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="max-w-full">
          {data.torneos &&
            data.torneos.map((torneo) => (
              <ListTorneoRow
                torneo={torneo}
                key={torneo._id}
                urlBtn={`${urlBtn}/${torneo._id}`}
                placeholder={placeholder}
                showList={showList}
              />
            ))}
          {data.inscripcionesPorAtleta &&
            data.inscripcionesPorAtleta.map((inscripcion) => (
              <ListInscripcionRow
                inscripcion={inscripcion}
                key={inscripcion._id}
              />
            ))}
        </tbody>
      </table>
      {data.total > 0 && pagina && (
        <Paginador
          pagina={pagina}
          setPagina={setPagina}
          total={data.total}
          division={division}
        />
      )}
    </Card>
  );
};

export default ListTorneos;
