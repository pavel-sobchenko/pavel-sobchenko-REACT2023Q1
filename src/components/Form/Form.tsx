import './Form.style.css';
/* eslint-disable prettier/prettier */
import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { COCKTAIL_TYPES, GLASS_TYPES } from '../../models/constants';
import { CocktailModel, IngredientModel } from '../../models/coctail.model';
import Notification from '../../components/Notification/Notification';
import Card from '../../components/Card/Card';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

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

interface IFormInputs {
    name: string;
    about: string;
    photo: string;
    date: string;
    alco: string;
    type: string;
    glass: string;
    product: string;
    volume: string;
  }

function FormComponent() {
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
        alco: 'alco'
    }
  });
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState<IngredientModel[]>([]);

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      // eslint-disable-next-line no-param-reassign
      event.target.value = '';
    }
  };

  const handleAdd = () => {
    const product = watch('product');
    const volume = watch('volume');

    if (product.length < 1 || ingredients.some((v: IngredientModel) => v.product === product)) return;

    const ingredient: IngredientModel = {product, volume};
    setIngredients([...ingredients, ingredient]);
    resetField('product');
    resetField('volume');
  };

  const onSubmit: SubmitHandler<IFormInputs> = data => console.log(data);

  return <div>
      <form className="w-1/2 m-auto" onSubmit={handleSubmit(onSubmit)}>
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
                                { ...register('name', { required: "This field is required", minLength: { value: 3, message: "Min length is 3 symbols" } })}
                                type="text"
                                id="name"
                                className="block rounded-md border-2 flex-1  py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="ex: Zombie"
                                />
                            </div>
                            <ErrorMessage error={errors.name?.message} />
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
                            { ...register('about', { required: "This field is required" })}
                            rows={3}
                            className="block w-full p-4 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                        />
                        </div>
                        <ErrorMessage error={errors.about?.message} />
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
                            { ...register('photo')}
                            type="file"
                            accept="image/*"
                            onChange={handleImage}
                            className="rounded-md bg-white py-1.5 px-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        />
                        </div>
                        {image && (
                        <img
                            src={image}
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
                            { ...register('date')}
                            type="date"
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
                            {...register('alco', { required: true })}
                            id="alco"
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
                            {...register('alco', { required: true })}
                            id="algo-free"
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
                                        {...register("type")}
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
                            {...register("glass")}
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
                            {...register("product")}
                            className="block flex-1 border-2 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="ex: Black Rum"
                        />
                        </div>
                        <div className="sm:col-span-8">
                            <input
                                type="text"
                                {...register("volume")}
                                className="block flex-1 border-2 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
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



        </div>
 
        
        <input type="submit" />
    </form>
  </div>;
}

export default FormComponent;
