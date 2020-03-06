import React, { Component } from 'react';
import firebase from './firebase';

import './App.css';
import axios from 'axios';
import Qs from 'qs';
const convert = require('xml-js');


// Custom Imports Here:
// import Header from './components/Header';
// import Main from './components/Main';
// import Footer from './components/Footer';



class App extends Component {
  constructor() {
    super();
    this.state = {
      books: []
    }
  }
  
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
      const result2 = convert.xml2json(res.data, {compact: false, spaces: 4});
      console.log(result2);
    })

    const dbRef = firebase.database().ref();

    dbRef.on('value', (response) => {
      console.log(response.val());
    });
  }

  // paramsSerializer allows us to pass query params into axios call



  render() {
    
    return (
      <div className="App">
        <ul>
          {this.state.books.map((book) => {        
            return <li>{book}</li>
          })}
        </ul>
        {/* <Header />
        <Main />
        <Footer /> */}
      </div>
    );
  }

}

export default App;


// halp

//try

// What's happening?