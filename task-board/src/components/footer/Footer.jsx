import React from 'react';

const styles ={
    backgroundColor: 'lightgray',
    height: '20px',
    width: '100%',
    position: 'fixed',
    bottom: 0
}

export function Footer(props){
    return(
    <div className="Footer" style={styles}>
    <span>Footer!</span>
    </div> );
    
}