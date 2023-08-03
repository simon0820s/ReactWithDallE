/* eslint-disable @next/next/no-img-element */
"use client"

import { use, useState } from "react"

export default function Page() {

  const [prompt, setPrompt] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [loading, setLoading] = useState(false)


  return (
    <div className="h-screen flex flex-col justify-center items-center gap-y-4">
      <h1 className="text-neutral-100 text-3xl font-bold">Dalle-2 on Next.js</h1>
      <div className="bg-zinc-900 px-4 pb-10 flex flex-col justify-center items-center gap-4 rounded-lg ">
        <form
          onSubmit={async (e) => {
            setPrompt("")
            setLoading(true)
            e.preventDefault()

            const response = await fetch('/api/generate', {
              method: 'POST',
              body: JSON.stringify({ "prompt": prompt }),
              headers: {
                "Content-Type": "application/json"
              }
            })
            const data = await response.json()
            console.log(data)
            setImgUrl(data.url)
            setLoading(false)
          }}>

          <div className="flex items-center gap-2 w-full">
            <input
              onChange={(e) => { setPrompt(e.target.value) }}
              type="text"
              placeholder="Write your prompt"
              className="bg-gray-950 rounded-md px-2 h-10 text-lg font-normal outline-none focus:shadow-sky-900 shadow-lg transition-all ease-in-out duration-500"
              value={prompt} />

            <button
              className="bg-sky-950 text-neutral-100 font-medium px-4 py-2 my-2 h-10 disabled:opacity-50 rounded-lg"
              disabled={loading}
            >
              {
                loading ? "Loading" : "Generate"
              }
            </button>
          </div>

        </form>
        {
          imgUrl && (
            <img
              src={imgUrl}
              className="w-3/4 h-3/4 rounded-md"
              alt="Generated Image" />
          )
        }
      </div>
    </div>
  )
}
