import { useState } from 'react'
import { ListEmployeeComponent } from './components/ListEmployeeComponent'
import { HeaderComponent } from './components/HeaderComponent'
import { FooterComponent } from './components/FooterComponent'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { EmployeeComponent } from './components/EmployeeComponent'

function App() {

  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          
            <Route path="/" element= {<ListEmployeeComponent />}/>
            <Route path="/employees" element= {<ListEmployeeComponent />} />
            <Route path="/add-employee" element= {<EmployeeComponent />} />
            <Route path="/update-employee/:id" element= {<EmployeeComponent />} />  
            
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
