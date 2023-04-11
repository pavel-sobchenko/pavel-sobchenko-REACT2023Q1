import React from 'react';
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
    <div className="detailed-card-container relative">
      <div className="detailed-card w-200">
        <div className="detailed-title underline font-medium text-2xl m-4 text-center">
          {drink.strDrink}
        </div>
        <div className="detailed-category font-medium text-xl text-center">
          Category: {drink.strCategory}
        </div>
        <div className="detailed-alcoholic  font-medium text-xl text-center">
          Is Alcoholic: {drink.strAlcoholic === 'Alcoholic' ? 'Yes' : 'No'}
        </div>
        <img
          className="detailed-image w-1/2 h-1/2 m-auto"
          src={drink.strDrinkThumb}
          alt=""
        />
        <div className="detailed-recepie flex justify-center">
          <div className="detailed-ingredients pr-4">
            <ul>
              {ingredients &&
                ingredients.map((item) => (
                  <li key={item?.id} className="">
                    <div className="detailed-product text-base">
                      <span>{item?.key}</span>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <div className="detailed-portions pl-4">
            <ul>
              {portions &&
                portions.map((item) => (
                  <li key={item?.id} className="">
                    <div className="detailed-product text-base">
                      <span>{item?.key}</span>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="detailed-instructions text-blue-600 w-5/5 bg-gray-200 border-1 radius-2 m-2">
          {drink.strInstructions}
        </div>
      </div>
    </div>
  );
}

export default DetailedCard;
