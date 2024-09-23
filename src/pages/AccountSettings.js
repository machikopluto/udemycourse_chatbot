import React, {useState, useEffect} from 'react';
import ImageUpload from'../components/ImageUpload';

const AccountSettings = () => {
    const [apiKey, setApiKey] = useState('');
    const [pineconeApiKey, setPineconeApiKey] =useState('');
    const [pineconeEnvironment,setPineconeEnvironment] = useState('');
    const [pineconeIndex, setPineconeIndex] = useState('');
    const [langchainApiKey, setLangchainApiKey] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [email,setEmail] = useState('');
    const [logo, setLogo] = useState(null);

    useEffect(() => {
        const storedApiKey = localStorage.getItem('apiKey');
        const storedPineconeApiKey = localStorage.getItem('pineconeApiKey');
        const storedPineconeEnvironment = localStorage.getItem('pineconeEnvironment');
        const storedPineconeIndex = localStorage.getItem('pineconeIndex');
        const storedLangchainApiKey = localStorage.getItem('langchainApiKey');
        const storedUsername = localStorage.getItem('username');
        const storedAvatar = localStorage.getItem('avatar');
        const storedEmail = localStorage.getItem('email');
        const storedLogo = localStorage.getItem('logo');

        if (storedApiKey) setApiKey(storedApiKey);
        if (storedPineconeApiKey) setPineconeApiKey(storedPineconeApiKey);
        if (storedPineconeEnvironment) setPineconeEnvironment(storedPineconeEnvironment);
        if (storedPineconeIndex) setPineconeIndex(storedPineconeIndex);
        if (storedLangchainApiKey) setLangchainApiKey(storedLangchainApiKey);
        if (storedUsername) setUsername(storedUsername);
        if (storedAvatar) setAvatar(storedAvatar);
        if (storedEmail) setEmail(storedEmail);
        if (storedLogo) setLogo(storedLogo);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('apiKey', apiKey);
        localStorage.setItem('pineconeApiKey', pineconeApiKey);
        localStorage.setItem('pineconeEnvironment',pineconeEnvironment);
        localStorage.setItem('pineconeIndex', pineconeIndex);
        localStorage.setItem('langchainApiKey', langchainApiKey);
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('email', email);
        if (avatar) localStorage.setItem('avatar', avatar);
        if (logo) localStorage.setItem('logo', logo);
        alert('設定内容は保存されました。');
    };

    const handleAvatarUpload = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatar(reader.result);
            localStorage.setItem('avatar', reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleLogoUpload = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setLogo(reader.result);
            localStorage.setItem('logo', reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div>
            <h2>設定画面</h2>
            <form onSubmit={handleSubmit}>
                <h3>APIキー</h3>
                <div>
                    <label htmlFor="apiKey">OpenAIのAPIキー</label>
                    <input
                        type="password"
                        id="apiKey"
                        placeholder="OpenAIのAPIキーを入力してください。"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="pineconeApiKey">Pinecone APIキー</label>
                    <input
                        type="password"
                        id="pineconeApiKey"
                        placeholder="PineconeのAPIキーを入力してください。"
                        value={pineconeApiKey}
                        onChange={(e) => setPineconeApiKey(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="pineconeEnvironment">Pinecone Environment</label>
                    <input
                        type="text"
                        id="pineconeEnvironment"
                        placeholder="PineconeのEnvironmentを入力してください。"
                        value={pineconeEnvironment}
                        onChange={(e) => setPineconeEnvironment(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="pineconeIndex">Pinecone Index</label>
                    <input
                        type="text"
                        id="pineconeIndex"
                        placeholder="PineconeのIndexを入力してください。"
                        value={pineconeIndex}
                        onChange={(e) => setPineconeIndex(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="langchainApiKey">LangchainAPIキー</label>
                    <input
                        type="password"
                        id="langchainApiKey"
                        placeholder="LangchainのAPIキーを入力してください。"
                        value={langchainApiKey}
                        onChange={(e) => setLangchainApiKey(e.target.value)}
                    />
                </div>

                <h3>Basic Information</h3>
                <div>
                    <label htmlFor="username">名前</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="名前を入力して下さい。"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">メールアドレス</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="メールアドレスを入力して下さい。"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">パスワード</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="パスワードを更新する場合、パスワードを入力してください。"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <h3>その他</h3>
                <div>
                    <label>アバター画像</label>
                    <ImageUpload onFileUpload={handleAvatarUpload} />
                    {avatar && <img src={avatar} alt="Avatar" style={{ width: '100px', marginTop: '10px'}} />}
                </div>
                <div>
                    <label>ロゴ</label>
                    <ImageUpload onFileUpload={handleLogoUpload} />
                    {logo && <img src={logo} alt="Logo" style={{ width: '100px', marginTop: '10px'}} />}
                </div>
                <button type="submit">保存</button>
            </form>
        </div>
    )
}

export default AccountSettings;