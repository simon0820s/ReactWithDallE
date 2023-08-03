"use client"

import { useState } from "react"

export default function Page() {

  const [prompt, setPrompt] = useState('')


  return (
    <div>
      <form onSubmit={async (e) => {
        e.preventDefault()

        const response = await fetch('/api/generate', {
          method: 'POST',
          body: JSON.stringify({ "prompt": prompt }),
          headers: {
            "Content-Type": "application/json"
          }
        })
        const data = await response.json()
      }}>

        <input
          onChange={(e) => { setPrompt(e.target.value) }}
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
