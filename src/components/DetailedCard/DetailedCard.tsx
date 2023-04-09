import React from 'react';
import './DetailedCard.css';
import ShortUniqueId from 'short-unique-id';
import { RawCocktailModel } from '../../models/coctail.model';

function DetailedCard(props: { drink: RawCocktailModel }) {
  const { drink } = props;
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

  const portions = Object.entries(drink)
    .map(([key, value]: [string, string]) => {
      if (key.startsWith('strMeasure') && value) {
        return {
          key: value,
          id: uid(),
        };
      }
      return null;
    })
    .filter(Boolean);

  return (
    <div className="card-container relative">
      <div className="card">
        <div className="title underline">{drink.strDrink}</div>
        <div className="category">Category: {drink.strCategory}</div>
        <div className="alcoholic">
          Is Alcoholic: {drink.strAlcoholic === 'Alcoholic' ? 'Yes' : 'No'}
        </div>
        <img className="image" src={drink.strDrinkThumb} alt="" />
        <div className="recepie">
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
          <div className="portions">
            <ul>
              {portions &&
                portions.map((item) => (
                  <li key={item?.id} className="list-disc">
                    <div className="product text-base">
                      <span>{item?.key}</span>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="instructions">{drink.strInstructions}</div>
      </div>
    </div>
  );
}

export default DetailedCard;
