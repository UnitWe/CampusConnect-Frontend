'use client'
import React from 'react';
import * as dotenv from 'dotenv';
import { useRouter, usePathname } from 'next/navigation';
import Perfil from '@/components/perfil/perfil';
import useFetch from '../../components/hooks/useFetch'
import Header from '@/components/header';
import verifyJwtToken from '@/components/hooks/verifyJwtToken';


dotenv.config()

export default function Page() {
    const pathname = usePathname()
    const encodedPath = pathname.replace('%20', ' ');
    const parts = encodedPath.substring(1).split('/');
    const username = parts[0];
    const url = `${process.env.BLOG_SERVICE}/post/${user}`
    const [user, setUser] = React.useState(null)
    const [token, setToken] = React.useState(null)


    useEffect(() => {
        const token_value = localStorage.getItem('token')

        if (token_value) {
            verifyToken(token_value)
        }
        fetchData()
    }, [])

    const fetchData = async () => {
        const url = 'http://localhost:5002/api/v1/user/showOneUser'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
        };

        const { response, json } = await request(url, options);

        if (response.ok && json !== null) {
            setUser(json)
        } else {
            console.log('usuario não existe')
        }
    }

    const verifyToken = async (token) => {
        const { decoded } = await verify(token)
        if (decoded) {
            setToken(decoded.payload.id)
        } else {
            console.log('token invalido')
        }


    }

    


    return (
        <>
            {loading ? (
                <p>Carregando...</p>
            ) : (
                <>
                    {user !== null ? (
                        <>
                            <Header />
                            <Perfil user={user} token={token ? token : null} />
                        </>
                    ) : (
                        <>
                            
                        </>
                    )}
                </>
            )}
        </>
    )
}