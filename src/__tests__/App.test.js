import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from '../App.js';
import Form from '../components/form/form.js'

test('Renders RESTy header', () => {
  render(<App />);
  const linkElement = screen.getByText("RESTy");
  expect(linkElement).toBeInTheDocument();
})

test('loads and displays starter data', async () => {
  render(<App />)
  const name = await waitFor(() => screen.getByTestId('name'))
  expect(name).toHaveTextContent('Name');
})

test('can change url', async () => {
  render(<App />)
  const input = screen.getByTestId('url-input');
  const url = screen.getByTestId('url');
  // fireEvent.submit(...)
  // fireEvent.click.submit(...)?
  fireEvent.change(input, {target:{value:'person'}});
  // console.log('url:', url);
  expect(url).toHaveTextContent('URL:');
});

test.skip('should invoke handleSubmit with correct parameters', () => {
  const mockFn = jest.fn();
  render(<Form handleSubmit={mockFn}/>);
  const input = screen.getByRole('textbox') 
  let get = screen.getByRole('button', {
    name: /POST PUT DELETE/i
  })
  let submit = screen.getByRole('button', {
    name: /GO!/i
  })
  fireEvent.change(input, {target: {value: 'https://pokeapi.co/api/v2/'}})
  fireEvent.click(get)
  fireEvent.click(submit)
  expect(mockFn).toBeCalledWith("GET", "https://pokeapi.co/api/v2/");
})

test.skip('should be able to click a button', () => {
  render(<App />)
  let button = screen.getByRole('button', {
    name: /get/i
  })
  fireEvent.click(button)
  // expect(button).isDisabled

  let form = screen.getByRole('textbox');
  // expect(form).
})

test.skip('can count', async () => {
  render(<App />)
  const button = screen.getByText('Update Clicks');
  const counter = screen.getByTestId('counter');
  const factor = screen.getByTestId('factor');
  fireEvent.click(button);
  expect(counter).toHaveTextContent(1);
  expect(factor).toHaveTextContent('false');
});

test.skip('can count by fives', async () => {
  render(<App />)
  const button = screen.getByText('Update Clicks');
  const counter = screen.getByTestId('counter');
  const factor = screen.getByTestId('factor');

  expect(factor).toHaveTextContent('false');
  for(let i = 1; i<=27; i++) {
    fireEvent.click(button);
    let value = i % 5 ? "false" : "true";
    expect(factor).toHaveTextContent(value);
  }
});
