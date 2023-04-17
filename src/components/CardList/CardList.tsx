import React from 'react';
import { RawCocktailModel } from '../../models/cocktail.model';
import ViewCard from '../ViewCard/ViewCard';
import { useAppDispatch } from '../../store/hooks';
import { addSelectedCardId, openModal } from '../../store';

interface DrinksModel {
  drinks: RawCocktailModel[];
}

function CardList(props: DrinksModel) {
  const dispatch = useAppDispatch();
  const { drinks } = props;

  const handleClickCard = (id: string) => {
    dispatch(addSelectedCardId(id));
    dispatch(openModal());
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
