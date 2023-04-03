import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import CardList from '../../components/CardList/CardList';
import data from '../../assets/coctails.json';
import './HomePage.css';
import { CocktailModel } from '../../models/coctail.model';

function HomePage() {
  const [drinks, setDrinks] = useState<CocktailModel[]>([]);
  const [filteredDrinks, setFilteredDrinks] = useState<CocktailModel[]>([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setDrinks(data.drinks as CocktailModel[]);
    setFilteredDrinks(data.drinks as CocktailModel[]);
  }, []);

  const filterChange = (value: string) => {
    setSearchValue(value);
    setFilteredDrinks(
      drinks.filter((drink) =>
        drink.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      )
    );
  };

  return (
    <div id="drink-background" className="image-background">
      <SearchBar filterChange={filterChange} />
      <CardList drinks={filteredDrinks} />
    </div>
  );
}

export default HomePage;
