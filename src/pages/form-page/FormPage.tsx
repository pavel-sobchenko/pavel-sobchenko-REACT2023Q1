import React, { ChangeEvent, Component, createRef, FormEvent, RefObject } from "react";
import './FormPage.css'
import { COCKTAIL_TYPES, GLASS_TYPES } from "../../models/constants";

interface FormProps {}

interface CocktailModel {
    name: string;
    description: string;
    img: string;
    date: string;
    isAlco: boolean;
    family: string[];
    glassType: string;
    ingredients: string[];
}

interface FormState {
    cocktail: CocktailModel;
    cocktailList: CocktailModel[];
    isSubmitted: boolean;
}

const emptyForm: CocktailModel = {
    name: '',
    description: '',
    img: '',
    date: '',
    isAlco: true,
    family: [],
    glassType: GLASS_TYPES[0].name,
    ingredients: []
}

export class FormPage extends Component<FormProps, FormState> {

    input: RefObject<any>;

    constructor(props: FormProps) {
        super(props);
        this.state = {
            cocktail: emptyForm,
            cocktailList: [],
            isSubmitted: false
        };

        this.input = createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleImage = this.handleImage.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDate = this.handleDate.bind(this);
    }

    handleFamily = (event: ChangeEvent<HTMLInputElement>) => {
        let cocktail = {...this.state.cocktail};
        if (event.target.checked) {
            cocktail.family.push(event.target.name);
        } else {
            const index = cocktail.family.indexOf(event.target.name);
            if (index > -1) {
                cocktail.family.splice(index, 1);
            }
        }
        this.setState({cocktail});
    }

    handleGlass = (event: ChangeEvent<HTMLSelectElement>) => {
        let cocktail = {...this.state.cocktail};
        cocktail.glassType = event.target.value;
        this.setState({cocktail});
    }

    handleAlco = (event: ChangeEvent<HTMLInputElement>) => {
        let cocktail = {...this.state.cocktail};
        cocktail.isAlco = event.target.value === 'alco';
        this.setState({cocktail});
    }

    handleDate(event: ChangeEvent<HTMLInputElement>) {
        let cocktail = {...this.state.cocktail};
        cocktail.date = event.target.value;
        this.setState({cocktail});
    }

    handleAdd() {
        let value = this.input.current.value;
        if (value.length < 1) return;
        let cocktail = {...this.state.cocktail};
        cocktail.ingredients.push(value);
        this.setState({cocktail});
        this.input.current.value = '';
    }

