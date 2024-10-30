import React from 'react';
import { render } from '@testing-library/react';
import Pourqoi from './app';

describe('Pourqoi', () => {
  it('renders learn react link', () => {
    const { container } = render(<Pourqoi />);
    const pourqoi = container.querySelector('.c-pourqoi');
    expect(pourqoi).toBeInTheDocument();
  });
});
