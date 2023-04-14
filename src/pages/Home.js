import { useEffect, useState } from 'react';
import { getGPTResponse } from '../api/openia';
import '../styles/Home.styles.css';
import { useRef } from 'react';

function App() {

    const selectRef = useRef(null)

    const [quote, setQuote] = useState();
    const [translate, setTranslate] = useState();

    const prompt = 'Diga um proverbio em Kimbundu seguido da sua tradução em português. Formate o texto separando o proverbio e a tradução por um traço. Coloque somente o provérbio em Kimbundo entre aspas, remova as aspas da tradução em portugues.';

    const result = async () => {
        const data = await getGPTResponse(prompt);

        const aux1 = data.split('-')[0].replaceAll('"',"");
        const aux2 = data.split('-')[1].replaceAll('"',"");

        setQuote(aux1);
        setTranslate(aux2)
    }

    useEffect(() => {
        result();
    }, [])

    return (
        // <main className='container'>
        //     <nav className='menu'>
        //         <select ref={selectRef} name='languages' id='languages'>
        //             <option value='Kimbundu' >Kimbundu</option>
        //             <option value='Kikongo' >Kikongo</option>
        //             <option value='Umbundu' >Umbundu</option>
        //             <option value='Kwanhama' >Kwanhama</option>
        //         </select>
        //     </nav>

        
        <div className="content">
            <h1 className='title'>{quote}</h1>
            <p className='subtitle'>{translate}</p>

            <button
                onClick={result}
                className='button'
            >
                Novo provérbio
            </button>
        </div>

        // </main>
    )
}

export default App
