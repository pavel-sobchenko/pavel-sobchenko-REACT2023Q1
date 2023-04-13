import React from 'react';
import './ViewCard.css';
import ShortUniqueId from 'short-unique-id';
import { RawCocktailModel } from '../../models/cocktail.model';

interface ViewCardProps {
  drink: RawCocktailModel;
  onCardClick: (id: string) => void;
}

function ViewCard(props: ViewCardProps) {
  const { drink, onCardClick } = props;
  const uid = new ShortUniqueId();
  const ingredients = Object.entries(drink)
    .map(([key, value]: [string, string]) => {
      if (key.startsWith('strIngredient') && value) {
        return {
          key: value,
          id: uid(),
        };
      }
      return null;
    })
    .filter(Boolean);

  const handleClick = () => {
    onCardClick(drink.idDrink);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className="card-container relative" onClick={handleClick}>
      <div className="card">
        <div className="title underline">{drink.strDrink}</div>
        <div className="category">Category: {drink.strCategory}</div>
        <div className="alcoholic">
          Is Alcoholic: {drink.strAlcoholic === 'Alcoholic' ? 'Yes' : 'No'}
        </div>
        <img className="image" src={drink.strDrinkThumb} alt="" />
        <div className="ingredients">
          <ul>
            {ingredients &&
              ingredients.map((item) => (
                <li key={item?.id} className="list-disc">
                  <div className="product text-base">
                    <span>{item?.key}</span>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ViewCard;
