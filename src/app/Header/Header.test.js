import { render, prettyDOM, cleanup, screen, fireEvent, waitFor } from "@testing-library/react"
import {createMemoryHistory} from 'history'
import Header from "./Header"
import '@testing-library/jest-dom/extend-expect'


describe('<Header />', () => {

    let header 

    afterEach(() => {
        cleanup(); // Resets the DOM after each test suite
    })

    beforeEach(() => {
        header = render(<Header />)
    })

    test('renders content', () => {
        
        expect(header.container).toHaveTextContent('Email')
        expect(header.container).toHaveTextContent('Inicio')
        expect(header.container).toHaveTextContent('Inscripciones')

        const logo = screen.getByAltText('Logo AMA')
        expect(logo).toBeInTheDocument()
        
    })

    test('matches snapshot', () => {
        expect(header.container).toMatchSnapshot();
    })
    
    test('renders homepage unchanged', async () => {

        expect(header.container).toHaveTextContent('Torneos')

        const linkTorneos = screen.getAllByText('Torneos')[0]


        await waitFor(() => {
            fireEvent.click(linkTorneos)
        })
        console.log(window.location.pathname)

    })
})