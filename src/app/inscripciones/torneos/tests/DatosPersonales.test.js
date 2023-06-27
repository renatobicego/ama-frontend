import '@testing-library/jest-dom/extend-expect'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import DatosPersonales from '../components/DatosPersonales'

describe('<DatosPersonales />', () => {

    let datosPersonales 
    let data
    let handleChange

    beforeEach(() => {
        handleChange = jest.fn()
        data = {
            nombre_apellido: '',
            sexo: '',
            dni: '',
            fecha_nacimiento: ''
        }
        datosPersonales = render(<DatosPersonales data={data} errorInput={''} handleChange={handleChange}/>)
    })

    afterEach(() => {
        cleanup()
    })

    test('renders content', () => {
        expect(datosPersonales.container).toMatchSnapshot()

        // Renders nombre input
        const nombreInput = screen.getByLabelText('Nombre y Apellido*')
        expect(nombreInput).toBeInTheDocument()

        // Renders sexo input
        const sexoInput = screen.getByLabelText('Sexo*')
        expect(sexoInput).toBeInTheDocument()

        // Renders dni input
        const dniInput = screen.getByLabelText('DNI*')
        expect(dniInput).toBeInTheDocument()

        // Renders fecha nacimiento input
        const fechaInput = screen.getByLabelText('Fecha de Nacimiento*')
        expect(fechaInput).toBeInTheDocument()

    })

    test('change input nombre', () => {
        // Get nombre input
        const nombreInput = screen.getByLabelText('Nombre y Apellido*')

        // Change input
        fireEvent.change(nombreInput, { target: { value: 'test' } })
        
        expect(handleChange).toHaveBeenCalledWith('nombre_apellido', 'test')
        
    })   

    test('change input sexo', () => {
        // Get sexo input
        const sexoInput = screen.getByLabelText('Sexo*')

        // Change input
        fireEvent.change(sexoInput, { target: { value: 'f' } })
        
        expect(sexoInput.value).toBe('f')
        
    })  

    test('change input dni', () => {
        // Get dni input
        const dniInput = screen.getByLabelText('DNI*')

        // Change input
        fireEvent.change(dniInput, { target: { value: '44122734' } })
        
        expect(handleChange).toHaveBeenCalledWith('dni', '44122734')
        
    })  

    test('change input fecha nacimiento', () => {
        // Get fecha nacimiento input
        const fechaInput = screen.getByLabelText('Fecha de Nacimiento*')

        // Change input
        fireEvent.change(fechaInput, { target: { value: '2022-10-10' } })
        
        expect(handleChange).toHaveBeenCalledWith('fecha_nacimiento', '2022-10-10')
        
    })  

})