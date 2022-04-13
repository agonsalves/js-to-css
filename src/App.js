import beautify from 'js-beautify'
import { css, speedy} from 'glamor'
import { useEffect, useRef, useState } from "react";
import './App.css';
import ReactMarkdown from 'react-markdown';

speedy(false)

const App = () => {
    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')
    const [dummy, setDummy] = useState(null)
    const [readMe, setReadMe] = useState('')
    const myRef = useRef()

    const readMePath = require('./README.md')

    useEffect(() => {
        myRef.current.focus()

        fetch(readMePath)
            .then(res => res.text())
            .then(text => setReadMe(text))
    }, [])

    useEffect( () => {
        if (input.length) {
            const stripped = input.trim().replace(/(\r\n|\n|\r)/gm, "")
            try {
                const finalString = stripped.charAt(0) === '{' ? stripped : `{${stripped}}`
                const js = eval( `(${finalString})` )
                const maybe = css(js)
                setDummy(maybe)
            } catch (e) {
                setOutput(e)
            }

        }
    }, [input])

    useEffect(() => {
        const element = document.querySelector('[data-glamor]').innerHTML
        setOutput(beautify.css(element))
    }, [dummy])

    return (
        <div>

            <div className="container">
                <textarea
                    name="input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="text"
                    placeholder="input (paste in full or partial JS object)"
                    onClick={() => window.location.reload()}
                    ref={myRef}
                />
                <textarea
                    name="output"
                    value={output}
                    readOnly
                    className="text"
                    placeholder="output"
                    onMouseUp={() => navigator.clipboard.writeText(document.getSelection().toString())}
                />
                <div>
                    <ReactMarkdown>{readMe}</ReactMarkdown>
                </div>
                <div className={`${dummy} dummy` }/>
            </div>
        </div>
    )
}

export default App;
