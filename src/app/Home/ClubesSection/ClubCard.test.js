import { cleanup, render, screen } from "@testing-library/react"
import ClubCard from "./ClubCard"
import '@testing-library/jest-dom/extend-expect'

describe('<ClubCard />', () => {

    let clubCard

    const mockClub = {
        name: "Test Club",
        imgHref: "/test/test.jpg",
        href: "/clubes/testclub/id"
    }

    beforeEach(() => {
        clubCard = render(<ClubCard club={mockClub}/>)
        
    })

    afterEach(() => {
        cleanup()
    })

    test('renders content', () => {
        expect(clubCard.container).toMatchSnapshot()

        // Render name
        const name = screen.getByText(mockClub.name)
        expect(name).toBeInTheDocument()

        // Render logo
        const logoClub = screen.getByAltText(`Logo de club ${mockClub.name}`)
        expect(logoClub).toBeInTheDocument()

        // Href is set in link component
        const linkElement = screen.getByRole('link')
        expect(linkElement.getAttribute('href')).toBe(mockClub.href)

    })
})