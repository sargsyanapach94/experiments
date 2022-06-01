import { render, screen } from './test-utils';
import App from './App';

// import { render, screen } from '@testing-library/react';

test('renders experiments', () => {
  render(<App />);
  const linkElement = screen.getByText(/experiments/i);
  expect(linkElement).toBeInTheDocument();
});
