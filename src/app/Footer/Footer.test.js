import { render, screen } from "@testing-library/react"
import Footer from "./Footer"
import '@testing-library/jest-dom/extend-expect'


describe('<Footer />', () => {

    let footer

    beforeEach(() => {
        footer = render(<Footer />)
    })

    test('renders content', () => {
        expect(footer.container).toMatchSnapshot();
        
        expect(footer.container).toHaveTextContent('Email')
        expect(footer.container).toHaveTextContent('Noticias')

        const logo = screen.getByAltText('Logo AMA')
        expect(logo).toBeInTheDocument()

        expect(footer.container).toMatchSnapshot();
        
    })
    
})