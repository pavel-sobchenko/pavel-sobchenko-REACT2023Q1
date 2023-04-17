import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import Modal from './Modal';

const initialState = {
  home: {
    defaultCards: [],
    filteredCards: [],
    searchValue: '',
    isLoading: false,
    isEmptyResult: false,
    error: null,
    selectedCardId: null,
    isModal: false,
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let store: any;

beforeEach(() => {
  const mockStore = configureStore();
  store = mockStore(initialState);
});

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

  // it('should trigger props function on Close button', () => {
  //   const foo = vi.fn();
  //   render(
  //     <Provider store={store}>
  //       <Modal>
  //         <div>ABCDE</div>
  //       </Modal>
  //     </Provider>
  //   );

  //   fireEvent.click(screen.getByText('Close'));
  //   expect(foo).toHaveBeenCalledTimes(1);
  // });

  // it('should trigger props function on [x] button', () => {
  //   const foo = vi.fn();
  //   render(
  //     <Modal>
  //       <div>ABCDE</div>
  //     </Modal>
  //   );

  //   fireEvent.click(screen.getByText('×'));
  //   expect(foo).toHaveBeenCalledTimes(1);
  // });
});
