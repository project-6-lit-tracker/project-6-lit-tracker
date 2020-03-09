import React, { Component } from 'react';
import firebase from './firebase';
import './App.css';
import axios from 'axios';
import Qs from 'qs';

import Header from './Components/Header';
import Main from './Components/Main';
import Footer from './Components/Footer';
import SearchResults from './Components/SearchResults';
const convert = require('xml-js');





class App extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      // Main axios API info

      searchInput: "",
      // User search input for SearchBar

      userLibrary: [],
      // User selected from API books
      // Firebase

      booksToRead: [],
      // User selected books to read later on
      // Firebase 

    }
  }
  
  componentDidMount(){
    // firebase 
    const dbRef = firebase.database().ref();
    dbRef.on('value', (response) => {
      console.log(response.val());
    });

    // API
    axios ({
      url: 'https://proxy.hackeryou.com',

      responseType: '',

      // paramsSerializer allows us to pass query params into axios call
      paramsSerializer: function (params) {
        return Qs.stringify(params, {arrayFormat: 'brackets'})
      },

      params: {
        reqUrl: "https://www.goodreads.com/search/index.xml",
        
        params : {
          key: '14csXzY0xdicnCrXfQSO1w',
          method: "search_index",
          q: "Lord of the Rings"
        },
        
        proxyHeaders: {
          'Access-Control-Allow-Origin': "https://proxy.hackeryou.com"
        }
      },

      xmlToJSON: false
    }).then((res) => {
      const bookResults = [];

      const result2 = convert.xml2js(res.data, {compact: false, spaces: 2});
      
      const condensedRes = result2.elements[0].elements[1].elements[6].elements;
    

      const newRes = [...condensedRes];
      // console.log(newRes)  // const condensedRes = result2.elements[0].elements[1].elements[6].elements[0].elements[8].elements;


      // Grab individual book information from API 
      newRes.map((book) => {

        return (
          bookResults.push({
            title: book.elements[8].elements[1].elements[0].text,

            author: book.elements[8].elements[2].elements[1].elements[0].text,

            key: book.elements[8].elements[0].elements[0].text,

            rating: book.elements[7].elements[0].text,
            
            imageUrl: book.elements[8].elements[3].elements[0].text
          })
        );
      })
    
        console.log(bookResults);

      this.setState({
        books: bookResults
      })

    })


  }


  handleFormSubmit = (e) => {
    e.preventDefault();

    axios ({
        url: 'https://proxy.hackeryou.com',

        responseType: '',

// paramsSerializer allows us to pass query params into axios call
        paramsSerializer: function (params) {
            return Qs.stringify(params, {arrayFormat: 'brackets'})
        },

        params: {
            reqUrl: "https://www.goodreads.com/search/index.xml",
        
            params : {
                key: '14csXzY0xdicnCrXfQSO1w',
                method: "search_index",
                q: this.state.searchInput,
            },
        
            proxyHeaders: {
                'Access-Control-Allow-Origin': "https://proxy.hackeryou.com"
            }
        },

        xmlToJSON: false

}).then ((res) => {
// Convert XML to JS Object
    const userSearchResults = [];

    const result3 = convert.xml2js(res.data, {compact: false, spaces: 2});
    
    const condensedRes2 = result3.elements[0].elements[1].elements[6].elements;

    
    
    const userSearchRes = [...condensedRes2];
    console.log(userSearchRes);

// Push search results into empty array
    userSearchRes.map(book => {

        return (
            userSearchResults.push({
                title: book.elements[8].elements[1].elements[0].text,

                author: book.elements[8].elements[2].elements[1].elements[0].text === undefined 
                ? "" 
                : book.elements[8].elements[2].elements[1].elements[0].text,

                key: book.elements[8].elements[0].elements[0].text,

                rating: book.elements[7].elements[0].text,

                imageUrl: book.elements[8].elements[3].elements[0].text === undefined ? "/src/assets/noCover.jpg"
                : book.elements[8].elements[3].elements[0].text,
            })
        );
    })

// Store searched books
    this.setState({
        books: userSearchResults,
    })
    console.log(userSearchResults);



    
})

// Clear search input
    this.setState({
        searchInput: " ",

    })


}
  
  

  render() {
    return (
      <div className="App">
        {/* <ul>
          {this.state.books.map((book) => {        
            return <li>{book}</li>
          })}
        </ul> */}
        {/* Firebase Setup */}
        <Header />

        <Main/>
        <Footer/>

        <SearchResults />
        

      </div>
    );
  }

}

export default App;



// SearchBar will be a grandchild component with a changing state
  // In <Main/> it will render the home page "/" with the background image
  // In <Header/> it will render on each page on the yellow background
// SearchBar will have a state that will change based on the values we pass into it on search
  // e.target.value

