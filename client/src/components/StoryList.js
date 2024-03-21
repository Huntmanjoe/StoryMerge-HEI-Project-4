import React from 'react';
import { Link } from 'react-router-dom';

function StoryList() {
    const stories = [
        { id: 1, title: 'The Hidden Depths', author: 'Jane Doe' },
        { id: 2, title: 'Among the Stars', author: 'John Smith' },
       
    ];

 
    const styles = {
        container: {
            maxWidth: '1200px',
            margin: '40px auto',
            padding: '20px',
            textAlign: 'center',
        },
        title: {
            fontSize: '36px',
            color: '#333',
            marginBottom: '50px',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
        },
        card: {
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            borderRadius: '10px',
            padding: '20px',
            transition: 'transform 0.2s',
        },
        cardHover: {
            transform: 'translateY(-5px)',
        },
        storyTitle: {
            fontSize: '24px',
            color: '#555',
        },
        storyAuthor: {
            fontSize: '18px',
            color: '#888',
            margin: '10px 0',
        },
        link: {
            display: 'inline-block',
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            textDecoration: 'none',
            fontSize: '16px',
        },
        linkHover: {
            backgroundColor: '#45a049',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Our Collection of Stories</h1>
            <div style={styles.grid}>
                {stories.map(story => (
                    <div key={story.id} style={styles.card}>
                        <h3 style={styles.storyTitle}>{story.title}</h3>
                        <p style={styles.storyAuthor}>by {story.author}</p>
                        <Link to={`/story/${story.id}`} style={styles.link}>Read More</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StoryList;
