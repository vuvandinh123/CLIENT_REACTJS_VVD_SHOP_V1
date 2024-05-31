import { useState } from 'react';
import Cookies from 'cookies-js';
import { setCookieAuth } from '../utils';
export default function useToken() {
    const getToken = () => {

        let tokenString = Cookies.get('accessToken');
        // validate token
        if (tokenString) {
            return tokenString
        }
        return null;
    };
    const [token, setToken] = useState(getToken());
    const saveToken = ({ data, remember }) => {
        const accessToken = data.token.accessToken;
        const refreshToken = data.token.refreshToken

        const userId = data.user.id;
        setCookieAuth({ userId, accessToken, refreshToken, remember });
        // setToken(token);
    };
    return {
        setToken: saveToken,
        token
    }

}