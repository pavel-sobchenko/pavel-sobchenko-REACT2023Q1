import { render } from '@testing-library/react';
import React from 'react';
import Notification from './Notification';

describe('Notification', () => {
  it('should be created', () => {
    const { container } = render(<Notification text="Hello!" />);
    const divs = container.getElementsByClassName('message');
    expect(divs[0]).toBeInTheDocument();
  });

  it('it should display text', () => {
    const { container } = render(<Notification text="Hello!" />);
    const divs = container.getElementsByClassName('message');
    expect(divs[0]).toHaveTextContent('Hello!');
  });
});
