import {render, screen, fireEvent} from "@testing-library/react";
import { FormCard } from './FormCard';
import { GLASS_TYPES } from "../../models/constants";
import React from "react";

const item = {
    name: 'AAA',
    description: 'BBB',
    img: 'abcd',
    date: '',
    isAlco: true,
    family: ['CCCC'],
    glassType: GLASS_TYPES[0].name,
    ingredients: ['DDDD', 'EEEE', 'MMMM']
}

describe('FormCard', () => {
    it('should contain input', () => {
        const {container} = render(<FormCard key={item.name} name={item.name}  date={item.date} description={item.description} family={item.family} glassType={item.glassType} img={item.img} ingredients={item.ingredients} isAlco/>
    );
        const card = container.getElementsByClassName('card')[0];
        expect(card).toBeInTheDocument();
    })

    it('it should display card name', () => {
        const {container} = render(<FormCard key={item.name} name={item.name}  date={item.date} description={item.description} family={item.family} glassType={item.glassType} img={item.img} ingredients={item.ingredients} isAlco/>
        );
        const card = container.getElementsByClassName('title')[0];
        expect(card).toHaveTextContent('AAA');
    })

    it('it should display categories list', () => {
        const {container} = render(<FormCard key={item.name} name={item.name}  date={item.date} description={item.description} family={item.family} glassType={item.glassType} img={item.img} ingredients={item.ingredients} isAlco/>
        );
        // const card = container.getElementsByClassName('title')[0];
        const ingr = screen.getAllByRole('listitem');
        expect(ingr).toHaveLength(3);
    })
})
