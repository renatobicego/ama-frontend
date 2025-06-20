import '@testing-library/jest-dom/extend-expect'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import CategoriaTorneo from '../components/CategoriaTorneo'

describe('<CategoriaTorneo />', () => {

    let categoriaTorneo 
    let data

    beforeEach(() => {
        data = {
            categoria: '',
            torneo: ''
        }
        categoriaTorneo = render(<CategoriaTorneo data={data} errorInput={''}/>)
    })

    afterEach(() => {
        cleanup()
    })

    test('renders content', () => {
        expect(categoriaTorneo.container).toMatchSnapshot()

        // Renders input
        const categoriaInput = screen.getByLabelText('Categoría*')
        const torneoInput = screen.getByLabelText('Torneo a Inscribirse*')
        expect(categoriaInput).toBeInTheDocument()
        expect(torneoInput).toBeInTheDocument()

    })

    test('change input categoria', () => {
        // Get select input
        const categoriaInput = screen.getByLabelText('Categoría*')

        // Change input
        fireEvent.change(categoriaInput, { target: { value: 'u14' } })

        expect(categoriaInput.value).toBe('u14')
        
    })

    test('change input torneo', () => {
        // Get select input
        const torneoInput = screen.getByLabelText('Torneo a Inscribirse*')

        // Change input
        fireEvent.change(torneoInput, { target: { value: 'torneoTest' } })
        
        expect(torneoInput.value).toBe('torneoTest')
        
    })

})