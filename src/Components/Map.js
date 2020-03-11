import React from 'react';

const Map = () => {

    return (

        this.props.mapLi.map(list =>{
            return(

                <li>{list.books[0].title}</li>
            )
        })
        
    )


}


export default Map;
