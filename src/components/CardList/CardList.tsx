import React from 'react';
import { RawCocktailModel } from '../../models/cocktail.model';
import ViewCard from '../ViewCard/ViewCard';

interface DrinksModel {
  drinks: RawCocktailModel[];
  onCardClicked: (id: string) => void;
}

function CardList(props: DrinksModel) {
  const { drinks, onCardClicked } = props;

  const handleClickCard = (id: string) => {
    onCardClicked(id);
  };

  const drinkItems = drinks?.map((drink) => {
    return (
      <ViewCard
        key={drink.idDrink}
        drink={drink}
        onCardClick={handleClickCard}
      />
    );
  });

  return (
    <div className="cocktailList flex flex-wrap justify-around w-1/2 m-auto">
      {drinkItems}
    </div>
  );
}

export default CardList;
