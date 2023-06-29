import '@testing-library/jest-dom/extend-expect'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import FormFederacionAtleta from './FormFederacionAtleta'

describe('<FormFederacionAtleta />', () => {

    let formFederacionAtleta 

    beforeEach(() => {
        formFederacionAtleta = render(<FormFederacionAtleta />)
    })

    afterEach(() => {
        cleanup()
    })

    test('renders content', () => {
        expect(formFederacionAtleta.container).toMatchSnapshot()

        // Renders nombre input
        const nombreInput = screen.getByLabelText('Nombre y Apellido*')
        expect(nombreInput).toBeInTheDocument()

        // Renders club input
        const clubInput = screen.getByLabelText('Club*')
        expect(clubInput).toBeInTheDocument()

        // Renders email input
        const emailInput = screen.getByLabelText('Email*')
        expect(emailInput).toBeInTheDocument()

        // Renders dni input
        const dniInput = screen.getByLabelText('DNI*')
        expect(dniInput).toBeInTheDocument()

        // Renders fecha nacimiento input
        const fechaInput = screen.getByLabelText('Fecha de Nacimiento*')
        expect(fechaInput).toBeInTheDocument()

        // Renders telefono input
        const telInput = screen.getByLabelText('Teléfono*')
        expect(telInput).toBeInTheDocument()

        // Renders contraseña input
        const passwordInput = screen.getByLabelText('Contraseña*')
        expect(passwordInput).toBeInTheDocument()

        // Renders repetir contraseña input
        const passwordRepInput = screen.getByLabelText('Repetir Contraseña*')
        expect(passwordRepInput).toBeInTheDocument()

        // Renders submit button
        const submit = screen.getByText('Inscribirse')
        expect(submit).toBeInTheDocument()

    })

    test('change nombre club', () => {
        // Get nombre input
        const nombreInput = screen.getByLabelText('Nombre y Apellido*')

        // Change input
        fireEvent.change(nombreInput, { target: { value: 'test' } })
        
        expect(nombreInput.value).toBe('test')
        
    })   

    test('change club select', () => {
        // Get club select
        const clubInput = screen.getByLabelText('Club*')

        // Change input
        fireEvent.change(clubInput, { target: { value: 'test' } })
        
        expect(clubInput.value).toBe('test')
        
    }) 

    test('change telefono input', () => {
        // Get tel input
        const telInput = screen.getByLabelText('Teléfono*')

        // Change input
        fireEvent.change(telInput, { target: { value: '12345678' } })
        
        expect(telInput.value).toBe('12345678')
        
    }) 

    test('change fecha nacimiento input', () => {
        // Get fecha nacimiento input
        const fechaInput = screen.getByLabelText('Fecha de Nacimiento*')

        // Change input
        fireEvent.change(fechaInput, { target: { value: '2002-03-04' } })
        
        expect(fechaInput.value).toBe('2002-03-04')
        
    }) 

    test('change dni input', () => {
        // Get dni input
        const dniInput = screen.getByLabelText('DNI*')

        // Change input
        fireEvent.change(dniInput, { target: { value: '44122734' } })
        
        expect(dniInput.value).toBe('44122734')
        
    }) 

    test('change input email', () => {
        // Get email input
        const emailInput = screen.getByLabelText('Email*')

        // Change input
        fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
        
        expect(emailInput.value).toBe('test@test.com')
        
    })  

    test('change input contraseña', () => {
        // Get contraseña input
        const passwordInput = screen.getByLabelText('Contraseña*')

        // Change input
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } })
        
        expect(passwordInput.value).toBe('testpassword')
        
    })  

    test('change input repetir contraseña', () => {
        // Get repetir contraseña input
        const passwordRepInput = screen.getByLabelText('Repetir Contraseña*')

        // Change input
        fireEvent.change(passwordRepInput, { target: { value: 'testpassword' } })
        
        expect(passwordRepInput.value).toBe('testpassword')
        
    })  

})