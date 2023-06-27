import '@testing-library/jest-dom/extend-expect'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import PruebasLogic from '../components/PruebasLogic'

describe('<PruebasLocic />', () => {

    let pruebasSelected
    let pruebasLogic
    let setPruebasSelected

    beforeEach(() => {
        pruebasSelected = []
        setPruebasSelected = jest.fn()
        pruebasLogic = render(
            <PruebasLogic 
                pruebasSelected={pruebasSelected} 
                setPruebasSelected={setPruebasSelected}
                errorInput={''}
            />)
    })

    afterEach(() => {
        cleanup()
    })


    test('renders content', () => {
        expect(pruebasLogic.container).toMatchSnapshot()

        // Renders Agregar Prueba button
        const addButton = screen.getByRole('button', { name: 'Agregar Prueba' });
        expect(addButton).toBeInTheDocument()
    })

    test('setPruebasSelected is called when "Agregar Prueba" button is clicked', () => {

        const addButton = screen.getByRole('button', { name: 'Agregar Prueba' });

        fireEvent.click(addButton)

        expect(setPruebasSelected).toHaveBeenCalledTimes(1)

    })
})