import React from 'react';

const StoryPage = () => {
  // Placeholder data for now
  const storyData = {
    title: "The Adventures of Sherlock Holmes",
    author: "Arthur Conan Doyle",
    originalPromptAuthor: "John H. Watson",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
      ut aliquip ex ea commodo consequat.`
  };

  const pageStyles = {
    container: {
      maxWidth: '800px',
      margin: 'auto',
      padding: '20px',
      fontFamily: 'Georgia, serif',
      lineHeight: '1.6',
      color: '#333'
    },
    title: {
      fontSize: '36px',
      fontWeight: 'bold',
      marginBottom: '10px'
    },
    author: {
      fontSize: '24px',
      fontWeight: 'normal',
      color: '#555',
      marginBottom: '20px'
    },
    originalPrompt: {
      fontSize: '18px',
      fontStyle: 'italic',
      marginBottom: '20px'
    },
    content: {
      fontSize: '20px',
      borderTop: '1px solid #eee',
      paddingTop: '20px'
    }
  };

  return (
    <div style={pageStyles.container}>
      <h1 style={pageStyles.title}>{storyData.title}</h1>
      <h2 style={pageStyles.author}>by {storyData.author}</h2>
      <p style={pageStyles.originalPrompt}>Original prompt by {storyData.originalPromptAuthor}</p>
      <div style={pageStyles.content}>
        {storyData.content}
      </div>
    </div>
  );
};

export default StoryPage;