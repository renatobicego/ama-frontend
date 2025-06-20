import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Inscripciones from './page'

test('renders content', () => {
    const inscripciones = render(<Inscripciones />)

    expect(inscripciones).toMatchSnapshot()

    //Renders both divs to each inscripciones pages
    const federacion = screen.getByText('Federación Anual AMA')
    expect(federacion).toBeInTheDocument()
    const torneos = screen.getByText('Inscripción a Torneos')
    expect(torneos).toBeInTheDocument()

    //Both divs have href to page
    const links = screen.getAllByRole('link')
    expect(links[0].getAttribute('href')).toBe('/inscripciones/federaciones')
    expect(links[1].getAttribute('href')).toBe('/inscripciones/torneos')

    //Both images rendered
    const imgs = screen.getAllByAltText('Inscripciones')
    expect(imgs.length).toBe(2)
})