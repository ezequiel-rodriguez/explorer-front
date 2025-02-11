import { render } from '@testing-library/react';
import TestPage from './TestPage';

describe('Testing Example - Snapshot', () => {
  it('renders homepage unchanged', () => {
    const { container } = render(<TestPage />);
    expect(container).toMatchSnapshot();
  });
});
