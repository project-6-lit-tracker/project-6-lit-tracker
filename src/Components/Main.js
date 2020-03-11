import React, { Component } from 'react';
import axios from 'axios';
import Qs from 'qs';
import { FaStar, FaTimesCircle }  from 'react-icons/fa';
import firebase from 'firebase';
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import ReactLoading from "react-loading";
const convert = require('xml-js');



class Main extends Component {

    constructor (props){

        super(props);

        this.state = {
            userBooks: [],
            searchInput: "",
            fbSearchInput: "",
            createList: [],
        // Setting state for the preloader
            done: true
        }
    }

// Firebase
componentDidMount(){
// Create a variable that holds a reference to our database
    const dbRef = firebase.database().ref();

// here we add an event listener to that variable that will fire every time there is a change in the database

// this event listener takes a callback function which we will use to get our data from the database and call it response

    dbRef.on('value', (response) => {

// here we use Firebase's .val() method to parse our database info the way we want it
      const data = response.val();

      const newState = [];
      
      for (let key in data){
          const bookInfo = {
              key: key,
              name: data[key],
          }
        
        newState.push(bookInfo);

      }
      
  // Change the Initial State
    this.setState({
        createList: newState,
        fbSearchInput: ''
    })
    console.log(newState);
    console.log(response.val());
      
    })
}

// Create List Handler
    handleFirebaseChange = (eventFb) => {
        this.setState({
            fbSearchInput: eventFb.target.value,
        })
        console.log(eventFb.target.value);
    }

// Firebase Form Submit
    handleFirebaseSubmit = (eventFb) => {
        eventFb.preventDefault();

        const dbUserList = firebase.database().ref();

        dbUserList.push(this.state.fbSearchInput);

        this.setState({
            fbSearchInput: '',
        })

    }

// Firebase Removal 
    removeList = (listTitle) => {
        const dbRef = firebase.database().ref();

        dbRef.child(listTitle).remove();
    }



// Second axios Search Handler
    handleChange = (e) => {
        this.setState({
            searchInput: e.target.value,
        })
        console.log(e.target.value);
    }


// Second axios Form Submit
    handleFormSubmit = (e) => {
        e.preventDefault();
    // Setting state for the preloader
        this.setState({
            done: false
        })
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
                    _limit: 4,
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
            
        })
    // Setting state for the preloader
        .then(() => this.setState({ done: true }));
        

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

                    <section className="search-results">
                        <h2>Search Results</h2>
                        <p>Enter your search above</p>
                        <div className="display-container">
                            {!this.state.done === true ? (<ReactLoading type={"bars"} color={"black"} className={"preloader"}/>) : (this.state.userBooks.map(book =>{
                                return (
                                    <div key={book.key} className='book-info'>

                                        <p>{book.title}</p>

                                        <span><p>{book.author} </p></span>

                                        <img src={`${book.imageUrl}`} alt={`Cover art for ${book.title}`}/>

                                        <div className="icon">

                                            <p>{book.rating}</p><FaStar />

                                        </div>

                                        <div className="book-list-container">

                                            <ul className="book-list">
                                            {this.state.createList.map(book => {
                                                return (
                                                    <li key={book.key}>
                                                        <p>Add to {book.name}</p>    
                                                    </li>  
                                                )
                                            })}
                                                {/* <li><p>Add to 2020 To-Read</p></li>
                                                <li><p>Add to list</p></li>
                                                <li><p>Add to list</p></li> */}
                                            </ul>

                                        </div>

                                    </div>

                                )
                        
                            }))}
                        </div>
                        
                    </section>

                    <section className="make-a-list">
            
                        <form action="submit" onSubmit={this.handleFirebaseSubmit}>

                            <label
                            className="sr-only"
                            htmlFor="create-list">
                            </label>

                            <input 
                            type="text" 
                            id= "create-list"
                            aria-label="Create personal book list"
                            title="Create book list"
                            required
                            value={this.state.fbSearchInput}
                            onChange={this.handleFirebaseChange}>
                            </input>

                            <button type="submit">Create List</button>

                        </form>
                        
                        <div className="placeholder">
                            <ul>
                            {/* <p>List of books will appear here.</p> */}
                                {this.state.createList.map(book => {
                                    return (
                                        <li key={book.key} className="list-title">
                                            <p>{book.name} </p>
                                            <FaTimesCircle onClick={() => {this.removeList(book.key)}}/> 
                                        </li>  
                                    )
                                })}
                            </ul>


                        </div>
                    </section>

                </div>

                <section className="goals">
                    <div className="wrapper goal-container">
                        <div className="goal-box goal1">
                            <p>Set a Goal!</p>
                            <p>How many books do you want to read this month?</p>
                            <form action="submit">

                                <label
                                className="sr-only"
                                htmlFor="set-goal">
                                </label>

                                <input 
                                type="text" 
                                id= "set-goal"
                                className="set-goal"
                                aria-label="Enter goal number of books"
                                title="Enter goal number of books"
                                required
                                // value={this.state.fbSearchInput}
                                // onChange={this.handleFirebaseChange}
                                >
                                </input>

                                <button type="submit">Enter Goal</button>

                            </form>
                        </div>
                        <div className="goal-box">
                            <p>Your goal: x# books</p>
                        </div>
                        <div className="goal-box">
                            <p>You’ve read 30%.</p>
                            <p>70% more to go!</p>
                        </div>
                    </div>
                </section>

            </main>
            
        );
    }



}

export default Main;

// Click on Add to List, title of the book will populate the placeholder in the list section