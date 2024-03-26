import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext';

function UserProfile() {
    const { logout } = useAuth();
    const history = useHistory();
    const [user, setUser] = useState({ name: '', bio: '', favoriteBook: '', imageUrl: '' });

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
        if (loggedInUser) {
            setUser({
                name: loggedInUser.username,
                bio: 'Default bio',
                favoriteBook: 'Default book',
                imageUrl: 'https://via.placeholder.com/150'
            });
        }
    }, []);

    const handleLogout = () => {
        logout();
        localStorage.removeItem('currentUser');
        history.push('/login');
    };

    const handleBioChange = (event) => setUser({ ...user, bio: event.target.value });
    const handleBookChange = (event) => setUser({ ...user, favoriteBook: event.target.value });
    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setUser({ ...user, imageUrl: URL.createObjectURL(img) });
        }
    };

    if (!user.name) return <div>Loading...</div>;

    return (
        <div style={styles.container}>
            <img src={user.imageUrl} alt={user.name} style={styles.image} />
            <input type="file" onChange={handleImageChange} style={styles.fileInput} />
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
            <button onClick={handleLogout} style={styles.button}>Logout</button>
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
    fileInput: {
        margin: '10px 0',
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
    button: {
        marginTop: '20px',
        padding: '10px 20px',
        fontSize: '16px',
        color: 'white',
        backgroundColor: '#f44336',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default UserProfile;
