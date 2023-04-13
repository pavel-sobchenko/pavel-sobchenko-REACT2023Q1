import React from 'react';
import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormComponent from './Form';

describe('Form ', () => {
  it('should display form', () => {
    const foo = vi.fn();
    render(<FormComponent cardCreate={foo} />);
    const title = screen.getByText('Add your own cocktail recipe');
    expect(title).toBeInTheDocument();
  });

  it('it should upload a file', async () => {
    const foo = vi.fn();
    window.URL.createObjectURL = vi.fn();
    render(<FormComponent cardCreate={foo} />);
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    const fileInput = screen.getByLabelText(/image/i) as HTMLInputElement;
    await userEvent.upload(fileInput, file);
    expect(fileInput?.files[0]).toBe(file);
  });

  it('it should add ingredient', async () => {
    const setState = vi.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const useStateMock: any = (initState: any) => [initState, setState];

    vi.spyOn(React, 'useState').mockImplementation(useStateMock);
    const foo = vi.fn();
    const { container } = render(<FormComponent cardCreate={foo} />);
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

    expect(setState).toHaveBeenCalled();
  });

  it('should create a new card', async () => {
    const foo = vi.fn();
    const { container } = render(<FormComponent cardCreate={foo} />);
    const saveBtn = screen.getByText('Save');

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

    expect(name.value).toBe('aaaa');
  });
});
