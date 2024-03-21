import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function NewEntryForm({ onAddStory }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        const newStory = { title, content };
        onAddStory(newStory);
        setTitle('');
        setContent('');
        history.push('/story-list');
    };

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
            resize: 'none',
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

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={styles.input}
                required
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={styles.textarea}
                required
            ></textarea>
            <button type="submit" style={styles.button}>Submit New Story</button>
        </form>
    );
}

export default NewEntryForm;
