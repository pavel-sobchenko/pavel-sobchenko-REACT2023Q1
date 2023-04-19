import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';
import { store } from '../../store';

describe('Card', () => {
  it('should create a child component', () => {
    render(
      <Provider store={store}>
        <Modal>
          <div>ABCDE</div>
        </Modal>
      </Provider>
    );

    const div = screen.getByText('ABCDE');
    expect(div).toBeTruthy();
  });

  it('should trigger props function on Close button', () => {
    render(
      <Provider store={store}>
        <Modal>
          <div>ABCDE</div>
        </Modal>
      </Provider>
    );

    fireEvent.click(screen.getByText('Close'));
    expect(store.getState().home.isModal).toEqual(false);
  });

  it('should trigger props function on [x] button', () => {
    render(
      <Provider store={store}>
        <Modal>
          <div>ABCDE</div>
        </Modal>
      </Provider>
    );

    fireEvent.click(screen.getByText('×'));
    expect(store.getState().home.isModal).toEqual(false);
  });
});
