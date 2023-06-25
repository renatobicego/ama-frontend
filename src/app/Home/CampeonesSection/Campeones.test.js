import {cleanup, render, screen} from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import Campeones from "./Campeones"


describe('<Campeones />', () => {

    let campeones 

    // Render component
    beforeEach(() => {
        campeones = render(<Campeones/>)
    })

    afterEach(() => {
        cleanup()
    })

    test('renders content', () => {
        expect(campeones.container).toMatchSnapshot()

        // Check title
        const title = screen.getByText('Nuestros Campeones Nacionales')
        expect(title).toBeInTheDocument()

    })
})