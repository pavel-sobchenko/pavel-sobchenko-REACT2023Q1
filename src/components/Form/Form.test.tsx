import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import FormComponent from './Form';
import { store } from '../../store';

describe('Form ', () => {
  it('should display form', async () => {
    render(
      <Provider store={store}>
        <FormComponent />
      </Provider>
    );
    const title = await screen.getByText('Add your own cocktail recipe');
    expect(title).toBeInTheDocument();
  });

  it('it should add ingredient', async () => {
    const { container } = render(
      <Provider store={store}>
        <FormComponent />
      </Provider>
    );
    const ingr = container.getElementsByClassName(
      'product'
    )[0] as HTMLInputElement;
    await fireEvent.input(ingr, { target: { value: 'aaa' } });

    const volume = container.getElementsByClassName(
      'volume'
    )[0] as HTMLInputElement;
    await fireEvent.input(volume, { target: { value: 'bbb' } });

    const addBtn = screen.getByText('Add');
    fireEvent.click(addBtn);
    expect(store.getState().form.ingredients).toHaveLength(1);
  });

  it('should create a new card', async () => {
    const { container } = render(
      <Provider store={store}>
        <FormComponent />
      </Provider>
    );

    const form = container.getElementsByClassName(
      'form'
    )[0] as HTMLInputElement;

    const name = container.getElementsByClassName(
      'name'
    )[0] as HTMLInputElement;
    await fireEvent.input(name, { target: { value: 'aaaa' } });

    const instructions = container.getElementsByClassName(
      'instr'
    )[0] as HTMLInputElement;
    await fireEvent.input(instructions, { target: { value: 'bbbccc' } });

    fireEvent.submit(form);

    expect(store.getState().form.name).toBe('aaaa');
  });
});
