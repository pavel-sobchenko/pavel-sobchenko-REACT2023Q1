import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import './FormPage.css';
import { COCKTAIL_TYPES, GLASS_TYPES } from '../../models/constants';
import { CocktailModel, IngredientModel } from '../../models/coctail.model';
import Notification from '../../components/Notification/Notification';
import Card from '../../components/Card/Card';

const emptyForm: CocktailModel = {
  name: '',
  instructions: '',
  image: '',
  dateCreated: '',
  alcoholic: true,
  category: [],
  glass: GLASS_TYPES[0].name,
  ingredients: [],
};

function FormPage() {
  const [formState, setFormState] = useState<CocktailModel>(emptyForm);
  const [cocktailList, setCocktailList] = useState<CocktailModel[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [product, setProduct] = useState('');
  const [volume, setVolume] = useState('');

  const handleFamily = (event: ChangeEvent<HTMLInputElement>) => {
    const category = [...formState.category];
    if (event.target.checked) {
      category.push(event.target.name);
    } else {
      const index = category.indexOf(event.target.name);
      if (index > -1) {
        category.splice(index, 1);
      }
    }
    setFormState({ ...formState, category });
  };

  const handleGlass = (event: ChangeEvent<HTMLSelectElement>) => {
    setFormState({ ...formState, glass: event.target.value });
  };

  const handleAlco = (event: ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, alcoholic: event.target.value === 'alco' });
  };

  const handleDate = (event: ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, dateCreated: event.target.value });
  };

  const handleAdd = () => {
    if (
      product.length < 1 ||
      formState.ingredients.some((v: IngredientModel) => v.product === product)
    )
      return;
    const ingr = {
      product: product[0].toUpperCase() + product.slice(1),
      volume,
    } as IngredientModel;
    setFormState({
      ...formState,
      ingredients: [...formState.ingredients, ingr],
    });
    setProduct('');
    setVolume('');
  };

  const handleIngredient = (event: ChangeEvent<HTMLInputElement>) => {
    setProduct(event.target.value);
  };

  const handleVolume = (event: ChangeEvent<HTMLInputElement>) => {
    setVolume(event.target.value);
  };

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFormState({
        ...formState,
        image: URL.createObjectURL(event.target.files[0]),
      });
      // eslint-disable-next-line no-param-reassign
      event.target.value = '';
    }
  };

  const handleDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setFormState({ ...formState, instructions: event.target.value });
  };

  const handleName = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormState({
      ...formState,
      name: value[0].toUpperCase() + value.slice(1),
    });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (formState.name.length > 0) {
      const currentCocktail = formState;
      setCocktailList([...cocktailList, currentCocktail]);
      const cocktail = {
        name: '',
        instructions: '',
        image: '',
        dateCreated: '',
        alcoholic: true,
        category: [],
        glass: GLASS_TYPES[0].name,
        ingredients: [],
      } as CocktailModel;
      setFormState(cocktail);
      setIsSubmitted(true);
      setIsNotification(true);

      setTimeout(() => {
        setIsNotification(false);
      }, 2000);
    } else {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="form-container p-8">
      {isNotification && <Notification text="New Cocktail just created!" />}
      <form className="w-1/2 m-auto">
        <div className="space-y-4">
          <div className="border-b border-gray-900/10 pb-6">
            <h1 className="text-base font-bold leading-7 text-gray-900">
              Add your own cocktail recipe
            </h1>

            <div className="mt-2 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="name"
                  className="block font-semibold text-sm font-medium leading-6 text-gray-900"
                >
                  Name it
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="block flex-1 border-0 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="ex: Zombie"
                      required
                      value={formState.name}
                      onChange={handleName}
                    />
                  </div>
                  {isSubmitted && formState.name.length === 0 && (
                    <div className="error text-red-600">
                      *Length should be more than 0
                    </div>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block font-semibold text-sm font-medium leading-6 text-gray-900"
                >
                  Describe your cocktail. Add some prehistory, live story or
                  recommendations how cook or drink
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full p-4 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                    value={formState.instructions}
                    onChange={handleDescription}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <input
                    type="file"
                    name="file-input"
                    accept="image/*"
                    onChange={handleImage}
                    className="rounded-md bg-white py-1.5 px-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  />
                </div>
                {formState.image && (
                  <img
                    src={formState.image}
                    alt="preview"
                    className="cocktail-img"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 flex">
            <div className="sm:col-span-4">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="date"
                  name="date"
                  value={formState.dateCreated}
                  className="block flex-1 border-0 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  onChange={handleDate}
                />
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-6">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Cocktail recipe
            </h2>
            <fieldset>
              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-x-3">
                  <input
                    id="alco"
                    name="push-notifications"
                    type="radio"
                    value="alco"
                    onChange={handleAlco}
                    checked={formState.alcoholic}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-everything"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Alcohol
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="algo-free"
                    name="push-notifications"
                    value="free"
                    type="radio"
                    onChange={handleAlco}
                    checked={!formState.alcoholic}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Alcohol Free
                  </label>
                </div>
              </div>
            </fieldset>

            <div className="border-b border-gray-900/10 pb-4">
              <div className="mt-4 space-y-2">
                <fieldset>
                  <legend className="text-base font-semibold leading-6 text-gray-900">
                    Family
                  </legend>
                  <div className="mt-2 grid grid-cols-1  gap-y-4 gap-x-6 sm:grid-cols-3">
                    {COCKTAIL_TYPES.map((item) => (
                      <div key={item.name} className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <input
                            name={item.name}
                            type="checkbox"
                            checked={formState.category.some(
                              (f: string) => f === item.name
                            )}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            onChange={handleFamily}
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <label
                            htmlFor="comments"
                            className="font-medium text-gray-900"
                          >
                            {item.name}
                          </label>
                          <p className="text-gray-500">{item.example}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>

            <div className="">
              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-base font-semibold leading-6 text-gray-900"
                >
                  Glass type
                </label>
                <div className="mt-2">
                  <select
                    id="glass"
                    name="glass"
                    onChange={handleGlass}
                    value={formState.glass}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    {GLASS_TYPES.map((item) => (
                      <option key={item.id}>{item.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-2">
              <label
                htmlFor="drink"
                className="block text-base font-semibold leading-6 text-gray-900"
              >
                Add ingredients:
              </label>
              <div className="flex mt-2">
                <div className="sm:col-span-4 mr-4">
                  <input
                    type="text"
                    name="drink"
                    className="block flex-1 border-0 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="ex: Black Rum"
                    value={product}
                    onChange={handleIngredient}
                  />
                  {isSubmitted && formState.ingredients.length === 0 && (
                    <div className="error text-red-600">*Add ingredients</div>
                  )}
                </div>
                <div className="sm:col-span-8">
                  <input
                    type="text"
                    name="volume"
                    className="block flex-1 border-0 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="1 part(oz) or 100ml"
                    value={volume}
                    onChange={handleVolume}
                  />
                  {isSubmitted && formState.ingredients.length === 0 && (
                    <div className="error text-red-600">*Add ingredients</div>
                  )}
                </div>
                <div>
                  <button
                    type="button"
                    className=" rounded-md ml-2 py-2 px-3 text-sm font-semibold text-gray-900 bg-indigo-400"
                    onClick={handleAdd}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>

          {formState.ingredients.length > 0 && (
            <>
              <h2 className="text-base font-bold leading-7 text-gray-900">
                Ingredients:
              </h2>
              <ul className="list-disc ml-10">
                {formState.ingredients.map((item) => (
                  <li key={item.product}>
                    {item.product}: {item.volume}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
      <div className="cocktail-cards mt-10">
        {cocktailList.map((item: CocktailModel) => {
          return <Card key={item.name} drink={item} />;
        })}
      </div>
    </div>
  );
}

export default FormPage;