    handleImage(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files[0]) {
            let cocktail = {...this.state.cocktail};
            cocktail.img = URL.createObjectURL(event.target.files[0]);
            this.setState({cocktail});
            event.target.value = "";
        }
    }

    handleDescription(event: ChangeEvent<HTMLTextAreaElement>) {
        let cocktail = {...this.state.cocktail};
        cocktail.description = event.target.value;
        this.setState({cocktail});
    }

    handleName(event: ChangeEvent<HTMLInputElement>) {
        let cocktail = {...this.state.cocktail};
        cocktail.name = event.target.value;
        this.setState({cocktail});
    }

    handleSubmit() {
        if(this.state.cocktail.name.length > 0) {
            const currentCocktail = this.state.cocktail;
            const obj = {
                cocktail: {
                    name: '',
                    description: '',
                    img: '',
                    date: '',
                    isAlco: true,
                    family: [],
                    glassType: GLASS_TYPES[0].name,
                    ingredients: []
                }
                , cocktailList: [...this.state.cocktailList, currentCocktail]
            };
            this.setState(obj);
            this.setState({
                ...this.state,
                isSubmitted: false
            });
        } else {
            this.setState({
                ...this.state,
                isSubmitted: true
            });
        }
    }

    render() {
        return (
            <div className='form-container p-8'>
                <form className='w-1/2 m-auto'>
                    <div className="space-y-4">
                        <div className="border-b border-gray-900/10 pb-6">
                            <h2 className="text-base font-bold leading-7 text-gray-900">Add your own cocktail recipe</h2>

                            <div className="mt-2 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <label htmlFor="username" className="block font-semibold text-sm font-medium leading-6 text-gray-900">
                                        Name it
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                type="text"
                                                name="username"
                                                id="username"
                                                autoComplete="username"
                                                className="block flex-1 border-0 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder="ex: Zombie"
                                                required
                                                value={this.state.cocktail.name}
                                                onChange={this.handleName}
                                            />
                                        </div>
                                        {
                                            this.state.isSubmitted
                                            && this.state.cocktail.name.length === 0
                                            && <div className='error text-red-600'>*Length should be more than 0</div>
                                        }
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="about" className="block font-semibold text-sm font-medium leading-6 text-gray-900">
                                        Describe your cocktail. Add some prehistory, live story or recommendations how cook or drink
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="about"
                                            name="about"
                                            rows={3}
                                            className="block w-full p-4 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                                            value={this.state.cocktail.description}
                                            onChange={this.handleDescription}
                                        />
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                        Photo
                                    </label>
                                    <div className="mt-2 flex items-center gap-x-3">
                                        <input type="file" name="file-input"
                                               accept="image/*"
                                               onChange={this.handleImage}
                                               className="rounded-md bg-white py-1.5 px-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                        />
                                    </div>
                                    {this.state.cocktail.img && <img src={this.state.cocktail.img} alt="preview image" className='cocktail-img' />}
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex">
                            <div className="sm:col-span-4">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="date"
                                        name="date"
                                        value={this.state.cocktail.date}
                                        className="block flex-1 border-0 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        onChange={this.handleDate}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border-b border-gray-900/10 pb-6">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Cocktail recipe</h2>
                            <fieldset>
                                <div className="mt-2 space-y-2">
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="alco"
                                            name="push-notifications"
                                            type="radio"
                                            value='alco'
                                            onChange={this.handleAlco}
                                            checked={this.state.cocktail.isAlco}
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                                            Alcohol
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="algo-free"
                                            name="push-notifications"
                                            value='free'
                                            type="radio"
                                            onChange={this.handleAlco}
                                            checked={!this.state.cocktail.isAlco}
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Alcohol Free
                                        </label>
                                    </div>
                                </div>
                            </fieldset>

                            <div className="border-b border-gray-900/10 pb-4">
                                <div className="mt-4 space-y-2">
                                    <fieldset>
                                        <legend className="text-base font-semibold leading-6 text-gray-900">Family</legend>
                                        <div className="mt-2 grid grid-cols-1  gap-y-4 gap-x-6 sm:grid-cols-3">
                                            {COCKTAIL_TYPES.map((item, index, array) => (
                                                <div key={item.name} className="relative flex gap-x-3">
                                                    <div className="flex h-6 items-center">
                                                        <input
                                                            name={item.name}
                                                            type="checkbox"
                                                            checked={this.state.cocktail.family.some(f => f === item.name)}
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                            onChange={this.handleFamily}
                                                        />
                                                    </div>
                                                    <div className="text-sm leading-6">
                                                        <label htmlFor="comments" className="font-medium text-gray-900">
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
                                    <label htmlFor="country" className="block text-base font-semibold leading-6 text-gray-900">
                                        Glass type
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="glass"
                                            name="glass"
                                            onChange={this.handleGlass}
                                            value={this.state.cocktail.glassType}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            {GLASS_TYPES.map(item => (
                                                <option key={item.id}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className='mt-2'>
                                <label className="block text-base font-semibold leading-6 text-gray-900">
                                    Add ingredients:
                                </label>
                                <div className="flex mt-2">
                                    <div className="sm:col-span-4">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                type="text"
                                                name="drink"
                                                className="block flex-1 border-0 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder="ex: Black Rum"
                                                ref={this.input}
                                            />
                                        </div>
                                        {
                                            this.state.isSubmitted
                                            && this.state.cocktail.ingredients.length === 0
                                            && <div className='error text-red-600'>*Add ingredients</div>
                                        }
                                    </div>
                                    <div>
                                        <button type="button" className=" rounded-md ml-2 py-2 px-3 text-sm font-semibold text-gray-900 bg-indigo-400"
                                                onClick={this.handleAdd}
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {
                            this.state.cocktail.ingredients.length > 0 &&
                            <>
                                <h2 className="text-base font-bold leading-7 text-gray-900">Ingredients:</h2>
                                <ul className='list-disc ml-10'>
                                    {
                                        this.state.cocktail.ingredients.map(item =>
                                            <li key={item}>{item}</li>
                                        )
                                    }
                                </ul>
                            </>
                        }

                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            onClick={this.handleSubmit}
                            className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
                <div>{this.state.cocktailList.map(item => {
                    return <div key={item.name}>
                        <img src={item.img} alt="" className='cocktail-img'/>
                    </div>
                })}</div>
            </div>
        );
    }
}
