import React, { Component } from 'react';


class SearchBar extends Component {
    // constructor (){
    //     super ();
    // }


    render (){
        return ( 
                <div className="wrapper">

                    <form action="submit">

                    <label
                    className="sr-only"
                    htmlFor="search"
                    ></label>

                    <input 
                    type="search" 
                    placeholder="Search by title or author"
                    id= "search"
                    name="search"
                    aria-label="Search through site content"
                    title="Search by title or author"
                    required
                    ></input>

                    <button type="submit">Search</button>

                    </form>

                </div>
        );
    }






}












export default SearchBar;