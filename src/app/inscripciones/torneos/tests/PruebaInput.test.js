import '@testing-library/jest-dom/extend-expect'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import PruebaInput from '../components/PruebaInput'

describe('<PruebaInput />', () => {

    let pruebaAgregada
    let pruebaInput
    let setPruebasSelected

    beforeEach(() => {
        pruebaAgregada = {
            id: '',
            prueba: '',
            marca: ''
        }
        setPruebasSelected = jest.fn()
        pruebaInput = render(
            <PruebaInput 
                pruebas={[]} 
                setPruebasSelected={setPruebasSelected}
                pruebaAgregada={pruebaAgregada}
            />)
    })

    afterEach(() => {
        cleanup()
    })


    test('renders content', () => {
        expect(pruebaInput.container).toMatchSnapshot()

        // Renders select prueba
        const selectPrueba = screen.getByLabelText('Seleccionar Prueba*')
        expect(selectPrueba).toBeInTheDocument()

        // Renders input maca
        const marcaPrueba = screen.getByLabelText('Mejor Marca de Prueba*')
        expect(marcaPrueba).toBeInTheDocument()

        // Renders delete Prueba button
        const deleteButton = screen.getByRole('button', { name: 'delete prueba' });
        expect(deleteButton).toBeInTheDocument()
    })

    test('setPruebasSelected is called when delete button is clicked', () => {

        const deleteButton = screen.getByRole('button', { name: 'delete prueba' });

        fireEvent.click(deleteButton)

        expect(setPruebasSelected).toHaveBeenCalledTimes(1)

    })

    test('change input marca', () => {
        // Get marca input
        const marcaPrueba = screen.getByLabelText('Mejor Marca de Prueba*')

        // Change input
        fireEvent.change(marcaPrueba, { target: { value: 'marca test' } })
        
        expect(setPruebasSelected).toHaveBeenCalledTimes(1)
        
    })  

    test('change select prueba', () => {
        // Get pais input
        const selectPrueba = screen.getByLabelText('Seleccionar Prueba*')

        // Change input
        fireEvent.change(selectPrueba, { target: { value: 'jabalina' } })
        
        expect(selectPrueba.value).toBe('jabalina')
        
    })  

    
})