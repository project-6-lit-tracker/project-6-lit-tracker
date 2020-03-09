import React, { Component } from 'react';
// import Header from './Header';
import Footer from './Footer';

class SearchResults extends Component {
    constructor(props){
        super(props);
    }


    render(){
        return(
            <div className="second-page">
                {/* <Header /> */}
                <div className="search-results-container">

                    <div className="search-results">
                        
                        <h2>Search Results</h2>

                        <div className="book-container">
                            <div>
                            </div>

                            <div>
                            </div>

                            <div>
                            </div>

                            <div>
                            </div>
                        </div>

                    </div>

                    <div className="make-a-list">
                        <div className="to-read">
                            <h2>2020 To-Read </h2>
                        </div>
                    </div>

                </div>
                <Footer/>
            </div>
        );
    }
}












export default SearchResults;