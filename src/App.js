import React, { Component } from 'react';
import axios from 'axios';
import './index.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <p>..</p>
      </div>
    );
  }


  componentDidMount() {
    axios ({
      url: 'http://proxy.hackeryou.com',
      method:'GET',
      responseType: 'json',
      params: {
        reqUrl: "http://www.goodreads.com/search/index.xml",
        key: 'eFeVrsrYTPDJs9KCydUAKA',        
        // proxyHeaders: {
        //   'Access-Control-Allow-Origin': "*"
        // }      
      },
      xmlToJSON: true,
    }).then((res) => {      
        console.log(res);
    })
  }
}

export default App;
