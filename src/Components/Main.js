import React, { Component } from 'react';
// import SearchBar from './SearchBar';
import axios from 'axios';
import Qs from 'qs';
const convert = require('xml-js');



class Main extends Component {

    constructor (props){

        super();

        this.state = {
            userBooks: [],
            searchInput: "",
        }
    }

    handleChange = (e) => {
        this.setState({
            searchInput: e.target.value,
        })
        console.log(e.target.value);
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

                    imageUrl: book.elements[8].elements[3].elements[0].text 
                    === undefined ? "/src/assets/noCover.jpg"
                    : book.elements[8].elements[3].elements[0].text,
                    
                })
                );
            })
            
            // Store searched books
            this.setState({
                userBooks: userSearchResults,
            })
            console.log(userSearchResults);
            console.log(userSearchResults.imageUrl);
            
        })
        
   
    // Clear search input
        this.setState({
            searchInput: "",
        })

    
    }



    render(){

        return(
            
            <main>
                <section className="landing">
                    <div className="wrapper">

                        <form action="submit" onSubmit={this.handleFormSubmit}>

                            <label
                            className="sr-only"
                            htmlFor="search">
                            </label>

                            <input 
                        type="search" 
                        placeholder="Search by title or author"
                        id= "search"
                        name="search"
                        aria-label="Search through site content"
                        title="Search by title or author"
                        required
                        onChange={this.handleChange}
                        value={this.state.searchInput}>
                        </input>

                            <button type="submit">Search</button>

                        </form>

                    </div>
                </section>

                <div className="search-results-container">

                    <div className="search-results">
                        <h2>Search Results</h2>
                        {this.state.userBooks.map(book =>{
                            return (
                                <div key={book.key} className="book-info">
                                    <p>{book.title}</p>
                                    <p>{book.author} </p>
                                    <img src={`${book.imageUrl}`} alt={`Cover art for ${book.title}`}/>
                                    <p>{book.rating}</p>
                                </div>


                            )





                        })
                        
                            
                    }
                        
                    </div>


                    <div className="make-a-list">
                        <h2>2020 To-Read</h2>


                    </div>

                </div>
            </main>
            
        );
    }



}

export default Main;