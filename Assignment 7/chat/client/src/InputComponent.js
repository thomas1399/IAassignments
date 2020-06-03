

import React, { useState } from "react";
export default function InputComponent({ send, buttonText }) {
    const [text, setText] = useState('');
    const handleChange = (e) => {
        setText(e.target.value);
    };
    const handleSubmit = (e) => {
        send(text);
        setText('');
        e.preventDefault();
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input className="form-control" type="text" value={text} onChange={handleChange} required="true"/>
                <button className="btn btn-primary">{buttonText}</button>
            </div>
            
        </form>
    )
}