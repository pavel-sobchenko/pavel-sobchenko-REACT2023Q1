import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store';

describe('App', () => {
  it('full App rendering', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      { wrapper: BrowserRouter }
    );
    expect(screen.getByText(/Cocktail Search/i)).toBeInTheDocument();
  });
  it('home navigation', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      { wrapper: BrowserRouter }
    );
    const user = userEvent.setup();
    await user.click(screen.getByText(/main page/i));
    expect(screen.getByText(/Cocktail Search/i)).toBeInTheDocument();
  });
  it('about us navigation', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      { wrapper: BrowserRouter }
    );
    const user = userEvent.setup();
    await user.click(screen.getByText(/about/i));
    expect(screen.getByText(/About Page/i)).toBeInTheDocument();
  });
  it('form navigation', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      { wrapper: BrowserRouter }
    );
    const user = userEvent.setup();
    await user.click(screen.getByText(/create your cocktail/i));
    expect(
      screen.getByText(/Add your own cocktail recipe/i)
    ).toBeInTheDocument();
  });
  test('landing on a bad page', () => {
    const badRoute = '/some/bad/route';
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Not Found/i)).toBeInTheDocument();
  });
});
