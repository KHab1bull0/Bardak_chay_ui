import { useContext } from 'react'
import './App.css'
import { Context } from './components/Context'

function App() {
  const { theme } = useContext(Context)

  
  return (
    <div className={` p-4`}>
      <div className="flex justify-start items-center gap-4 mt-[10px]">

      </div>
    </div>
  )
}

export default App
