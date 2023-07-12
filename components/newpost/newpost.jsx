'use client'
import React from "react"
import Input from "../input"
import * as jose from 'jose'
import { useRouter } from "next/navigation"
import estimateReadingTime from "@/functions/estimateReadingTime"
import Select from "react-select";



export default function newpost() {
    const [title, setTitle] = React.useState('')
    const [content, setContent] = React.useState('')
    const availableTags = [
        "CyberSegurança",
        "Front",
        "Back",
        "Estrutura de dados",
        "Desenvolvimento web",
        "Mobile",
        "Inteligência Artificial",
        "Machine Learning",
        "Banco de dados",
        "Redes",
        "Segurança da Informação",
        "Cloud Computing",
        "Big Data",
        "DevOps",
        "Testes de Software",
        "UI/UX",
        "JavaScript",
        "Python",
        "Java",
        "C++",
        "Ruby",
        "PHP",
        "HTML",
        "CSS",
        "React",
        "Angular",
        "Vue.js",
        "Node.js",
        "Express.js",
        "Django",
        "Spring",
        "Git",
        "Agile",
        "Scrum",
        "Linux",
        "Windows",
        "Mobile App Development",
        "Data Science",
        "Blockchain",
        "Internet das Coisas",
        "Segurança de Aplicações",
        "Microservices",
        "Serverless",
        "Design Patterns",
        "APIs",
        "Web Scraping",
        "Chatbots",
        "Realidade Virtual",
        "Realidade Aumentada",
        "Gestão de Projetos",
        "Lógica de Programação",
        "Algoritmos",
        "Análise de Dados",
        "Visualização de Dados",
        "SQL",
        "NoSQL",
        "Firebase",
        "Amazon Web Services (AWS)",
        "Microsoft Azure",
        "Google Cloud Platform (GCP)"
      ];
    const MAX_TAGS = 3;
    const [selectedTags, setSelectedTags] = React.useState([]);
    const router = useRouter()


    React.useEffect(() => {

        const verifyToken = async (token) => {
            try {
                const EncodedSecretKey = new TextEncoder().encode('ASOKJFGALSKHGLKJSAHBGKLJSHLGKJA');
                const decoded = await jose.jwtVerify(token, EncodedSecretKey, { algorithms: ['HS256'] });
            } catch (e) {
                window.location.href = '/login';

            }

        };
        const token = localStorage.getItem('token');
        if (token) {
            verifyToken(token)
        }

    }, []);

    const handleTagChange = (selectedOptions) => {
        if (selectedOptions.length <= MAX_TAGS) {
            setSelectedTags(selectedOptions);
        }
    };
    const formatOptions = availableTags.map((tag) => ({ value: tag, label: tag }));

    const handleSubmit = async (e) => {
        e.preventDefault()
        let tags;
        if(selectedTags) {
            tags = selectedTags.map((tag)=> tag.value)
            console.log(tags)
        }
        
        const token = localStorage.getItem('token')
        const decoded = jose.decodeJwt(token)
        const author = decoded.username
        const reading_time = estimateReadingTime(content)

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_BLOG_SERVICE}/post/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content, author, reading_time, tags }),
            });

            if (response.ok) {
                const data = await response.json();
                router.push('/')

            } else {
                const errorData = await response.json();
                console.error('erro:', errorData.message);

            }
        } catch (error) {
            console.error('Um erro aconteceu durante a criação:', error);

        }

    }

    const customStyles = {
        control: (provided, state) => ({
          ...provided,
          paddingLeft: "16px",
          paddingRight: "16px",
          width: "100%",
          height: "2.75rem",
          borderRadius: "0.25rem",
          backgroundColor: "#000000",
          border: "1px solid rgba(63, 63, 70, 1)",
          outline: "none",
          boxShadow: state.isFocused ? "0 0 0 2px rgba(156, 163, 175, 1)" : "none",
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? "#000000" : state.isFocused ? "#000000" : "#000000",
          color: state.isSelected ? "#FFFFFF" : "#D1D5DB",
          ":hover": {
            backgroundColor: "rgba(63, 63, 70, 1)",
          },
        }),
        multiValue: (provided) => ({
          ...provided,
          backgroundColor: "rgba(63, 63, 70, 1)",
        }),
        multiValueLabel: (provided) => ({
          ...provided,
          color: "#D1D5DB",
        }),
        multiValueRemove: (provided) => ({
          ...provided,
          color: "#9CA3AF",
          ":hover": {
            color: "#F87171",
          },
        }),
      };


    const inputStyles = " px-4 w-full h-11 rounded bg-black border border-zinc-700 focus:outline-none focus:border-purple focus:border-2"
    return (
        <div className="mt-14 max-w-4xl m-auto py-10 px-4">
            <div className="mb-4">
                <h1 className="font-semibold text-3xl mt-4 ">Publicar novo conteúdo</h1>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input type="text" required placeholder="Título" name="title" inputStyles={inputStyles} onChange={(e) => setTitle(e.target.value)} value={title} />
                <textarea rows="12" required cols="30" placeholder="Escreva seu post aqui" style={{ resize: 'none' }} value={content} onChange={(e) => setContent(e.target.value)} className="p-4  rounded bg-black border border-zinc-700 focus:outline-none focus:border-purple focus:border-2" />
                <Select
                    isMulti
                    placeholder="Selecione até 3 tags"
                    options={formatOptions}
                    onChange={handleTagChange}
                    value={selectedTags}
                    styles={customStyles}
                />
                <div className="flex gap-3 items-center justify-end">
                    <a href="/" className="text-sm text-zinc-500/80 duration-100 px-3 py-1.5 rounded-md hover:bg-zinc-600/50">Cancelar</a>
                    <button className=" bg-green-600 text-sm px-3 py-1.5 rounded-md">Publicar</button>
                </div>
            </form>
        </div>
    )
}