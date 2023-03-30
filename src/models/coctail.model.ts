export interface CocktailModel {
  id?: string;
  name: string;
  instructions: string;
  image: string;
  dateCreated: string;
  alcoholic: boolean;
  category: string[];
  glass: string;
  ingredients: IngredientModel[];
}

export interface IngredientModel {
  product: string;
  volume: string;
}
