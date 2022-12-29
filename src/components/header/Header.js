import React from 'react';
import "./header.css"
export default function Head(){
    return(
        <div className = "head-container">
            <h2>Bryce's Auto Complete</h2>
            <div className='space'></div>
            <p>Project showcasing the use of a suffix tree and a responsive lookup system</p>
        </div>
    );
}