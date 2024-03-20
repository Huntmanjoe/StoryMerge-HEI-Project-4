import React, { useState } from 'react';

function NewEntryForm({ onAddEntry, currentPrompt }) {
    const [content, setContent] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const newEntry = { promptId: currentPrompt.id, content };
        onAddEntry(newEntry);
        setContent('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                placeholder="Your entry"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button type="submit">Submit Entry</button>
        </form>
    );
}

export default NewEntryForm;
