import {render, screen, fireEvent} from "@testing-library/react";
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
    it('should contain input', () => {
        render(<SearchBar filterChange={() => {}}/>);
        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
    })

    it('it should allow text data', () => {
        render(<SearchBar filterChange={() => {}}/>);
        const input = screen.getByRole('textbox') as HTMLInputElement;

        fireEvent.change(input, {target: {value: '123'}})
        expect(input.value).toBe('123')
    })
})
