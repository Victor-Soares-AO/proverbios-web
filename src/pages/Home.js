import { useEffect, useState } from 'react';
import { getGPTResponse } from '../utils/openia';
import '../styles/Home.styles.css';

function App() {

    const [text, setText] = useState();

    const prompt = 'Diga um proverbio em Kimbundo seguido da sua tradução em português. Formate o texto separando o proverbio e a tradução por um traço. Coloque somente o provérbio em Kimbundo entre aspas, remova as aspas da traducao em portugues.';

    const result = async () => {
        const data = await getGPTResponse(prompt);
        setText(data);
    }

    useEffect(() => {
        result();
    }, [])

    return (
        <div className="content">
            <h1 className='title'>{text}</h1>

            <button
                onClick={result}
                className='button'
            >
                Novo provérbio
            </button>
        </div>
    )
}

export default App
