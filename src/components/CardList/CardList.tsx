import { Component, PropsWithChildren } from 'react';
import React from 'react';
import { DrinksState } from '../../models/drink.model';
import { Card } from '../Card/Card';
import './CardList.css';

export class CardList extends Component<PropsWithChildren<DrinksState>> {

  constructor(props: PropsWithChildren<DrinksState>) {
    super(props);   
  }

  render() {
    const drinks = this.props.drinks;
    const drinkItems = drinks.map((drink) => 
      <Card key={drink.idDrink} value={drink}/>
    );
    return (
      <div className='cocktailList'>{drinkItems}</div>
    );
  }
}
