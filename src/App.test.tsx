import { render, screen, cleanup } from '@testing-library/react';
import App from './App';
import QQInfo from './components/QQInfo';

afterEach(cleanup);

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/QQ号查询/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders QQInfo info', () => {
  const item = { code: 1, name: '小明', qlogo: '', qq: '123456789' };
  const { getByText } = render(<QQInfo item={ item } />);
  const name = getByText(/小明/i);
  const qq = getByText(/123456789/i);
  expect(name).toBeInTheDocument();
  expect(qq).toBeInTheDocument();
});