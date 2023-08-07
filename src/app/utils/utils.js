

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
          return '00.00'
      case 'F':
          return '99.99.99'
      case 'P':
          return '99.99'
      case 'S':
          return '00.00'
  }
}


export {monthsAbbreviated, months, setFormatoMarca}