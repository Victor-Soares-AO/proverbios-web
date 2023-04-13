import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_MODE : process.env.REACT_APP_PRO_MODE
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