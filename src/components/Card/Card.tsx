import React, { PropsWithChildren } from 'react';
import { Component } from "react";
import { ICocktail } from '../../models/coctail.model';
import './Card.css';

export class Card extends Component<PropsWithChildren<{key: string, value: ICocktail}>> {

    render() {
        const drink = this.props.value;
        return <div className='card'>
                    <div className='title'>{drink.strDrink}</div>
                    <div className='category'>{drink.strCategory}</div>
                    <img className='image' src={drink.strDrinkThumb} alt="" />
                    <div className='ingredients'>
                        <ul>
                            {drink.strIngredient1 && <li>{drink.strIngredient1}</li>}
                            {drink.strIngredient2 && <li>{drink.strIngredient2}</li>}
                            {drink.strIngredient3 && <li>{drink.strIngredient3}</li>}
                            {drink.strIngredient4 && <li>{drink.strIngredient4}</li>}
                            {drink.strIngredient5 && <li>{drink.strIngredient5}</li>}
                        </ul>
                    </div>
                </div>
    };
}
