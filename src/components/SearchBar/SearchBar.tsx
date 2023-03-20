import { ChangeEvent, Component } from 'react';
import './SearchBar.css';

interface MyProps {
    filterChange: (value: string) => void
}

interface MyState {
  input: string;
}

export class SearchBar extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = { input: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    let value = window.localStorage.getItem('inputValue') || '';
    this.setState({input: value}, () => {
        this.props.filterChange(this.state.input);
      }); 
  }

  private handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value !== this.state.input) {
      this.setState({input: e.target.value}, () => {
        this.props.filterChange(this.state.input);
        window.localStorage.setItem('inputValue', this.state.input);
      });  
    }
  }  

  render() {
    return (
      <div className="main">
        <h1>Cocktail Search</h1>
        <div className="search">
          <input 
            className='search-input'
            type="text"
            value={this.state.input}
            onChange={this.handleChange}
          />
        </div>
        <button type='button'>ABC</button>
      </div>
    );
  }
}
