import React from 'react';

const MapThroughLi = ({fbList}) => { 
        
    {fbList.map(book => {
            
        return(

            <li>{book.title}</li>
        )
        
    })}
       
}





export default MapThroughLi;

{/* <ul>
<li>{list.books[0].title}</li>
</ul> */}
