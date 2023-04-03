import React from 'react';
import './Card.css';
import { CocktailModel } from '../../models/coctail.model';

function Card(props: { drink: CocktailModel }) {
  const { drink } = props;
  return (
    <div className="card-container relative">
      <div className="card">
        <div className="title underline">{drink.name}</div>
        <div className="category">Category: {drink.category}</div>
        <div className="glass">Glass type: {drink.glass}</div>
        <div className="alcoholic">
          Is Alcoholic: {drink.alcoholic ? 'Yes' : 'No'}
        </div>
        <img className="image" src={drink.image} alt="" />
        <div className="ingredients">
          <ul>
            {drink.ingredients &&
              drink.ingredients.map((item) => (
                <li key={item.product} className="list-disc">
                  <div className="product text-base">
                    <span>
                      {item.product} - {item.volume}
                    </span>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="instructions absolute">{drink.instructions}</div>
    </div>
  );
}

export default Card;
