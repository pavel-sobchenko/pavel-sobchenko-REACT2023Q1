import './Form.style.css';
import React, { ChangeEvent, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { COCKTAIL_TYPES, GLASS_TYPES } from '../../models/constants';
import { CocktailModel, IngredientModel } from '../../models/cocktail.model';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { addImage, addInstructions, addName } from '../../store';

interface IFormInputs {
  name: string;
  instructions: string;
  image: string;
  dateCreated: string;
  alcoholic: string;
  category: string[];
  glass: string;
  product: string;
  volume: string;
}

type OmitCocktailModel = Omit<CocktailModel, 'alcoholic'>;

function FormComponent(props: { cardCreate: (value: CocktailModel) => void }) {
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      alcoholic: 'alco',
    },
  });
  const dispatch = useAppDispatch();
  const { name, instructions, image } = useAppSelector((state) => state.form);

  const [ingredients, setIngredients] = useState<IngredientModel[]>([]);
  const { cardCreate } = props;

  const handleName = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(addName(event.target.value));
  };

  const handleInstructions = (event: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(addInstructions(event.target.value));
  };

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      dispatch(addImage(URL.createObjectURL(event.target.files[0])));
    }
  };

  const handleAdd = () => {
    const product = watch('product');
    const volume = watch('volume');

    if (product?.length < 1) return;
    if (ingredients.some((v: IngredientModel) => v.product === product)) return;

    const ingredient: IngredientModel = { product, volume };
    setIngredients([...ingredients, ingredient]);
    resetField('product');
    resetField('volume');
  };

  const onSubmit: SubmitHandler<IFormInputs> = () => {
    const alco = watch('alcoholic');
    const formData = watch() as OmitCocktailModel;
    const card = Object.assign(formData, {
      alcoholic: alco === 'alcoholic',
      ingredients,
      image,
    });
    cardCreate(card);
    reset();
    setIngredients([]);
  };

  return (
    <div>
      <form className="form w-1/2 m-auto" onSubmit={handleSubmit(onSubmit)}>
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
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...register('name', {
                        required: 'This field is required',
                        minLength: {
                          value: 3,
                          message: 'Min length is 3 symbols',
                        },
                      })}
                      type="text"
                      id="name"
                      value={name}
                      onChange={handleName}
                      className="name block rounded-md border-2 flex-1  py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="ex: Zombie"
                    />
                  </div>
                  <ErrorMessage error={errors.name?.message} />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="instructions"
                  className="block font-semibold text-sm font-medium leading-6 text-gray-900"
                >
                  Describe your cocktail. Add some prehistory, live story or
                  recommendations how cook or drink
                </label>
                <div className="mt-2">
                  <textarea
                    id="instructions"
                    {...register('instructions', {
                      required: 'This field is required',
                    })}
                    rows={3}
                    value={instructions}
                    onChange={handleInstructions}
                    className="instr block w-full p-4 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                  />
                </div>
                <ErrorMessage error={errors.instructions?.message} />
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="file"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  image
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <input
                    {...register('image')}
                    id="file"
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="input-image rounded-md bg-white py-1.5 px-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  />
                </div>
                {image && (
                  <img src={image} alt="preview" className="cocktail-img" />
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 flex">
            <div className="sm:col-span-4">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  {...register('dateCreated')}
                  type="dateCreated"
                  className="block flex-1 border-0 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-6">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Cocktail recipe
            </h2>
            <div className="mt-2 space-y-2">
              <div className="flex items-center gap-x-3">
                <input
                  {...register('alcoholic', { required: true })}
                  type="radio"
                  value="alco"
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
                  {...register('alcoholic', { required: true })}
                  value="free"
                  type="radio"
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
                            {...register('category')}
                            value={item.name}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
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

            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-base font-semibold leading-6 text-gray-900"
              >
                Glass type
              </label>
              <div className="mt-2">
                <select
                  {...register('glass')}
                  id="glass"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {GLASS_TYPES.map((item) => (
                    <option key={item.id}>{item.name}</option>
                  ))}
                </select>
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
                    {...register('product')}
                    className="product block rounded-md flex-1 border-2 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="ex: Black Rum"
                  />
                </div>
                <div className="sm:col-span-8">
                  <input
                    type="text"
                    {...register('volume')}
                    className="volume block rounded-md flex-1 border-2 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="1 part(oz) or 100ml"
                  />
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
          {ingredients.length > 0 && (
            <>
              <h2 className="text-base font-bold leading-7 text-gray-900">
                Ingredients:
              </h2>
              <ul className="list-disc ml-10">
                {ingredients.map((item) => (
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
            className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormComponent;
