import React from 'react';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import FormComponent from './Form';

const initialState = {
  form: {
    name: '',
    instructions: '',
    image: '',
    date: '',
    alcoholic: 'alco',
    category: [],
    glass: '',
    ingredients: [],
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let store: any;

beforeEach(() => {
  const mockStore = configureStore();
  store = mockStore(initialState);
});

describe('Form ', () => {
  it('should display form', async () => {
    const foo = vi.fn();
    render(
      <Provider store={store}>
        <FormComponent cardCreate={foo} />
      </Provider>
    );
    const title = await screen.getByText('Add your own cocktail recipe');
    expect(title).toBeInTheDocument();
  });

  // it('it should upload a file', async () => {
  //   const foo = vi.fn();
  //   window.URL.createObjectURL = vi.fn();
  //   render(
  //     <Provider store={store}>
  //       <FormComponent cardCreate={foo} />
  //     </Provider>
  //   );
  //   const file = new File(['hello'], 'hello.png', { type: 'image/png' });
  //   const fileInput = screen.getByLabelText(/image/i) as HTMLInputElement;
  //   await userEvent.upload(fileInput, file);
  //   expect(fileInput?.files[0]).toBe(file);
  // });

  // it('it should add ingredient', async () => {
  //   const setState = vi.fn();
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   const useStateMock: any = (initState: any) => [initState, setState];

  //   vi.spyOn(React, 'useState').mockImplementation(useStateMock);
  //   const foo = vi.fn();
  //   const { container } = render(<FormComponent cardCreate={foo} />);
  //   const ingr = container.getElementsByClassName(
  //     'product'
  //   )[0] as HTMLInputElement;
  //   await fireEvent.input(ingr, { target: { value: 'aaa' } });

  //   const volume = container.getElementsByClassName(
  //     'volume'
  //   )[0] as HTMLInputElement;
  //   await fireEvent.input(volume, { target: { value: 'bbb' } });

  //   const addBtn = screen.getByText('Add');
  //   fireEvent.click(addBtn);

  //   expect(setState).toHaveBeenCalled();
  // });

  // it('should create a new card', async () => {
  //   const foo = vi.fn();
  //   const { container } = render(<FormComponent cardCreate={foo} />);

  //   const form = container.getElementsByClassName(
  //     'form'
  //   )[0] as HTMLInputElement;

  //   const name = container.getElementsByClassName(
  //     'name'
  //   )[0] as HTMLInputElement;
  //   await fireEvent.input(name, { target: { value: 'aaaa' } });

  //   const instructions = container.getElementsByClassName(
  //     'instr'
  //   )[0] as HTMLInputElement;
  //   await fireEvent.input(instructions, { target: { value: 'bbbccc' } });

  //   fireEvent.submit(form);

  //   expect(name.value).toBe('aaaa');
  // });
});
