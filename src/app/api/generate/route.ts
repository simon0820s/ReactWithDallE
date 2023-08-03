import { NextResponse } from "next/server";
import { Configuration, OpenAIApi, ErrorResponse } from "openai";


const configuration = new Configuration({
    apiKey: process.env.API_KEY
})

const openai = new OpenAIApi(configuration)

export async function POST(request: Request) {

    let imgUrl = null

    try {
        const body = await request.json()
        console.log(body)

        const promptString = body.prompt

        if (!promptString) {
            return NextResponse.json({message: 'You need a prompt'}, {
                status: 400
            })
        }

        const aiResponse = await openai.createImage({
            prompt: promptString,
            n: 1,
            size: "512x512",
        })

        console.log(aiResponse.data.data)

        imgUrl = aiResponse.data.data

    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
        return NextResponse.json({ error: error }, {
            status: 500
        })
    }

    return NextResponse.json({ url: imgUrl[0].url }, {
        status: 200
    })
}