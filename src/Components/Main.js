import React, { Component } from 'react';
import axios from 'axios';
import Qs from 'qs';
import { FaStar, FaTimesCircle, FaTimes }  from 'react-icons/fa';
import firebase from 'firebase';
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import ReactLoading from "react-loading";
const convert = require('xml-js');




class Main extends Component {

    constructor (props){

        super();
        
        this.myRef = React.createRef()
        
        this.state = {
            userBooks: [],
            // User searched books
            searchInput: "",
            // Grab user axios search value
            fbSearchInput: "",
            // Grab user Firebase search value
            createList: [],
            // User selected books for personal lists
            done: true
            // Setting state for the preloader
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
          console.log(data[key]);

          const listInfo = {
              key: key,
              name: data[key].name,
              books: data[key].books,
          }

        
        newState.push(listInfo);

      }
      
    // Change the Initial State
    this.setState({
        createList: newState,
        fbSearchInput: ''
    })
    console.log(newState.books);

    console.log(response.val());
      
    })
}

// Thank you to Sherry fir assistance here

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

        const pushListObj = {
            name: this.state.fbSearchInput,
            books: [],

        }
       
        const pushList = dbUserList.push(pushListObj);

        this.setState({
            fbSearchInput: '',
        })

    }

// Add books from API to user created lists
    addBookToList = (list, bookToAdd) => {

    
        console.log(list, bookToAdd);

        const dbUserList = firebase.database().ref(list.key);

        const bookToAddObj = {

            title: bookToAdd,
            read: false 
        }
        
        console.log(list.books);

        if (list.books === undefined){
            list.books = [];
            list.books.push(bookToAddObj);
          
            dbUserList.set(list);

        } else {

            list.books.push(bookToAddObj);
            dbUserList.set(list);
        }

    }
    

// Personal User List Removal 
    removeList = (listName) => {
        const dbRef = firebase.database().ref();

        dbRef.child(listName).remove();
    }

// Remove selected books from user lists
    // removeBook = (bookName, titleObject ) => {
    //     let bookKey;
    //     // const removeMe = bookKey[0].books[0].title;
    //     const userBook = this.state.createList;
    //     const userBookCopy = [...userBook];

    //     console.log(userBookCopy[0].books);
        
    //     for(book in userBookCopy){
    //         if (userBookCopy[book] === bookName.key){

    //         }
    //     }
    //     // console.log(removeMe);
    
    //     // const dbUserList = firebase.database().ref();

    //     // dbUserList.child(bookKey).remove();
    // }
    // Thank you to Sui and Opjot for help here
    // Gave many tries, but could not acces the nested books object. As result, the x icon beside each book is decorative. Would appreciate some feeback here, thank you.

// Second axios Search Handler
    handleChange = (e) => {
        this.setState({
            searchInput: e.target.value,
        })
       
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
            
        this.scrollToMyRef(this.myRef);
        })
    // Setting state for the preloader
        .then(() => this.setState({ done: true }));
        

    // Clear search input
        this.setState({
            searchInput: "",
        })
    }

//Function to scroll
    scrollToMyRef = () => window.scrollTo(0, this.myRef.current.offsetTop);


    render(){

        return(
            
            <main>
                <section className="landing">
                    <div className="wrapper">

                        <form className="search-form" action="submit" onSubmit={this.handleFormSubmit}>

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
                        <h2 ref={this.myRef}>Search Results</h2>
                        <p>Enter your search above</p>
                        <div className="display-container">
                                
                            {!this.state.done === true ? (<ReactLoading type={"bars"} color={"black"} className={"preloader"}/>) : (this.state.userBooks.map(book =>{
                                let currentBook = book;
                                return (
                                    <div key={book.key} className='book-info'>

                                        <p>{book.title}</p>

                                        <span><p>{book.author} </p></span>

                                        <img 
                                        src={`${book.imageUrl}`} 
                                        alt={`Cover art for ${book.title}`}/>

                                        <div className="icon">

                                            <p>{book.rating}</p><FaStar />

                                        </div>

                                        <div className="book-list-container">

                                            <ul className="book-list">
                                            {this.state.createList.map(list => {
                                                return (
                                                    <li 
                                                    key={list.key}

                                                    onClick={()=> {this.addBookToList(list, currentBook.title)}}>

                                                        <p>Add to {list.name}</p>
                                                            
                                                    </li>  
                                                )
                                                })}
                                               
                                            </ul>

                                        </div>

                                    </div>

                                )
                        
                            }))}
                        </div>
                        
                    </section>

                    <section className="make-a-list">
            
                        <form className="list-form" action="submit" onSubmit={this.handleFirebaseSubmit}>

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
                        
                        <div className="list-background">
                            <ul>
                        
 
                               
                                {this.state.createList.map(list => {
                                    
                                    return (

                                      <li key={list.key} className="list-title">
                                          <div className="list-title-icon">
                                            <h3>{list.name}</h3>
                                            <FaTimesCircle onClick={() => {this.removeList(list.key)}}/>
                                          </div>

                                          {list.books !== undefined ? 
                                          <ul>
                                              {list.books.map((book, index) => {
                                                  return (
                                                    <div className="list-title-icon">
                                                        <li key={index}>{book.title} 
                                                        </li>
                                                        <FaTimes/>
                                                    </div>
                                                  )
                                                    
                                              })}
                                          
                                          </ul>
                                        : null}

                                           

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
                            <form className="goal-form" action="submit">

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
                                value={this.state.fbSearchInput}
                                onChange={this.handleFirebaseChange}>
                                </input>

                                <button type="submit">Enter Goal</button>

                            </form>
                        </div>
                        <div className="goal-box">
                            <p>Your goal:</p>
                            <p>x# books</p>
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
// Goals

// Toggle button class w ternary between true and false 
// onClick={() => {this.removeBook(book.title)}}