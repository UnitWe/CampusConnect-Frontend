import React from "react";
import Input from "../input"
import useFetch from '../hooks/useFetch'
import * as jose from 'jose'
export default function Settings() {

    const url = `${process.env.NEXT_PUBLIC_ENV_USER_SERVICE}/university/`
    const [university, setUniversity] = React.useState('')
    const { loading, error, request } = useFetch()
    
    const [name, setName] = React.useState('')
    const [course, setCourse] = React.useState('')
    const [title, setTitle] = React.useState('')
    const [selectedUniversity, setSelectedUniversity] = React.useState('')
    const [endPrevisionCourse, setEndPrevisionCourse] = React.useState('')
    const [bio, setBio] = React.useState('')
    const [link, setLink] = React.useState('')
    const [userId, setUserId] = React.useState('')
    const [token, setToken] = React.useState('')

    React.useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: 'GET',
       
            };

            const { response, json } = await request(url, options);

            if (response) {
                setUniversity(json)
            }

        };

        fetchData()

        
        const verifyToken = async() => {
            const EncodedSecretKey = new TextEncoder().encode('ASOKJFGALSKHGLKJSAHBGKLJSHLGKJA');
            const decoded = await jose.jwtVerify(token_value, EncodedSecretKey, { algorithms: ['HS256'] });
            setUserId(decoded.payload.id)
        }
        const token_value = localStorage.getItem('token');
        if(token_value) {
            setToken(token_value)
            verifyToken()
        }

    }, [request]);


     const handleSubmit = async (e) => {
        e.preventDefault()

        const url = `${process.env.NEXT_PUBLIC_ENV_USER_SERVICE}/user/${userId}/update`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({ name, biograph: bio, graduation_course: course, academic_level:title, year_conclusion: endPrevisionCourse, link, university_id: selectedUniversity})
        };
        const { response, json } = await request(url, options);

            if (response.ok) {
                console.log(json)
            } 
       
    }


    const inputStyles = "px-2 h-11 rounded bg-black border border-zinc-700 focus:outline-none focus:border-purple focus:border-2"
    return (
        <div className="flex-1 rounded-xl">
            
            <form action="">
                <div className="mb-6 rounded-xl">
                    <h1 className=" text-2xl font-semibold mb-4">User</h1>
                    <div className="flex flex-col gap-1 mb-4">
                        <Input required type="text" name="name" placeholder="your real name" label="Name" value={name} onChange={(e) => setName(e.target.value)} inputStyles={inputStyles} />
                    </div>

                    <div className="flex flex-col gap-1 mb-4">
                        <label htmlFor="">Curso</label>
                        <select required
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            className="block appearance-none w-full bg-black border border-zinc-700 py-2 px-3 mt-1 rounded-md focus:outline-none focus:border-purple focus:border-2"
                                        /*</div>value={selectedOption} onChange={handleOptionChange}*/>
                            <option value="">Selecione</option>
                            <option value="Ciência da Computação">Ciência da Computação</option>
                            <option value="Sistemas para Internet">Sistemas para Internet</option>
                            <option value="Jogos Digitais">Jogos Digitais</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1 mb-4">
                        <label htmlFor="">Titulo</label>
                        <select required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="block appearance-none w-full bg-black border border-zinc-700 py-2 px-3 mt-1 rounded-md focus:outline-none focus:border-purple focus:border-2"
                                        /*</div>value={selectedOption} onChange={handleOptionChange}*/>
                            <option value="">Selecione</option>
                            <option value="Graduando">Graduando</option>
                            <option value="Graduado">Graduado</option>
                            <option value="Mestre">Mestre</option>
                            <option value="Doutor">Doutor</option>
                            <option value="Ph.d">Ph.d</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1 mb-4">
                        <label htmlFor="">Universidade</label>
                        <select required
                            className="block appearance-none w-full bg-black border border-zinc-700 py-2 px-3 mt-1 rounded-md focus:outline-none focus:border-purple focus:border-2"
                            value={selectedUniversity}
                            onChange={(e) => setSelectedUniversity(e.target.value)}
                                    >
                            <option value="">Selecione</option>
                            {
                                university && university.map((uni, index)=> {
                                    return (
                                        <option key={index} value={uni.id}>{uni.abbreviation}</option>
                                    )
                                    
                                })
                            }
                        </select>
                    </div>
                    <div className="flex flex-col gap-1 mb-4">
                        <Input required type="number" name="number" placeholder="2025" label="Previsão de conclusão do curso" value={endPrevisionCourse} onChange={(e)=> setEndPrevisionCourse(e.target.value)} inputStyles={inputStyles} />
                    </div>
                </div>

                <div className=" rounded-xl">
                    <h1 className=" text-2xl font-semibold mb-4">Basic</h1>
                    <div className="flex flex-col gap-1 mb-4">
                        <Input value={link} onChange={(e)=> setLink(e.target.value)} type="text" name="website" placeholder="https://yoursite.com" label="Website URL" inputStyles={inputStyles} />
                    </div>
                    <div className="flex flex-col gap-1 mb-4">
                        bio
                        <textarea onChange={(e)=> setBio(e.target.value)} value={bio} rows="3" cols="30" placeholder="A sort bio" style={{ resize: 'none' }} className="p-2  rounded bg-black border border-zinc-700 focus:outline-none focus:border-purple focus:border-2" />
                        0/200
                    </div>
                    <button onClick={handleSubmit} className=" bg-green-600 text-sm px-3 py-1.5 rounded-md">Salvar</button>
                </div>
            </form>


        </div>
    )

}