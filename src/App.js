import React, { Component } from 'react';
import * as d3 from 'd3';
import Child1 from './Child1';
import Child2 from './Child2';
import SampleDataset from './SampleDataset.csv';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedCategory: 'A'

    };
  }

  componentDidMount() {
    d3.csv(SampleDataset).then(data => {
      this.setState({ data });
    });
  }
  handleCategoryChange = (event) => {
    this.setState({ selectedCategory: event.target.value });
  }

  render() {
    return (
      <div className="App">

        {this.state.data.length > 0 && <Child1 data={this.state.data} />}
        <select onChange={this.handleCategoryChange}>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
        {this.state.data.length > 0 && <Child2 data={this.state.data.filter(d => d.category === this.state.selectedCategory)} />}
      </div>
    );
  }
}

export default App;