'use client'
import React from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from 'remark-breaks'
import remarkHtml from 'remark-html'


export default function Markdown() {

  


    return (

      
        
        <ReactMarkdown linkTarget="_blank" className="prose prose-invert" remarkPlugins={[remarkGfm, remarkBreaks, remarkHtml]}>
          {content ? content : ''}    
        </ReactMarkdown>
      
        

    )
}