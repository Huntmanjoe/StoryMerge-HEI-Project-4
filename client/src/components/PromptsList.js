
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';




function PromptsList() {
    const [prompts, setPrompts] = useState([]);
    const [activePromptId, setActivePromptId] = useState(null); 
    const [entryContent, setEntryContent] = useState(''); 
    const history = useHistory();

    useEffect(() => {
        fetch('http://localhost:5555/prompts') 
            .then(response => response.json())
            .then(data => {
                setPrompts(data); 
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleCreateStoryClick = (promptId) => {
        setActivePromptId(promptId);
        setEntryContent('');
    };

    const handleEntrySubmit = (promptId) => {
        const payload = {
            prompt_id: promptId,
            title: 'placeholder title'
            // content: entryContent,
        };
        fetch('/stories', { 
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(payload),
    })
    .then(r => {
        if (r.ok) {
            r.json()
            .then(newStory => {
                fetch('/entries', {
                    method: "POST",
                    headers: {'Content-Type': 'application/json',},
                    body: JSON.stringify({
                        content: entryContent,
                        story_id: newStory.story.id
                    })
                })
                .then(rData => {
                    if (rData.ok) {
                        console.log('Story created:', newStory);
                        setActivePromptId(null);
                        setEntryContent('');
                        history.push(`/story/${newStory.story.id}`);
                    }
                });
            })
        }
    })
    // .then(data => {
    //     console.log('Story created:', data);
    //     if (!data.id) {
    //         console.error('Story ID not returned:', data);
    //         throw new Error('Story ID was not returned from the backend');
    //     }
    //     setActivePromptId(null);
    //     setEntryContent('');
    //     history.push(`/story/${data.id}`);
    // })
    .catch(error => {
        console.error('Error creating story:', error);
        alert('Failed to create the story. Please try again.'); 
    });
};

    return (
        <div style={styles.listContainer}>
            {prompts.map((prompt) => (
                <div key={prompt.id} style={styles.promptItem}>
                    <h3 style={styles.promptTitle}>{prompt.title}</h3>
                    <p style={styles.promptContent}>{prompt.content}</p>
                    <button 
                        style={styles.createStoryButton}
                        onClick={() => handleCreateStoryClick(prompt.id)}
                    >
                        Create Story
                    </button>
                    {activePromptId === prompt.id && (
                        <div style={{marginTop: '10px'}}>
                            <input
                                type="text"
                                value={entryContent}
                                onChange={(e) => setEntryContent(e.target.value)}
                                placeholder="Write your first entry!"
                                style={styles.entryInput}
                            />
                            <button 
                                style={{...styles.createStoryButton, marginLeft: '10px'}} 
                                onClick={() => handleEntrySubmit(prompt.id)}
                            >
                                Submit
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

const styles = {
    listContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        marginTop: '20px',
    },
    promptItem: {
        width: '80%',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '5px',
    },
    promptTitle: {
        fontSize: '20px',
        marginBottom: '10px',
    },
    promptContent: {
        fontSize: '16px',
        marginBottom: '20px',
    },
    createStoryButton: {
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: '#4CAF50',
        color: 'white',
    entryInput: {
            width: '100%', 
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
        },
    }
};

export default PromptsList;