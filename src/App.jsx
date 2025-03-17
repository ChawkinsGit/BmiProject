import './App.css'
import { Form } from './components/Form'
import { Main } from './components/Main'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  
  return (
    <>
      <Router>
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path="/Form" element={<Form />} />
            </Routes>
        </Router>
    </>
  )
}

export default App
