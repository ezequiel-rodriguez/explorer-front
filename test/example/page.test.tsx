import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TestPage from './TestPage';

describe('Testing Example - TestPage component', () => {
  it('renders a heading', () => {
    render(<TestPage />);

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
