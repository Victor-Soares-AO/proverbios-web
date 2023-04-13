import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.REACT_APP_API_KEY
})

const openai = new OpenAIApi(configuration);

export const getGPTResponse = async (prompt) => {
    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${prompt}`,
        temperature: 0.6,
        max_tokens: 500,
        frequency_penalty: 0,
        presence_penalty: 0.6
    })

    if(response){
        return `${response.data.choices[0].text}`
    }
}