// アクションタイプ
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

// アクションクリエーター
export const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user,
});

export const logout = () => ({
    type: LOGOUT,
});

// その他のアクション