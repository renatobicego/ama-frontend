import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import NewsletterForm from "./NewsletterForm"
import '@testing-library/jest-dom/extend-expect'

describe('<NewsletterForm />', () => {

    let form 

    // Mocked socialMedia
    const socialMedia = [
        { href: '', logo: '/test/test.jpg'},
    ]

    // Mock console.log
    const logMock = jest.fn()

    // Replace console.log with logMock
    beforeAll(() => {
        global.console.log = logMock;
    })

    // Restore console.log
    afterAll(() => {
        global.console.log = console._log;
    })

    // Render component
    beforeEach(() => {
        form = render(<NewsletterForm socialMedia={socialMedia}/>)
    })

    afterEach(() => {
        cleanup()
    })

    test('render content', () => {
        expect(form.container).toMatchSnapshot()

        // Is email input field rendered
        const emailInput = screen.getByPlaceholderText('Ingrese su Mail*')
        expect(emailInput).toBeInTheDocument()

        // Is submitButton rendered
        const submitButton = screen.getByText('Suscribirse')
        expect(submitButton).toBeInTheDocument()

    })

    test('form correct value validation', () => {
        expect(form.container).toMatchSnapshot()

        // Find the email input field
        const emailInput = screen.getByPlaceholderText('Ingrese su Mail*')

        // Simulate user input
        fireEvent.change(emailInput, { target: { value: 'mail@mail.com' } })

        // Find the submit button
        const submitButton = screen.getByText('Suscribirse')

        // Simulate form submission
        fireEvent.click(submitButton)

        // Verify that the console.log was called with the expected value
        expect(logMock).toHaveBeenCalledWith(true)
    })

    test('form incorrect value validation', () => {
        expect(form.container).toMatchSnapshot()

        // Find the email input field
        const emailInput = screen.getByPlaceholderText('Ingrese su Mail*')

        // Simulate user input
        fireEvent.change(emailInput, { target: { value: 'invalid_email' } })

        // Find the submit button
        const submitButton = screen.getByText('Suscribirse')

        // Simulate form submission
        fireEvent.click(submitButton)

        // Verify that the console.log was called with the expected value
        expect(logMock).toHaveBeenCalledWith(false)
    })
})