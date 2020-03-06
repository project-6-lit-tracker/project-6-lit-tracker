import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Qs from 'qs';
// Custom Imports Here:



class App extends Component {
  
  componentDidMount(){
    

    axios ({
      url: 'https://proxy.hackeryou.com',

      responseType: '',

      paramsSerializer: function (params) {
        return Qs.stringify(params, {arrayFormat: 'brackets'})
      },

      params: {
        reqUrl: "https://www.goodreads.com/search/index.xml",
        
        params : {
          key: '14csXzY0xdicnCrXfQSO1w',
          method: "search_index",
          q: "Harry Potter"
        },
        
        proxyHeaders: {
          'Access-Control-Allow-Origin': "https://proxy.hackeryou.com"
        }
       
      },

      xmlToJSON: false
    }).then((res) => {

      console.log(res);
    })
  }

  // paramsSerializer allows us to pass query params into axios call



  render() {
    
    return (
      <div className="App">
        <h1>Testing</h1>
      </div>
    );
  }

}
  

export default App;


// possibly try building a function that converts xml to json