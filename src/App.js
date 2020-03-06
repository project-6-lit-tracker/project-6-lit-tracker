import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>...</p>
      </div>
    );
  }

  componentDidMount() {
    axios ({
      url: 'https://proxy.hackeryou.com',
      method: 'GET',
      responseType: 'json',
      paramsSerializer: function (params) {
        return params
    },
      params: {
        method: 'GET',
        reqUrl: "https://www.goodreads.com/search/index.xml",
        key: '14csXzY0xdicnCrXfQSO1w',
      },
      xmlToJSON: false
    }).then((res) => {      
      console.log(res);
    })
  }
}

export default App;
