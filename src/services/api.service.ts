import axios from 'axios';
import { RawCocktailModel } from '../models/cocktail.model';
import { HTTP_BASE_URL, BASE_URL } from '../models/constants';

const getHeader = () => {
  return {
    'X-RapidAPI-Key': import.meta.env.VITE_APP_TOKEN,
    'X-RapidAPI-Host': BASE_URL,
  };
};

const getRandomCocktailList = async (): Promise<RawCocktailModel[]> => {
  const cockatilsData = await axios.get(
    `${HTTP_BASE_URL}/randomselection.php`,
    {
      headers: getHeader(),
    }
  );
  return cockatilsData?.data?.drinks as RawCocktailModel[];
};

const searchCocktailByName = async (q: string) => {
  const cockatilsData = await axios.get(`${HTTP_BASE_URL}/search.php`, {
    params: { s: q },
    headers: getHeader(),
  });

  return cockatilsData?.data?.drinks as RawCocktailModel[];
};

export { getRandomCocktailList, searchCocktailByName };
