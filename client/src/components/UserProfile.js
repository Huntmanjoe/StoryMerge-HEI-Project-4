import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const users = [
    { id: 101, name: 'Jane Doe', bio: 'Lover of mysteries and adventures.', favoriteBook: 'The Hidden Depths', imageUrl: 'https://via.placeholder.com/150' },
    { id: 102, name: 'John Smith', bio: 'Space enthusiast and sci-fi author.', favoriteBook: 'Among the Stars', imageUrl: 'https://via.placeholder.com/150' },
];

function UserProfile() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userIndex = users.findIndex(user => user.id === parseInt(userId));
        setUser(users[userIndex]);
    }, [userId]);

    const handleBioChange = (event) => setUser({ ...user, bio: event.target.value });
    const handleBookChange = (event) => setUser({ ...user, favoriteBook: event.target.value });

    if (!user) return <div style={styles.container}>John Doe</div>;

    return (
        <div style={styles.container}>
            <img src={user.imageUrl} alt={user.name} style={styles.image} />
            <h1 style={styles.name}>{user.name}</h1>
            <div style={styles.bio}>
                <textarea 
                    value={user.bio} 
                    onChange={handleBioChange} 
                    rows="4" 
                    style={styles.textArea}
                />
            </div>
            <div style={styles.favoriteBook}>
                <input 
                    type="text" 
                    value={user.favoriteBook} 
                    onChange={handleBookChange} 
                    style={styles.inputField}
                />
            </div>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '700px',
        margin: '40px auto',
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#ffffff',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    },
    image: {
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        marginTop: '-75px',
        border: '5px solid white',
        objectFit: 'cover',
    },
    name: {
        fontSize: '28px',
        color: '#333',
        margin: '20px 0 5px 0',
    },
    bio: {
        marginTop: '10px',
    },
    textArea: {
        width: '100%',
        padding: '10px',
        marginTop: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        resize: 'vertical',
    },
    favoriteBook: {
        marginTop: '20px',
    },
    inputField: {
        width: '100%',
        padding: '10px',
        marginTop: '10px',
        height: '40px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
};

export default UserProfile;
