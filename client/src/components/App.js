import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Make sure the path is correct
import Navbar from './Navbar';
import LoginPage from './LoginPage';
import NewPromptForm from './NewPromptForm';
import Homepage from './Homepage';
import NewEntryForm from './NewEntryForm';
import StoryList from './StoryList';
import UserProfile from './UserProfile';
import Footer from './Footer';

function App() {
    const [stories, setStories] = useState([]);

    const handleAddStory = (newStory) => {
        setStories(prevStories => [...prevStories, newStory]);
    };

    // whoops, handled by authcontext
    // const [user, setUser] = useState();

    // useEffect(() => {
    //     fetch('/check_session').then(response => {
    //         if (response.ok) {
    //             response.json().then(user => setUser(user));
    //         }
    //     });
    // }, []);

    return (
        <AuthProvider> 
            <Router>
                <div className="site-content">
                    <Navbar />
                    <div className="main-content">
                        <Switch>
                            <Route path="/login">
                                <LoginPage />
                            </Route>
                            <Route path="/create-prompt">
                                <NewPromptForm />
                            </Route>
                            <Route path="/new-entry">
                                <NewEntryForm onAddStory={handleAddStory} />
                            </Route>
                            <Route path="/view-stories">
                                <StoryList stories={stories} />
                            </Route>
                            <Route path="/user/:userId">
                                <UserProfile />
                            </Route>
                            <Route exact path="/">
                                <Homepage />
                            </Route>
                        </Switch>
                    </div>
                    <Footer /> 
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
