import React, { useState } from 'react';
import './TextBox.css'

function TextBox(){
    //Att
    // State pour gérer les champs de formulaire
    const [text, setText] = useState('');

    //Fonction
    const handleSubmit = (event) => {
        event.preventDefault();
        //Comportement à coder
        console.log('post:', text);
        //MAJ BDD puis ->
    };

    return(
        <form id="input" onSubmit={handleSubmit}>
            <div>
                <textarea
                placeholder="Type here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
                />
            </div>
            <button type="submit">Post</button>
        </form>

    )
}

export default TextBox;