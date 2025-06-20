import { cleanup, render, screen } from "@testing-library/react"
import InscripcionesSection from "./InscripcionesSection"
import '@testing-library/jest-dom/extend-expect'

describe('<InscripcionesSection />', () => {

    let inscripciones

    beforeEach(() => {
        inscripciones = render(<InscripcionesSection />)
        
    })

    afterEach(() => {
        cleanup()
    })

    test('renders content', () => {
        expect(inscripciones.container).toMatchSnapshot()

        // Render title
        const title = screen.getByText('Inscripciones Online')
        expect(title).toBeInTheDocument()

        // Render icons
        const icons = screen.getAllByAltText(`Icono de inscripciones`)
        expect(icons.length).toBe(2)

        // Render arrow visit section icon
        const arrowIcon = screen.getAllByAltText(`Icono para ir a sección de inscripciones`)
        expect(arrowIcon.length).toBe(2)

    })
})
