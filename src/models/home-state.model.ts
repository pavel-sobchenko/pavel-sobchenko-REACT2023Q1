import { RawCocktailModel } from './cocktail.model';

export interface HomeStateModel {
  isLoading: boolean;
  error: Error | null;
  searchValue: string;
  defaultCards: RawCocktailModel[];
  filteredCards: RawCocktailModel[];
  isEmptyResult: false;
  selectedCardId: string | null;
  isModal: boolean;
}
