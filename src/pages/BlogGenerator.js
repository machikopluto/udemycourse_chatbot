import React, { useState } from 'react';
import axios from 'axios';
import copyIcon from '../assets/copy-icon_gray.png';

const BlogGenerator = () => {
    const [referenceInfo, setReferenceInfo] = useState('');
    const [wordCount, setWordCount] = useState('');
    const [generatedContent, setGeneratedContent] = useState('');
    const [isCopied, setIsCopied] = useState(false);

    const handleGenerate = async () => {
        const apiKey = localStorage.getItem('apiKey');  // Retrieve API Key from local storage

        if (!apiKey) {
            alert('アカウント設定でAPIキーを設定してください。');
            return;
        }

        try {
            console.log('ブログを生成中...');
            const prompt = `${referenceInfo}というキーワードを使った${wordCount}文字のブログ文章を生成して。`;
            const response = await axios.post('http://localhost:3001/api/generate-blog', { prompt, apiKey });
            const { content } = response.data;

            console.log('Response received:', response.data);
            setGeneratedContent(content);
        } catch (error) {
            console.error('Error generating blog:', error);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedContent);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2500); // Hide "Copied" message after 2.5 seconds
    };

    return (
        <div className="blog-generator">
            <div className="input-section">
                <h2>ブログジェネレーター</h2>
                <textarea
                    placeholder="キーワードに基づいてブログを生成します。キーワードと参考情報を入力してください"
                    value={referenceInfo}
                    onChange={(e) => setReferenceInfo(e.target.value)}
                    rows="5"
                    className="input-textarea"
                />
                <div className="input-row">
                    <input
                        type="number"
                        placeholder="文字数を入力してください"
                        value={wordCount}
                        onChange={(e) => setWordCount(e.target.value)}
                        className="input-number"
                    />
                </div>
                <button onClick={handleGenerate} className="generate-button">
                    ブログを生成
                </button>
            </div>
            <div className="output-section">
                <h2>生成されたブログ</h2>
                <textarea
                    readOnly
                    value={generatedContent}
                    className="output-textarea"
                />
                <div className="copy-button" onClick={handleCopy}>
                    <img src={copyIcon} alt="コピー" className="copy-icon" />
                    {isCopied && <span className="copied-feedback">コピーしました！</span>}
                </div>
            </div>
        </div>
    );
};

export default BlogGenerator;