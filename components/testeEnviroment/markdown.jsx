import React from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from 'remark-breaks'
import remarkHtml from 'remark-html'
import rehypeRaw from 'rehype-raw';


const content = `

<div style="text-align: center; padding-bottom: 30px;">
oi
</div>
<img src="https://avatars.githubusercontent.com/u/79272572?s=400&u=933dd9adfd065e6b3c5f84546d8aab6bc06e0c80&v=4"/>

<table style="border-collapse: collapse; margin: 20px auto; text-align: center; width: 80%;">
    <tr>
      <th>Nível de Cache</th>
      <th>Capacidade</th>
      <th>Velocidade</th>
    </tr>
    <tr>
      <td>L1 Cache</td>
      <td>32KB</td>
      <td>Muito rápida</td>
    </tr>
    <tr>
      <td>L2 Cache</td>
      <td>256KB</td>
      <td>Rápida</td>
    </tr>
    <tr>
      <td>L3 Cache</td>
      <td>4MB</td>
      <td>Mais lenta</td>
    </tr>
  </table>
`

export default function testMarkdown() {
    return (
        <>
           <ReactMarkdown linkTarget="_blank" className="prose prose-invert mb-10 max-w-full" remarkPlugins={[remarkGfm, remarkBreaks, remarkHtml]} rehypePlugins={[rehypeRaw]}>
                {content ? content : ''}    
            </ReactMarkdown>
        </>

    )
}