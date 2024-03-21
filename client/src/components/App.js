import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import LoginPage from './LoginPage';
import NewPromptForm from './NewPromptForm';
import Homepage from './Homepage';
import NewEntryForm from './NewEntryForm';
import StoryList from './StoryList';
import Footer from './Footer'; // Ensure this is imported
import StoryPage from './StoryPage'; 


function App() {
    const [stories, setStories] = useState([]);

    const handleAddStory = (newStory) => {
        setStories(prevStories => [...prevStories, newStory]);
    };

    return (
        <Router>
            <div className="site-content"> {/* Wrap your content */}
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
                            <StoryList />
                        </Route>
                        <Route path="/story/:storyId" component={StoryPage} />
                        <Route exact path="/">
                            <Homepage />
                        </Route>
                      
                    </Switch>
                </div>
                <Footer /> 
            </div>
        </Router>
    );
}

export default App;
