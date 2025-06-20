

function sliceIntoChunks(arr, chunkSize) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
  }
  return res;
}

export {sliceIntoChunks}


const monthsAbbreviated = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sept', 'Oct', 'Nov', 'Dic']
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

const setFormatoMarca = (prueba) => {
  switch (prueba.tipo) {
    case 'L':
        return '##.##'
    case 'F':
        return '##.##.##'
    case 'P':
        return '##.##'
    case 'S':
        return '#.##'
    case 'C':
        return '####'
    case 'T':
        return '##.##'
  }
}


export {monthsAbbreviated, months, setFormatoMarca}