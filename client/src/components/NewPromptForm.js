import React, { useState } from 'react';

function NewPromptForm({ onAddPrompt }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const newPrompt = { title, description };
        onAddPrompt(newPrompt);
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={styles.input}
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={styles.textarea}
            ></textarea>
            <button type="submit" style={styles.button}>Add Prompt</button>
        </form>
    );
}

// Styles
const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        marginTop: '20px',
    },
    input: {
        width: '80%',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ddd',
    },
    textarea: {
        width: '80%',
        height: '150px',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        resize: 'none', // Users won't be able to resize the textarea
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: '#4CAF50',
        color: 'white',
    }
};

export default NewPromptForm;
