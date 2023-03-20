import { Component } from 'react';
import React from 'react';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { CardList } from '../../components/CardList/CardList';
import { ICocktail } from '../../models/coctail.model';
import data from '../../assets/coctails.json';
import { DrinksState } from '../../models/drink.model';
import './HomePage.css';

interface MyProps {}

export class HomePage extends Component<MyProps, DrinksState> {

  constructor(props: MyProps) {
    super(props);
    this.state = {drinks: []};
    this.filterChange = this.filterChange.bind(this);
  }

  componentDidMount(): void {
      this.setState({
        drinks: data.drinks as ICocktail[]
      });
  }

  private filterChange(value: string) {
    const updatedList = (data.drinks as ICocktail[]).filter(drink => drink.strDrink.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
    this.setState({drinks: updatedList});
  }  

  render() {
    {
      return (
        <div id='drink-background' className='image-background'>
          <SearchBar filterChange={this.filterChange}  />
          <CardList drinks = {this.state.drinks}/>
        </div>
      );
    }
  }
}
