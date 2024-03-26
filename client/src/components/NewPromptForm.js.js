// import React, { useState } from 'react';

// function NewPromptForm({ onAddPrompt }) {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const newPrompt = { title, description };
//         onAddPrompt(newPrompt);
//         setTitle('');
//         setDescription('');
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 placeholder="Title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//             />
//             <textarea
//                 placeholder="Description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//             ></textarea>
//             <button type="submit">Add Prompt</button>
//         </form>
//     );
// }

// export default NewPromptForm;


