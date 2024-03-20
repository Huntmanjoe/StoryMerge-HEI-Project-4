import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import LoginPage from './LoginPage';
// import NewPromptForm from './NewPromptForm';
import NewEntryForm from './NewEntryForm';
import StoryList from './StoryList';
import Homepage from './Homepage'; 
import Footer from './Footer';
import '../index.css'; 

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content"> 
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/story-list">
              <StoryList />
            </Route>
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