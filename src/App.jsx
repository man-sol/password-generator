import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {

  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState()
  const passwordRef = useRef(null)

  const copyPasswordToClipboard = useCallback(() => {

    passwordRef.current?.select()
    // passwordRef.current?.setSelectRange(0, 3)
    window.navigator.clipboard.writeText(password)

  },[password]) 

  const passwordGenterator = useCallback((length) => {
    let pass = ""
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdghjklzxcvbnm"

    if (numberAllowed) str += "0123456789"
    if (characterAllowed) str += "!@#$%^&*():<>"

    for(let i = 1; i <= length; i++){
      let char = Math.floor((Math.random() * str.length + 1))
       pass += str.charAt(char)
    }

    setPassword(pass)


  }, [length, numberAllowed,characterAllowed, setPassword])

  useEffect(() => {
    passwordGenterator(length)
  },[length, numberAllowed,characterAllowed, setPassword])


  

  return (
    <>

    <div className=' max-w-md mx-auto shadow-md rounded-lg px-4 my-8 py-6 text-orange-600 bg-gray-600'>
    <h1 className='text-white text-4xl mx-6 p-3'> Password Generator</h1>
      <div className='flex shadow-md rounded-lg overflow-hidden mb-4'>
        <input
        type='text'
        value={password}
        className='outline-none w-full py-1 px-3  rounded-xl'
        placeholder='Password'
        readOnly
        />
        <button className='outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0'
        onClick={copyPasswordToClipboard}
        >Copy</button>

        
      </div>
      <input type="range"
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e) => {setLength(e.target.value)}}
        ref={passwordRef}
         />
         <label> Length: {length}</label>
  <div className='flex'>


    <div className='px-3'>

      <label>Numbers: </label>
      <input type="checkbox"
      defaultChecked={numberAllowed}
      id='numberInput' 
      onChange={() => setNumberAllowed((prev) => !prev)}/>

    </div>
    <div className=''>
      <label>Character: </label>
      <input type="checkbox"
      defaultChecked={characterAllowed}
      id='numberInput' 
      onChange={() => setCharacterAllowed((prev) => !prev)}/>

    </div>
    </div>
    </div>
    </>
  )
}

export default App
