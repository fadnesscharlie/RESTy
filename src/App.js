import React from 'react';
import './app.scss';

import Header from './components/header/header.js';
import History from './components/history/history.js';
import Results from './components/results/results.js';
import Form from './components/form/form.js';
import Footer from './components/footer/footer.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      requestParams: {},
    };
  }

  callApi = (requestParams) => {
    // mock output
    const data = {
      count: 2,
      results: [
        {name: 'fake thing 1', url: 'http://fakethings.com/1'},
        {name: 'fake thing 2', url: 'http://fakethings.com/2'},
      ],
    };
    this.setState({data, requestParams});
  }

  render() {
    return (
      <>
        <Header />
        <Form handleApiCall={this.callApi} />
        <Results data={this.state.data} />
        <div>Request Method: {this.state.requestParams.method}</div>
        <div>URL: {this.state.requestParams.url}</div>
        <History />
        <Footer />
      </>
    )
  }
}

export default App;
