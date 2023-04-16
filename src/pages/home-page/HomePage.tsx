import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import CardList from '../../components/CardList/CardList';
import './HomePage.css';
import { RawCocktailModel } from '../../models/cocktail.model';
import Modal from '../../components/Modal/Modal';
import DetailedCard from '../../components/DetailedCard/DetailedCard';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
  fetchRandomCocktails,
  searchCocktailByName,
  clearSearchedCars,
  addSearchValue,
  closeModal,
} from '../../store/index';

function HomePage() {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector((state) => state.home.searchValue);
  const defaultCocktails = useAppSelector((state) => state.home.defaultCards);
  const filteredCocktails = useAppSelector((state) => state.home.filteredCards);
  const isEmptyResult = useAppSelector((state) => state.home.isEmptyResult);
  const isLoading = useAppSelector((state) => state.home.isLoading);
  const modalVisible = useAppSelector((state) => state.home.isModal);
  const selectedCocktailId = useAppSelector(
    (state) => state.home.selectedCardId
  );

  const filterChange = () => {
    if (searchValue.length > 0) {
      dispatch(searchCocktailByName(searchValue));
    } else {
      dispatch(clearSearchedCars());
    }
  };

  useEffect(() => {
    const value = window.localStorage.getItem('inputValue') || '';
    if (value.length > 0) {
      dispatch(searchCocktailByName(value));
      dispatch(addSearchValue(value));
    } else if (!defaultCocktails.length) {
      dispatch(fetchRandomCocktails());
    }

    return () => {
      dispatch(closeModal());
    };
  }, []);

  const cocktailsToDisplay = filteredCocktails?.length
    ? filteredCocktails
    : defaultCocktails;

  return (
    <div id="drink-background" className="image-background">
      <SearchBar filterChange={filterChange} />
      {isLoading && (
        <div className="text-xl m-auto text-center font-bold">Loading...</div>
      )}
      {isEmptyResult && (
        <div className="text-xl m-auto text-center font-bold">
          No result was found. Please, change the search criteria...
        </div>
      )}
      {!isLoading && !isEmptyResult && (
        <div>
          <CardList drinks={cocktailsToDisplay} />
          {modalVisible && (
            <Modal>
              <DetailedCard
                drink={
                  cocktailsToDisplay.find(
                    (c) => c.idDrink === selectedCocktailId
                  ) as RawCocktailModel
                }
              />
            </Modal>
          )}
        </div>
      )}
    </div>
  );
}

export default HomePage;
