'use client'
import React from "react";
export default function post({title, content, user}) {
    
    const [readingTimeMinutes, setReadingTimeMinutes] = React.useState(0)
    const estimateReadingTime = (text) => {
        const averageWordsPerMinute = 200;   
        const wordCount = text.trim().split(/\s+/).length;
        const readingTimeMinutes = Math.ceil(wordCount / averageWordsPerMinute);
        setReadingTimeMinutes(readingTimeMinutes)
      }

    React.useEffect(()=> {
        if (content) {
            estimateReadingTime(content)
        }
        
    }, [])
      

    return (
        <main className="mt-20 px-4">
            <div className="max-w-4xl m-auto mb-12">
                <div className="flex items-center gap-2 mb-2">
                    <a className=" text-blue-500 text-xs bg-blue-950 rounded-md py-0.5 px-1.5" href="#">{user}</a>
                    <span className=" text-xs text-zinc-500/80">{readingTimeMinutes} min de leitura</span>
                </div>
                
                <h1 className='text-3xl font-semibold break-words mb-4'>{title}</h1>
                <p style={{ whiteSpace: 'pre-wrap' }} className='mb-4'>{content}</p>
            </div>
        </main>
    )
}