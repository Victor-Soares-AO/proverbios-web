import { useEffect, useState, useRef } from 'react';
import Skeleton from 'react-loading-skeleton'
import { getGPTResponse } from '../api/openia';
import { BiChevronDown } from 'react-icons/bi';
import '../styles/Home.styles.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaEllipsisH } from 'react-icons/fa';


function App() {
    // Proverbio e a tradução
    const [quote, setQuote] = useState('');
    const [translate, setTranslate] = useState('');

    // Idioma atual
    const selectRef = useRef(null);
    const [language, setLanguage] = useState('Kimbundu');

    // Estado do botão
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const handleSelectorChange = () => {
        const valorSelecionado = selectRef.current.value;
        setLanguage(valorSelecionado);
    };

    const prompt = `Diga um provérbio em ${language} seguido da sua tradução em português. Formate o texto separando o provérbio e a tradução por um traço. Coloque somente o provérbio em Kimbundo entre aspas, remova as aspas da tradução em português.`;

    const result = async () => {
        setButtonDisabled(true); // Desabilita o botão
        const data = await getGPTResponse(prompt);

        const aux1 = data.split('-')[0].replaceAll('"', '');
        const aux2 = data.split('-')[1].replaceAll('"', '');

        setQuote('');
        setTranslate('');

        // A cada letra digitada, o useState é atualizado com o trecho da string até aquele momento
        for (let i = 0; i <= aux1.length; i++) {
            setTimeout(() => {
                setQuote(aux1.substring(0, i));
            }, i * 50);
        }

        for (let i = 0; i <= aux2.length; i++) {
            setTimeout(() => {
                setTranslate(aux2.substring(0, i));
            }, i * 50);
        }

        setButtonDisabled(false);
    };

    useEffect(() => {
        result();
    }, [language]);

    return (
        <main className="container">
            <nav className="Menu">
                <h1 className="Logo">Provérbios</h1>

                <div className="SelectBox">
                    <select ref={selectRef} id="languages" onChange={handleSelectorChange}>
                        <option value="Kimbundu">Kimbundu</option>
                        <option value="Kikongo">Kikongo</option>
                        <option value="Umbundu">Umbundu</option>
                        <option value="Kwanhama">Kwanhama</option>
                    </select>

                    <BiChevronDown size={28} color="#888" />
                </div>
            </nav>

            <div className="content">
                {/* Adicionando o componente Skeleton */}
                {quote ? <h1 className="title">{quote}</h1> : <Skeleton width={600} height={80} />}
                {translate ? (
                    <p className="subtitle">{translate}</p>
                ) : (
                    <Skeleton count={3} width={600} height={20} />
                )}

                <button onClick={result} className="button" disabled={buttonDisabled}>
                    {buttonDisabled ? <FaEllipsisH size={12} /> : 'Novo provérbio'}
                </button>

            </div>
        </main>
    );
}

export default App;
