import React, { Component } from 'react';

class SearchBar extends Component {
    // constructor() {
    // super();
    // }

    render() {
        return (
            <div>
                <input type="text" placeholder="Search by title or author" name="search" />
                <button type="submit">Search</button>
            </div>
        )
    }
}

export default SearchBar;