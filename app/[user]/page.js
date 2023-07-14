'use client'
import React, {useEffect} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Perfil from '@/components/perfil/perfil';
import useFetch from '../../components/hooks/useFetch'
import Header from '@/components/header';
import verifyJwtToken from '@/components/hooks/verifyJwtToken';


export default function Page() {
    const {loading, error, request} = useFetch()
    const {verify} = verifyJwtToken()
    const pathname = usePathname()
    const encodedPath = pathname.replace('%20', ' ');
    const parts = encodedPath.substring(1).split('/');
    const username = parts[0];
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
        const url = `${process.env.NEXT_PUBLIC_ENV_USER_SERVICE}/user/${username}/show`
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { response, json } = await request(url, options);

        if (response.ok && json !== null) {
            setUser(json)
            console.log(json)
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