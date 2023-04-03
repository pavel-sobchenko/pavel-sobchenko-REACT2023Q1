/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import './FormPage.css';
import FormComponent from '../../components/Form/Form';
import { CocktailModel } from '../../models/coctail.model';
import CardList from '../../components/CardList/CardList';

function FormPage() {

  const [drinks, setDrinks] = useState<CocktailModel[]>([]);

  const cardCreate = (value: CocktailModel) => {
    setDrinks(prev => [...prev, value]);
  }

  return <div>
      <FormComponent cardCreate={cardCreate}/>
      <CardList drinks={drinks}/>
  </div>;
}

export default FormPage;
