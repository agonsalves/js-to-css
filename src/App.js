import beautify from 'js-beautify'
import { css } from 'glamor'
import { useEffect, useState } from "react";
import './App.css';

const App = () => {
    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')
    const [dummy, setDummy] = useState(null)

    useEffect( () => {
        if (input.length) {
            const stripped = input.replace(/(\r\n|\n|\r)/gm, "")
            const js = eval( `(${stripped})` )
            const maybe = css(js)
            setDummy(maybe)
        }
    }, [input])

    useEffect(() => {
        const element = document.querySelector('[data-glamor]').innerHTML
        setOutput(beautify.css(element))
    }, [dummy])

    return (
        <div>
        <textarea
            name="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="text"
            placeholder="input"
        />
            <textarea
                name="output"
                value={output}
                readOnly
                className="text"
                placeholder="output"
                //onClick={() => navigator.clipboard.writeText(output)}
            />
            <div className={`${dummy} dummy` }/>
        </div>
    )
}

export default App;
