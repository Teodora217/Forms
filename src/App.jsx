import './App.css'
import ControlledFormRaw from './components/ControlledFormRaw'
import { useRef } from 'react';


function App() {
  const formRef = useRef();
  return (
    <>
      <ControlledFormRaw formRef={formRef}/>
      <button type="button" onClick={() => formRef.current.submit()}>Reset</button>
    </>
  )
}

export default App
