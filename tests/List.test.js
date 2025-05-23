import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import List from '../src/app/component/List';

describe('Todo List App', () => {
  it('adds a new item to the list', async () => {
    render(<List />);

    const input = screen.getByPlaceholderText(/add item/i);
    const button = screen.getByRole('button', { name: /add/i });

    await userEvent.type(input, 'Write tests');

    await userEvent.click(button);

    expect(screen.getByText('Write tests')).toBeTruthy();;
  });

  it('should not add an empty item', async () => {
    render(<List />);

    const input = screen.getByPlaceholderText(/add item/i);
    const button = screen.getByRole('button', { name: /add/i });

    const initialItems = screen.queryAllByRole('listitem').length;

    await userEvent.type(input, '   ');  

    await userEvent.click(button);

    const updatedItems = screen.queryAllByRole('listitem').length;

    expect(updatedItems).toBe(initialItems);
  });
});