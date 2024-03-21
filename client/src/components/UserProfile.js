import React from 'react';
import { useParams } from 'react-router-dom';

const users = [
    { id: 101, name: 'Jane Doe', bio: 'Lover of mysteries and adventures.', favoriteBook: 'The Hidden Depths', imageUrl: 'https://via.placeholder.com/150' },
    { id: 102, name: 'John Smith', bio: 'Space enthusiast and sci-fi author.', favoriteBook: 'Among the Stars', imageUrl: 'https://via.placeholder.com/150' },
    // Add more users as needed
];

function UserProfile() {
    const { userId } = useParams();
    const user = users.find(user => user.id === parseInt(userId));

    const styles = {
        container: {
            maxWidth: '700px',
            margin: '40px auto',
            padding: '20px',
            textAlign: 'center',
            backgroundColor: '#f4f4f4',
            borderRadius: '15px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        },
        image: {
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            marginTop: '-75px',
            border: '5px solid white',
        },
        name: {
            fontSize: '28px',
            color: '#333',
            margin: '20px 0 5px 0',
        },
        bio: {
            fontSize: '18px',
            color: '#666',
            marginTop: '10px',
        },
        favoriteBook: {
            fontSize: '20px',
            color: '#444',
            marginTop: '20px',
        },
    };

    if (!user) {
        return <div style={styles.container}>User not found</div>;
    }

    return (
        <div style={styles.container}>
            <img src={user.imageUrl} alt={user.name} style={styles.image} />
            <h1 style={styles.name}>{user.name}</h1>
            <p style={styles.bio}>{user.bio}</p>
            <p style={styles.favoriteBook}>Favorite Book: {user.favoriteBook}</p>
        </div>
    );
}

export default UserProfile;

