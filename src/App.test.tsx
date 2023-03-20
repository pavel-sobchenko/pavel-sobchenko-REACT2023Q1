import {render, screen} from "@testing-library/react";
import App from './App';
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe('App', () => {
    it('full App rendering', () => {
        render(<App/>, {wrapper: BrowserRouter});
        expect(screen.getByText(/Cocktail Search/i)).toBeInTheDocument();
    })

    it('about us navigation', async () => {
        render(<App/>, {wrapper: BrowserRouter});
        const user = userEvent.setup();
        await user.click(screen.getByText(/about/i))
        expect(screen.getByText(/About Page/i)).toBeInTheDocument();
    })

    test('landing on a bad page', () => {
        const badRoute = '/some/bad/route'

        render(
            <MemoryRouter initialEntries={[badRoute]}>
                <App />
            </MemoryRouter>,
        )
        expect(screen.getByText(/Not Found/i)).toBeInTheDocument()
    })
})
