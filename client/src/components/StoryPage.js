import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const StoryPage = () => {
  const { storyID } = useParams();
  const [allPromptStories, setAllPromptStories] = useState(null);
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState([ //sample entries
      { id: 1, username: 'User1', content: 'This is an amazing beginning to the story.', children: [] },
      { id: 2, username: 'User2', content: 'The plot thickens as the mystery deepens.', children: [] },
  ]);
  const [activeInputId, setActiveInputId] = useState(null);
  const [newEntryContent, setNewEntryContent] = useState('');
  const [expandedEntries, setExpandedEntries] = useState(new Set());
  const [storyData, setStoryData] = useState(null);

  useEffect(() => {
    // maybe the right way to do it should be to not refetch on a new entry but update db and state ?
    fetch(`/stories/${storyID}`, {headers: {"Content-Type": "application/json",},})
    .then(r => {if (r.ok) {
      r.json()
      .then(data => {
        console.log(data); 
        setStoryData(data); 
        setEntries(data.entries);
        fetch(`/prompts/${data.prompt.id}`)
        .then(r => {if (r.ok) {
          r.json()
          .then(promptData => {
            console.log('prompt data stories: ', promptData.stories)
            setAllPromptStories(promptData.stories)
            // this is so sloww haha
            // make sure to use the response data and not the states here
            for (let [entryI, entry] of entries.entries()) {
              if (promptData.stories) {
                for (const story of promptData.stories) {
                  if (story.id !== data.id) {
                    for (let [storyEntryI, storyEntry] of story.entries.entries()) {
                      if (storyEntry.id === entry.id && story.entries[storyEntryI+1] !== entries[entryI+1]) {
                        const newChildEntry = story.entries[storyEntryI+1];
                        const entryIndex = entries.findIndex(e => e.id === entry.id);
                        setEntries(prevEntries => {
                          const updatedEntries = [...prevEntries];
                          const existingChildren = updatedEntries[entryIndex].children || []; // in case there are no children yet
                          updatedEntries[entryIndex] = {
                            ...updatedEntries[entryIndex],
                            children: [...existingChildren, newChildEntry]
                          };
                          return updatedEntries;
                        });
                      }
                    }
                  }
                }
              }
            }
          })
        }})
      })
    }});
  }, []);

    const addReplyToEntry = (entries, parentId, reply) => {
      return entries.map(entry => {
        if (entry.id === parentId) {
          return { ...entry, children: [...entry.children, reply] };
        } else if (entry.children.length > 0) {
          return { ...entry, children: addReplyToEntry(entry.children, parentId, reply) };
        }
        return entry;
      });
    };

    const handleEntrySubmit = () => {
      if (activeInputId === null) {
        const newEntry = { id: Date.now(), username: 'PlaceholderUser', content: entry, children: [] };
        setEntries(prevEntries => [...prevEntries, newEntry]);
        setEntry('');
      } else {
        const newReply = { id: Date.now(), username: 'PlaceholderUser', content: newEntryContent, children: [] };
        const updatedEntries = addReplyToEntry(entries, activeInputId, newReply);
        setEntries(updatedEntries);
        setNewEntryContent('');
        setActiveInputId(null);
        setExpandedEntries(prev => new Set(prev).add(activeInputId));
      }
    };
    
    const handleContinueFromPoint = (id) => {
          setActiveInputId(id);
          setNewEntryContent(''); 
        };



    const toggleEntryExpansion = (id) => {
      setExpandedEntries(prevExpandedEntries => {
        const newExpandedEntries = new Set(prevExpandedEntries);
        if (newExpandedEntries.has(id)) {
          newExpandedEntries.delete(id);
        } else {
          newExpandedEntries.add(id);
        }
        return newExpandedEntries;
      });
    };

const renderEntries = (entryList, parentId = null) => {
  return entryList.map((entryData) => (
    <div key={entryData.id} style={parentId ? { ...pageStyles.entry, backgroundColor: '#e9e9e9', marginLeft: '20px' } : pageStyles.entry}>
      <strong>{entryData.user.name}:</strong> 
      {entryData.content.split("\n").map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      <div style={pageStyles.entryActions}>
        <button
          style={pageStyles.actionButton}
          onClick={() => handleContinueFromPoint(entryData.id)}
        >
          Continue from this point
        </button>
        {entryData.children?.length > 0 && (
          <button
            onClick={() => toggleEntryExpansion(entryData.id)}
            style={{...pageStyles.actionButton, marginLeft: '10px'}}
          >
            {expandedEntries.has(entryData.id) ? 'Collapse Replies' : 'Expand Replies'}
          </button>
        )}
      </div>
      {expandedEntries.has(entryData.id) && renderEntries(entryData.children, entryData.id)}
      {activeInputId === entryData.id && (
        <div style={{marginTop: '10px'}}>
          <input
            type="text"
            style={pageStyles.entryInput}
            value={newEntryContent}
            onChange={(e) => setNewEntryContent(e.target.value)}
            placeholder="Continue this story..."
          />
          <button 
            style={{...pageStyles.actionButton, marginLeft: '10px'}} 
            onClick={handleEntrySubmit}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  ));
};

  console.log('activeInputId:', activeInputId); 

  if (!storyData) return <div style={{...pageStyles.container, textAlign: 'center'}}>Oops! There is no story here</div>
  
  return (
    <div style={pageStyles.container}>
      <h1 style={pageStyles.title}>{storyData.title}</h1>
      <h2 style={pageStyles.author}>by {storyData.user.name}</h2>
      <p style={pageStyles.originalPrompt}>Original prompt by {storyData.prompt.user.name}</p>
      <div style={pageStyles.content}>
        {storyData.prompt.content}
      </div>
      <div style={pageStyles.entriesContainer}>
        {renderEntries(entries)}
      </div>
      <div style={pageStyles.submitBar}>
        <input
          type="text"
          style={pageStyles.entryInput}
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Write your entry here..."
        />
        <button style={pageStyles.submitButton} onClick={() => {
                    if (entry.trim()) {
                        setEntries([...entries, { id: Date.now(), username: 'PlaceholderUser', content: entry, children: [] }]);
                        setEntry('');
                    }
                }}>
                    Submit an Entry
        </button>
      </div>
    </div>
  );
}
export default StoryPage;

const pageStyles = {
  container: {
    maxWidth: '800px',
    margin: 'auto',
    padding: '20px',
    paddingBottom: '80px',
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
  },
  submitBar: {
      borderTop: '2px solid #333',
      paddingTop: '20px',
      marginTop: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    submitButton: {
      padding: '10px 20px',
      backgroundColor: '#007BFF',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    entryInput: {
      padding: '10px',
      width: 'calc(100% - 150px)', 
      marginRight: '10px',
    },
    entriesContainer: {
      marginTop: '20px',
    },
    entry: {
      backgroundColor: '#f7f7f7',
      padding: '10px',
      borderRadius: '5px',
      marginBottom: '10px',
    },
    entryActions: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '10px',
    },
    actionButton: {
      marginLeft: '10px',
      padding: '5px 10px',
      backgroundColor: '#007BFF',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };