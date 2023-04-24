import React from 'react';
import Card from '../Card/Card';
import { CocktailModel } from '../../models/cocktail.model';

interface DrinksModel {
  drinks: CocktailModel[];
}

function FormCardList(props: DrinksModel) {
  const { drinks } = props;
  const drinkItems = drinks.map((drink) => (
    <Card key={drink.id} drink={drink} />
  ));
  return (
    <div className="cocktailList flex flex-wrap justify-around w-1/2 m-auto">
      {drinkItems}
    </div>
  );
}

export default FormCardList;
