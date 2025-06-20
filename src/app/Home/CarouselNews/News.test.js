import '@testing-library/jest-dom/extend-expect'
import News from './News'
import { cleanup, render, screen} from '@testing-library/react'

describe('<News />', () => {
    let news

    const newsMocked = {
        tag: 'Últimas Noticias',
        title: 'Borem ipsum dolor sit amet, consectetur adipiscing elit.',
        subtitle: 'Morem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class',
        imgHref: '/test/test.jpg',
        href: '/noticias/titulo/test',
        category: 'Torneos'
    }

    beforeEach(() => {
        news = render(<News news={newsMocked}/>)
        
    })

    afterEach(() => {
        cleanup()
    })


    test('renders content', () => {
        expect(news.container).toMatchSnapshot()

        //Renders title and subtitle
        const title = screen.getByText(newsMocked.title)
        expect(title).toBeInTheDocument()
        const subtitle = screen.getByText(newsMocked.subtitle)
        expect(subtitle).toBeInTheDocument()

        // Renders img
        const img = screen.getByAltText(`Imagen de noticia con título ${newsMocked.title}`)
        expect(img).toBeInTheDocument()
    })

    test('redirection to news article', async() => {
        expect(news.container).toMatchSnapshot()

        //Get news href
        const linkElement = screen.getByRole('link')
        expect(linkElement.getAttribute('href')).toBe(newsMocked.href)
        
    })
})