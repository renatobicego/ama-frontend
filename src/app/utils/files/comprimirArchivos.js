import Compressor from "compressorjs"


const comprimirArchivos = (file) => {

    return new Promise((resolve, reject) => {
        new Compressor(file, {
        quality: 0.8,
        success(result) {
            resolve(result);
        },
        error(err) {
            resolve(file);
        },
        })
    })
}

export default comprimirArchivos