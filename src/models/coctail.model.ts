export interface ICocktail {
    "idDrink": string,
    "strDrink": string,
    "strDrinkAlternate": any,
    "strTags": any,
    "strVideo": any,
    "strCategory": string,
    "strIBA": any,
    "strAlcoholic": string,
    "strGlass": string,
    "strInstructions": string,
    "strInstructionsES": string,
    "strInstructionsDE": any,
    "strInstructionsFR": any,
    "strInstructionsIT": any,
    "strInstructionsZH-HANS": any,
    "strInstructionsZH-HANT": any,
    "strDrinkThumb": string,
    "strIngredient1": any,
    "strIngredient2": any,
    "strIngredient3": any,
    "strIngredient4": any,
    "strIngredient5": any,
    "strMeasure1": any,
    "strMeasure2": any,
    "strMeasure3": any,
    "strMeasure4": any,
    "strMeasure5": any,
    "strImageSource": any,
    "strImageAttribution": string,
    "strCreativeCommonsConfirmed": string,
    "dateModified": string
}

export interface CocktailModel {
    name: string;
    description: string;
    img: string;
    date: string;
    isAlco: boolean;
    family: string[];
    glassType: string;
    ingredients: string[];
}
