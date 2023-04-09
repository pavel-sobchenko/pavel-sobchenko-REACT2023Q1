export interface CocktailModel {
  id?: string;
  name: string;
  instructions: string;
  image: string;
  dateCreated: string;
  alcoholic: boolean;
  category: string[];
  glass: string;
  ingredients?: IngredientModel[];
}

export interface IngredientModel {
  product: string;
  volume: string;
}

export interface RawCocktailModel {
  dateModified: string;
  idDrink: string;
  strAlcoholic: string;
  strCategory: string;
  strCreativeCommonsConfirmed: string;
  strDrink: string;
  strDrinkAlternate?: string | null;
  strDrinkDE?: string;
  strDrinkES?: string;
  strDrinkFR?: string;
  strDrinkThumb: string;
  strDrinkZHHANS?: string;
  strDrinkZHHANT?: string;
  strGlass: string;
  strIBA: string | null;
  strImageSource: string | null;
  strImageAttribution: string | null;
  strIngredient1: string;
  strIngredient10?: string;
  strIngredient11?: string;
  strIngredient12?: string;
  strIngredient13?: string;
  strIngredient14?: string;
  strIngredient15?: string;
  strIngredient2: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strIngredient8?: string;
  strIngredient9?: string;
  strInstructions: string;
  strInstructionsDE: string;
  strInstructionsES: string | null;
  strInstructionsFR?: string;
  strInstructionsZHHANS: string | null;
  strInstructionsZHHANT: string | null;
  strMeasure1: string;
  strMeasure10?: string;
  strMeasure11?: string;
  strMeasure12?: string;
  strMeasure13?: string;
  strMeasure14?: string;
  strMeasure15?: string;
  strMeasure2: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
  strMeasure8?: string;
  strMeasure9?: string;
  strTags: string | null;
  strVideo: string | null;
}
