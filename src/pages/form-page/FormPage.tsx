import React, { ChangeEvent, Component, createRef, RefObject, SyntheticEvent } from "react";
import './FormPage.css'
import { COCKTAIL_TYPES } from "../../models/constants";

interface FormProps {}

interface FormState {
    cocktail: {
        name: string;
        description: string;
        img: string;
    }
}

export class FormPage extends Component<FormProps, FormState> {

    constructor(props: FormProps) {
        super(props);
        this.state = {
            cocktail: {
                name: '',
                description: '',
                img: ''
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleImage = this.handleImage.bind(this);
    }

    handleImage(event: any) {
        if (event.target.files && event.target.files[0]) {
            let cocktail = {...this.state.cocktail};
            cocktail.img = URL.createObjectURL(event.target.files[0]);
            this.setState({cocktail});
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

    handleSubmit(event: any) {
        debugger;
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(data.get('username')); // example of getting data from form
    }

    render() {
        return (
            <div className='form-container m-8'>
                <form onSubmit={this.handleSubmit}>
                    <div className="space-y-4">
                        <div className="border-b border-gray-900/10 pb-6">
                            <h2 className="text-base font-bold leading-7 text-gray-900">Add your own cocktail recipe</h2>

                            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder="ex: Zombie"
                                                onChange={this.handleName}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="about" className="block font-semibold text-sm font-medium leading-6 text-gray-900">
                                        Describe your cocktail. Add some prehistory, live story or recommendations how to drink
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="about"
                                            name="about"
                                            rows={3}
                                            className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                                            defaultValue={''}
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

                        <div className="border-b border-gray-900/10 pb-6">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Cocktail recipe</h2>

                            <fieldset>
                                <div className="mt-6 space-y-6">
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="alco"
                                            name="push-notifications"
                                            type="radio"
                                            defaultChecked
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
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Alcohol Free
                                        </label>
                                    </div>
                                </div>
                            </fieldset>

                            <div className="border-b border-gray-900/10 pb-4">
                                <div className="mt-10 space-y-10">
                                    <fieldset>
                                        <legend className="text-base font-semibold leading-6 text-gray-900">Family</legend>
                                        <div className="mt-6 grid grid-cols-1  gap-y-4 gap-x-6 sm:grid-cols-3">
                                            {COCKTAIL_TYPES.map(item => (
                                                <div key={item.name} className="relative flex gap-x-3">
                                                    <div className="flex h-6 items-center">
                                                        <input
                                                            name="type"
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
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


                            <div className="mt-10 grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-6">

                                <div className="sm:col-span-3">
                                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                        Glass type
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="country"
                                            name="country"
                                            autoComplete="country-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            <option>Height Ball</option>
                                            <option>Shot</option>
                                            <option>Glass</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                        </div>


                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
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
}
