import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import LoginPage from './LoginPage';
import NewPromptForm from './NewPromptForm';
import NewEntryForm from './NewEntryForm';
import StoryList from './StoryList';
import Homepage from './Homepage'; 

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/new-prompt">
          <NewPromptForm />
        </Route>
        <Route path="/new-entry">
          <NewEntryForm />
        </Route>
        <Route path="/story-list">
          <StoryList />
        </Route>
        <Route exact path="/">
          <Homepage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
