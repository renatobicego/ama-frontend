import '@testing-library/jest-dom/extend-expect'
import { cleanup, render, screen } from '@testing-library/react'
import ResultadosTorneoSection from './ResultadosTorneoSection'

describe('<ResultadosTorneoSection />', () => {
    
    let resultadosTorneos

    beforeEach(() => {
        resultadosTorneos = render(<ResultadosTorneoSection />)
    })

    afterEach(() => {
        cleanup()
    })
    
    test('renders content', () => {
        expect(resultadosTorneos.container).toMatchSnapshot()

        // Render title
        const title = screen.getByText('Resultados de Torneos y Calendario')
        expect(title).toBeInTheDocument()

        //Render button to visit section
        const button = screen.getByText('Consultar Torneos')
        expect(button).toBeInTheDocument()

        //Render imgs
        const imgs = screen.getAllByAltText('Imagen decorativa de torneos')
        expect(imgs.length).toBe(2)
    })
})