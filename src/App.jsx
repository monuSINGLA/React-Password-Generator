import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [copy, setCopy] = useState("Copy");
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef(null);
  


  const passwordGenrator = useCallback(() => {
    let pass = "";
    let passStr = "ABCDEFGHIJKLMNOPQRESTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) passStr += "1234567890";
    if (characterAllowed) passStr += "!@#$%&*_-/?";
    console.log(length)

    for (let i = 1; i < length; i++) {
      let randomChar = Math.floor(Math.random() * passStr.length + 1);
      pass += passStr.charAt(randomChar);
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  useEffect(() => {
    passwordGenrator();
  }, [length, characterAllowed, numberAllowed, passwordGenrator]);

  

  const handleCopyClick = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,999)    
    window.navigator.clipboard.writeText(password);

    setCopy("Copied");

    setTimeout(() => {
      setCopy("Copy");
    }, 800);
  }, [password]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-2xl rounded-md px-5 my-8 p-5 text-orange-600 bg-gray-800">
        <h1 className="text-white text-center text-2xl"> Password Genrator</h1>

        <div className="flex  rounded-md bg-red-100 overflow-hidden m-2 ">
          <input
            type="text"
            value={password}
            placeholder="Password"
            readOnly
            className="outline-none w-full  p-2 rounded-md selection:bg-red-100 "
            ref={passwordRef}
          />
          <button
            title="Copy"
            onClick={handleCopyClick}
            className="px-2 bg-blue-600 text-white opacity-85 hover:opacity-100"
          >
            {copy}
          </button>
        </div>

        <div className="flex text-sm gap-x-2 mt-4 ml-2  ">
          <div className="flex items-center gap-x-1 ">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              title="includes numbers"
              className="cursor-pointer"
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              title="includes special characters"
              className="cursor-pointer"
              type="checkbox"
              defaultChecked={characterAllowed}
              id="characterInput"
              onChange={() => {
                setCharacterAllowed((prev) => !prev);
              }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
