import { render, screen } from "@testing-library/react"
import Header from "./Header"
import '@testing-library/jest-dom/extend-expect'


describe('<Header />', () => {

    let header 

    beforeEach(() => {
        header = render(<Header />)
    })

    test('renders content', () => {
        expect(header.container).toMatchSnapshot();
        
        expect(header.container).toHaveTextContent('Email')
        expect(header.container).toHaveTextContent('Inicio')
        expect(header.container).toHaveTextContent('Inscripciones')

        const logo = screen.getByAltText('Logo AMA')
        expect(logo).toBeInTheDocument()

        expect(header.container).toMatchSnapshot();
        
    })
    
})