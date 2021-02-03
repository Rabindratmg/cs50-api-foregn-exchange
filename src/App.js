import React, { Component } from 'react';
import './App.css';


class App extends Component {
  currencies=["AUD","INR","CAD","JPY","USD","EUR"]
  state = { 
    base:"USD",
    other:"EUR",
    value:0,
    output:0
   }

   //function to make change in input field
   handleChange=(event)=>{
     this.setState({
       value: event.target.value,
       output: null
     }, this.recalculate);
   }

   //function to select the option in currency
   makeSelection=(event)=>{
     this.setState({
       [event.target.name]: event.target.value
     },this.recalculate)
   }

   recalculate = ()=>{
     const value = parseFloat(this.state.value);
     if(isNaN(value)){
       return;
     }
     fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
     .then(response=>response.json())
     .then(data=>{
        this.setState({
            output: data.rates[this.state.other]*value
        })
     })
   }
  render() { 
    return (  
      <div className="App">
    
        <select name="base" onChange={this.makeSelection} value={this.state.base}>
          {
            this.currencies.map(data=>
              <option>
                {data}
              </option>
              )
          }


        </select>
        <input value={this.state.value} 
          onChange={this.handleChange}
        />
        <br/>

        <select name="other" onChange={this.makeSelection} value={this.state.other}>
        {
            this.currencies.map(data=>
              <option key={ data }>
                {data}
              </option>
              )
          }

        </select>
        <input value={this.state.output}
          disabled={true}
          onChange={this.handleChange}
        />
    </div>
    );
  }
}

export default App;
 
