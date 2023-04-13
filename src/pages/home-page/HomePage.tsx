import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import CardList from '../../components/CardList/CardList';
import './HomePage.css';
import { RawCocktailModel } from '../../models/cocktail.model';
import {
  getRandomCocktailList,
  searchCocktailByName,
} from '../../services/api.service';
import Modal from '../../components/Modal/Modal';
import DetailedCard from '../../components/DetailedCard/DetailedCard';

function HomePage() {
  const [cocktails, setCocktails] = useState<RawCocktailModel[]>([]);
  const [card, setCard] = useState<RawCocktailModel | null>();
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCocktails = async () => {
    return getRandomCocktailList().then((fetchedCocktails) =>
      setCocktails(fetchedCocktails)
    );
  };

  const filterChange = (value: string) => {
    if (value.length > 0) {
      setIsLoading(true);
      searchCocktailByName(value)
        .then((fetchedCocktails) => setCocktails(fetchedCocktails))
        .then(() => {
          setIsLoading(false);
        });
    } else {
      fetchCocktails();
    }
  };

  const handleCardClicked = (id: string) => {
    setModalVisible(true);
    setCard(cocktails.find((c: RawCocktailModel) => c.idDrink === id));
  };

  const handleClose = () => {
    setModalVisible(false);
    setCard(null);
  };

  useEffect(() => {
    const value = window.localStorage.getItem('inputValue') || '';
    if (value.length > 0) {
      filterChange(value);
    } else {
      fetchCocktails();
    }
  }, []);

  return (
    <div id="drink-background" className="image-background">
      <SearchBar filterChange={filterChange} />
      {!isLoading ? (
        <div>
          <CardList drinks={cocktails} onCardClicked={handleCardClicked} />
          {modalVisible && (
            <Modal closeModal={handleClose}>
              <DetailedCard drink={card as RawCocktailModel} />
            </Modal>
          )}
        </div>
      ) : (
        <div className="text-xl m-auto text-center font-bold">Loading...</div>
      )}
    </div>
  );
}

export default HomePage;
