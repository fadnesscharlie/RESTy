import React, {useState} from 'react';
import './app.scss';

import Header from './components/header/header.js';
import History from './components/history/history.js';
import Results from './components/results/results.js';
import Form from './components/form/form.js';
import Footer from './components/footer/footer.js';

function App() {

  const [ data, setData ] = useState(null)
  const [ requestParams, setRequestParams ] = useState({})

  const callApi = async (requestParams) => {
    // mock output
    // await setTimeout(() => {
      // console.log('requestParams:', requestParams);
      const data = {
        count: 2,
        results: [
          {name: requestParams.name ? requestParams.name : 'name' , url: requestParams.url},
          // {name: requestParams.name ? requestParams.name : 'name', url: requestParams.url},
        ],
      };
      setData(data);
    // }, 1000)
    setRequestParams(requestParams);
  }

  return (
    <>
      <Header />
      <Form handleApiCall={callApi} />
      <Results data={data} />
      <div data-testid="name">API Name: {requestParams.name}</div>
      <div>Request Method: {requestParams.method}</div>
      <div data-testid="url" >URL: {requestParams.url}</div>
      <History />
      <Footer />
    </>
  )
}

export default App;
