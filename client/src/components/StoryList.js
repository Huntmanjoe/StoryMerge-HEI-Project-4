import React from 'react';
import { Link } from 'react-router-dom';

function StoryList({ prompts, onSelectPrompt }) {
    return (
        <div>
            {prompts.map(prompt => (
                <div key={prompt.id}>
                    <h3>{prompt.title}</h3>
                    <p>{prompt.description}</p>
                    <button onClick={() => onSelectPrompt(prompt)}>View Entries</button>
                </div>
            ))}
        </div>
    );
}

export default StoryList;
