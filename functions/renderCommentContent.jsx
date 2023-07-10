import React from "react";
export default function renderCommentContent(content) {


    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = content.split(urlRegex); // Divide o conteúdo em partes com base nas URLs
    return parts.map((part, index) => {
        if (part.match(urlRegex)) {
            // Se a parte corresponder à URL, renderiza como um link
            return (
                <a className=" text-blue-500 hover:underline" href={part} target="_blank" rel="noopener noreferrer" key={index}>
                    {part}
                </a>
            );
        } else {
            // Caso contrário, renderiza o texto normalmente
            return <React.Fragment key={index}>{part}</React.Fragment>;
        }
    });
}