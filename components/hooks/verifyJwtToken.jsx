import React from "react";
import * as jose from 'jose';

export default function verifyJwtToken() {
    const [username, setUsername] = React.useState('');
    const [error, setError] = React.useState(null);
    

    const verify = React.useCallback(async (token) => {
        let decoded = null;
        try {
            const EncodedSecretKey = new TextEncoder().encode('ASOKJFGALSKHGLKJSAHBGKLJSHLGKJA');
            decoded = await jose.jwtVerify(token, EncodedSecretKey, { algorithms: ['HS256'] });
        } catch (e) {
            setError(e);
        } 
            
        return { decoded, error }
        
    }, [])
   

    return {
        username,
        error,
        verify,
      };
};



