import React  from 'react';
import { Component } from "react";
import { CocktailModel } from '../../models/coctail.model';

export class FormCard extends Component<CocktailModel> {
    constructor(props: CocktailModel) {
        super(props);

    }

    render() {
        const {name, family, img, ingredients} = this.props;
        return <div className='card'>
                    <div className='title'>{name}</div>
                    <div className='category'>{family}</div>
                    <img className='image' src={img} alt="" />
                    <div className='ingredients'>
                        <ul>
                            {ingredients.map(item => {
                                return <li key={item}>{item}</li>
                            })}
                        </ul>
                    </div>
                </div>
    };
}
