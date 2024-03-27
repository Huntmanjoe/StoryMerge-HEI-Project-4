import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth } from './AuthContext';

function UserProfile() {
    const { username } = useParams();
    const { logout } = useAuth();
    const history = useHistory();
    const [user, setUser] = useState({id: '', name: '', bio: '', favoriteBook: '', imageUrl: '' });
    const [validProfile, setValidProfile] = useState(true);
    const [ownProfile, setOwnProfile] = useState(false);
    const [editing, setEditing] = useState(false);

    // a better way to do all this would be to only use the form states if editing is true

    useEffect(() => {
        // okay this and check_session are running twice on page load but at least they work
        fetch('/check_profile', {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify( { username } ),
        })
        .then(r => r.json())
        .then(data => {
            if (data.exists == false) {setValidProfile(false);} 
            else {
                if (data.is_own == true) {setOwnProfile(true)}
                setUser({
                    id: data.user.id,
                    name: data.user.name,
                    bio: data.user.bio ? data.user.bio : null,
                    favoriteBook: data.user.fav_book ? data.user.fav_book : null,
                    imageUrl: 'https://via.placeholder.com/150' // unimplemented
                })
            }
        });
    }, []);

    const submitEditing = (e) => {
        fetch(`/users/${user.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json",},
            // can maybe change this at some point to just send user
            // imageUrl should be implemented before that
            body: JSON.stringify( {
                "bio": user.bio,
                "fav_book": user.favoriteBook,
            } )
        })
        setEditing(false)
    }

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

    if (!validProfile) return <div style={styles.container}><p>404: User not found</p></div>;
    if (!user.name) return <div style={styles.container}><p>Loading...</p></div>;

    if (editing) return (
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
            <button onClick={submitEditing} style={styles.buttonBlue}>Done Editing</button>
            <button onClick={handleLogout} style={styles.buttonRed}>Logout</button>
        </div>
    );

    return (
        <div style={styles.container}>
            <img src={user.imageUrl} alt={user.name} style={styles.image} />
            <h1 style={styles.name}>{user.name}</h1>
            <div style={styles.bio}>{user.bio ? user.bio : `${user.name} hasn't told us their story`}</div>
            <div style={styles.favoriteBook}>{user.favoriteBook ? user.favoriteBook : `${user.name} has no favorite book`}</div>
            {ownProfile ? <div style={{marginRight: '10px'}}>
                {/* looks weird without being offset right */}
                <button onClick={() => setEditing(true)} style={styles.buttonBlue}>Edit Profile</button>
                <button onClick={handleLogout} style={styles.buttonRed}>Logout</button>
            </div> : <></>}
            {/* include prompts and entries here */}
        </div>
    );
}

// having styles for the whole app in one file would keep us from rewriting button styles
// also im not sure how to do button:hover without actual css
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
    buttonRed: {
        marginTop: '20px',
        marginLeft: '10px',
        maringRight: '10px',
        padding: '10px 20px',
        fontSize: '16px',
        color: 'white',
        backgroundColor: '#eb3156',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    buttonBlue: {
        marginTop: '20px',
        marginLeft: '10px',
        maringRight: '10px',
        padding: '10px 20px',
        fontSize: '16px',
        color: 'white',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default UserProfile;
