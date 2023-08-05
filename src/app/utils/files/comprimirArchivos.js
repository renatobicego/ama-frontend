import Compressor from "compressorjs"


const comprimirArchivos = async(file) => {
    new Compressor(file, {
        quality: 0.7,
        success(result) {
            return result
        }
    })
}

export default comprimirArchivos