import React from 'react';

function Footer() {
    return (
        <footer style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 50px',
            background: '#f8f9fa', 
            color: '#333', 
            borderTop: '3px solid #e7e7e7', 
            position: 'fixed', 
            left: '0',
            bottom: '0',
            width: '100%', 
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)', 
        }}>
            <div>
                © {new Date().getFullYear()} StoryMerge. All rights reserved.
            </div>
            <div>
                <a href="https://twitter.com/yourhandle" style={{color: '#333', marginRight: '20px'}}>Twitter</a>
                <a href="https://facebook.com/yourpage" style={{color: '#333', marginRight: '20px'}}>Facebook</a>
                <a href="https://instagram.com/yourhandle" style={{color: '#333'}}>Instagram</a>
            </div>
        </footer>
    );
}

export default Footer;

