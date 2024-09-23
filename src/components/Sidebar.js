import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const [user, setUser] = useState({ username: '', avatar: '' });
    const [logo, setLogo] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user')) || {};
        setUser(storedUser);
        const storedLogo = localStorage.getItem('logo');
        const storedAvatar = localStorage.getItem('avatar');
        if (storedLogo) {
            setLogo(storedLogo);
        }
        if (storedAvatar) {
            setUser(prevUser => ({ ...prevUser, avatar: storedAvatar }));
        }
    }, []);

    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <aside>
            <div className="service-name" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
                <img src={logo || '/path/to/default-logo.png'} alt="Service Logo" />
                yourAI
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/create-chatbot" className={({ isActive }) => isActive ? "active" : ""}>
                            Chatbotを作成
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/chatbots" className={({ isActive }) => isActive ? "active" : ""}>
                            Chatbotリスト
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/blog-generator" className={({ isActive }) => isActive ? "active" : ""}>
                            ブログ自動生成
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/knowledge-management" className={({ isActive }) => isActive ? "active" : ""}>
                            ナレッジ登録
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/account-settings" className={({ isActive }) => isActive ? "active" : ""}>
                            設定
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className="user-info">
                <img src={user.avatar || 'https://via.placeholder.com/40'} alt="User Avatar" />
                <div>{user.username}</div>
            </div>
        </aside>
    );
};

export default Sidebar;