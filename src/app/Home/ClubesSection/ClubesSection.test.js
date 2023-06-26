import '@testing-library/jest-dom/extend-expect'
import { cleanup, render, screen } from "@testing-library/react"
import ClubesSection from "./ClubesSection"


describe('<ClubesSection />', () => {

    let clubesSection

    beforeEach(() => {
        clubesSection = render(<ClubesSection />)
        
    })

    afterEach(() => {
        cleanup()
    })

    test('renders content', () => {
        expect(clubesSection.container).toMatchSnapshot()

        // Render title
        const title = screen.getByText('Clubes de Mendoza')
        expect(title).toBeInTheDocument()

        // Render button
        const buttonConocerMas = screen.getByText('Conocer Más')
        expect(buttonConocerMas).toBeInTheDocument()

    })
})