import React from 'react';
import { vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Modal from './Modal';

describe('Card', () => {
  it('should create a child component', () => {
    render(
      <Modal closeModal={() => {}}>
        <div>ABCDE</div>
      </Modal>
    );
    const div = screen.getByText('ABCDE');
    expect(div).toBeTruthy();
  });

  it('should trigger props function on Close button', () => {
    const foo = vi.fn();
    render(
      <Modal closeModal={foo}>
        <div>ABCDE</div>
      </Modal>
    );

    fireEvent.click(screen.getByText('Close'));
    expect(foo).toHaveBeenCalledTimes(1);
  });

  it('should trigger props function on [x] button', () => {
    const foo = vi.fn();
    render(
      <Modal closeModal={foo}>
        <div>ABCDE</div>
      </Modal>
    );

    fireEvent.click(screen.getByText('×'));
    expect(foo).toHaveBeenCalledTimes(1);
  });
});
