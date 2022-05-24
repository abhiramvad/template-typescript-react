import React from 'react';
import Playground from './demo';
import { render, fireEvent, within, screen, wait, waitFor } from '@testing-library/react';
import Demo from './demo';

describe('<Counter />', () => {
  it('shoult update component', async () => {
    render(<Demo></Demo>)
    const autocomplete = screen.getByTestId('autocomplete');
    const input = within(autocomplete).queryByRole('combobox') as any;
 
    autocomplete.focus()
    // assign value to input field
    fireEvent.change(input, { target: { value: '' } })
    // navigate to the first item in the autocomplete box
    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
    // select the first item
    fireEvent.keyDown(autocomplete, { key: 'Enter' })
    console.log(input)
    await waitFor(()=>{
      expect(input.value).toEqual('The Shawshank Redemption')
    })
    // check the new value of the input field
  });
});
