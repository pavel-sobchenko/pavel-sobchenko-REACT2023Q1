import React from 'react';
import Card from '../Card/Card';
import { CocktailModel } from '../../models/coctail.model';

interface DrinksModel {
  drinks: CocktailModel[];
}

function CardList(props: DrinksModel) {
  const { drinks } = props;
  const drinkItems = drinks.map((drink) => (
    <Card key={drink.id + drink.name} drink={drink} />
  ));
  return (
    <div className="cocktailList flex flex-wrap justify-around w-1/2 m-auto">
      {drinkItems}
    </div>
  );
}

export default CardList;
