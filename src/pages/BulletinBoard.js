import React, { useState, useRef, useEffect } from 'react';
import '../styles/styles.css';

const Editor = ({ content, setContent, onSave, onCancel }) => {
    const [localContent, setLocalContent] = useState(content);
    const textareaRef = useRef(null);

    useEffect(() => {
        setLocalContent(content);
    }, [content]);

    const handleInput = (e) => {
        const newContent = e.target.value;
        setLocalContent(newContent);
        setContent(newContent);
    };

    const handleSave = (e) => {
        e.preventDefault();
        onSave(localContent);
    };

    const handleCancel = (e) => {
        e.preventDefault();
        onCancel();
    };

    const insertTag = (tag) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const before = text.substring(0, start);
        const selection = text.substring(start, end);
        const after = text.substring(end);
        const newContent = `${before}<${tag}>${selection}</${tag}>${after}`;
        
        setLocalContent(newContent);
        setContent(newContent);

        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + tag.length + 2, end + tag.length + 2);
        }, 0);
    };

    const handleButtonClick = (tag) => {
        insertTag(tag);
    };

    return (
        <div className="editor">
            <div className="toolbar">
                <button onClick={() => handleButtonClick('h1')}>H1</button>
                <button onClick={() => handleButtonClick('h2')}>H2</button>
                <button onClick={() => handleButtonClick('h3')}>H3</button>
                <button onClick={() => handleButtonClick('b')}>Bold</button>
                <button onClick={() => handleButtonClick('i')}>Italic</button>
            </div>
            <textarea
                className="editor-content"
                ref={textareaRef}
                value={localContent}
                onChange={handleInput}
            />
            <button className="save-button" onClick={handleSave}>Save</button>
            <button className="cancel-button" onClick={handleCancel}>Cancel</button>
        </div>
    );
};

export default Editor;
