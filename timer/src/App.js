import logo from './logo.svg';
import './App.css';
import {useEffect, useRef, useState,usRef} from "react"
function App() {
  const [time,setTime]=useState(0);
  const ref=useRef(null);
  const startTime=()=>{
    ref.current=setInterval(()=>{
      setTime((prev=>prev+1));
    },1000)
  }
  const stopTime=()=>{
    clearInterval(ref.current);
    setTime(0);
  }
  const pauseTime=()=>{
    clearInterval(ref.current)
  }
  const resetTime=()=>{
    setTime(0);
  }
  useEffect(()=>{

    return ()=>{
      clearInterval(ref.current)
    }
  },[])
  return (
    <div className="App">
      <h1>Time: {time}</h1>
      <div>
      <button onClick={startTime}>Start</button>
      <button onClick={pauseTime}>Pause</button>
      <button onClick={stopTime}>Stop</button>
      <button onClick={resetTime}>Reset</button>
      </div>
    </div>
  );
}

export default App;
