import { render, screen } from '@testing-library/react';
import App from './App';
import Header from './Header';

test('renders learn react link', () => {
  render(<Header />);
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
