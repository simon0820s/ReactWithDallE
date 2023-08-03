"use client"

import { useState } from "react"

export default function Page() {

  const [prompt, setPrompt] = useState('')


  return (
    <div>
      <form onSubmit={async (e) => {
        e.preventDefault()
        console.log(prompt)

        const response = await fetch('/api/generate', {
          method: 'POST',
        })
        const data = await response.json()
        console.log(data)
      }}>

        <input
          onChange={(e) => {setPrompt(e.target.value)}}
          type="text" 
          placeholder="Write your prompt" 
          className="bg-gray-950"
          value={prompt} />
        
        <button>
          Generate
        </button>
      
      </form>
    </div>
  )
}
