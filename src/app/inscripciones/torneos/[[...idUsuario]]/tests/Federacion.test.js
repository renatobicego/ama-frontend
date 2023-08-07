import '@testing-library/jest-dom/extend-expect'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import Federacion from '../components/Federacion'

describe('<Federacion />', () => {

    let federacion 
    let data
    let handleChange

    beforeEach(() => {
        handleChange = jest.fn()
        data = {
            club: '',
            federacion: '',
            asociacion: '',
            pais: ''
        }
        federacion = render(<Federacion data={data} errorInput={''} handleChange={handleChange}/>)
    })

    afterEach(() => {
        cleanup()
    })

    test('renders content', () => {
        expect(federacion.container).toMatchSnapshot()

        // Renders club input
        const clubInput = screen.getByLabelText('Club*')
        expect(clubInput).toBeInTheDocument()

        // Renders federacion input
        const federacionInput = screen.getByLabelText('Federación*')
        expect(federacionInput).toBeInTheDocument()

        // Renders asoc input
        const asocInput = screen.getByLabelText('Asociación*')
        expect(asocInput).toBeInTheDocument()

        // Renders pais input
        const paisInput = screen.getByLabelText('Pais*')
        expect(paisInput).toBeInTheDocument()

    })

    test('change input pais', () => {
        // Get pais input
        const paisInput = screen.getByLabelText('Pais*')

        // Change input
        fireEvent.change(paisInput, { target: { value: 'test' } })
        
        expect(handleChange).toHaveBeenCalledWith('pais', 'test')
        
    })   

    test('change input club', () => {
        // Get club input
        const clubInput = screen.getByLabelText('Club*')

        // Change input
        fireEvent.change(clubInput, { target: { value: 'clubTest' } })
        
        expect(clubInput.value).toBe('clubTest')
        
    })  

    test('change input federacion', () => {
        // Get federacion input
        const federacionInput = screen.getByLabelText('Federación*')

        // Change input
        fireEvent.change(federacionInput, { target: { value: 'federacionTest' } })
        
        expect(federacionInput.value).toBe('federacionTest')
        
    })  

    test('change input asociacion', () => {
        // Get asociacion input
        const asocInput = screen.getByLabelText('Asociación*')

        // Change input
        fireEvent.change(asocInput, { target: { value: 'asocTest' } })
        
        expect(asocInput.value).toBe('asocTest')
        
    })  
})