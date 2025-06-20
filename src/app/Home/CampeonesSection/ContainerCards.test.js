import {cleanup, prettyDOM, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import ContainerCards from "./ContainerCards"


describe('<ContainerCards />', () => {

    let containerCampeones 

    const mockedCampeones = [
        {
            name: 'Renzo Cremaschi',
            imgHref: '/test/test.jpg',
            pruebas: ['110 C/V', '200m']
        },
    ]

    // Render component
    beforeEach(() => {
        containerCampeones  = render(<ContainerCards campeones={mockedCampeones}/>)
    })

    afterEach(() => {
        cleanup()
    })

    test('renders content', () => {
        expect(containerCampeones .container).toMatchSnapshot()

        // Check img
        const img = screen.getByAltText(`Foto de ${mockedCampeones[0].name}`)
        expect(img).toBeInTheDocument()

        // String of pruebas 
        let pruebasText = mockedCampeones[0].pruebas.map(prueba => prueba + ' / ')

        // Check pruebas rendered
        const pruebas = screen.getByText(pruebasText.join('').trim())
        expect(pruebas).toBeInTheDocument()
    })
})