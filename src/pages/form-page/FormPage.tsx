import React from 'react';
import './FormPage.css';
import FormComponent from '../../components/Form/Form';
import FormCardList from '../../components/FormCardList/FormCardList';
import { useAppSelector } from '../../store/hooks';

function FormPage() {
  const drinks = useAppSelector((state) => state.form.cards);

  return (
    <div>
      <FormComponent />
      <FormCardList drinks={drinks} />
    </div>
  );
}

export default FormPage;
