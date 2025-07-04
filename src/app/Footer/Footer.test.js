import { render, screen } from "@testing-library/react"
import Footer from "./Footer"
import '@testing-library/jest-dom/extend-expect'


describe('<Footer />', () => {

    let footer

    beforeEach(() => {
        footer = render(<Footer />)
    })

    test('renders content', () => {
        expect(footer.container).toMatchSnapshot()

        // Footer renders Email and NavBar
        expect(footer.container).toHaveTextContent('Email')
        expect(footer.container).toHaveTextContent('Noticias')

        // Logo of AMA is render
        const logo = screen.getByAltText('Logo AMA')
        expect(logo).toBeInTheDocument()
        
    })
    
})