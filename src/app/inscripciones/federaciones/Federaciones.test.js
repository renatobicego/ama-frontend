import '@testing-library/jest-dom/extend-expect'
import { cleanup, render, screen } from '@testing-library/react'
import Federaciones from './page'
import { useRouter } from 'next/navigation'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('<Federaciones />', () => {

    let federaciones 
    let useRouterMock

    beforeEach(() => {
        
        // Mock useRouter, the Next.js router won't be available by default
        useRouterMock = jest.spyOn(require('next/navigation'), 'useRouter')
        useRouterMock.mockImplementation(() => ({
        back: jest.fn(),
        }))

        federaciones = render(<Federaciones />)
    })

    afterEach(() => {
        cleanup()
    })

    test('renders content', () => {
        expect(federaciones.container).toMatchSnapshot()

        // Renders Federación club link
        const club = screen.getByText('Federación Club')
        expect(club).toBeInTheDocument()

        // Renders Federación atleta link
        const atleta = screen.getByText('Federación Atleta')
        expect(atleta).toBeInTheDocument()

        //Renders imgs
        const clubImg = screen.getByAltText('Federacion Club')
        expect(clubImg).toBeInTheDocument()

        const federacionImg = screen.getByAltText('Federacion atleta')
        expect(federacionImg).toBeInTheDocument()
    })
})