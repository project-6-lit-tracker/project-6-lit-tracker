import React, { Component } from 'react';


class SearchBar extends Component {
    constructor (props){
        super (props);

        this.state = {
            searchInput: "",
        }
    }

    handleChange = (e) => {
        this.setState({
            searchInput: e.target.value,
        })
        console.log(e.target.value);
    }
    


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
                    onChange={this.handleChange}
                    value={this.searchInput}
                    ></input>

                    <button type="submit">Search</button>

                    </form>

                </div>
        );
    }






}












export default SearchBar;