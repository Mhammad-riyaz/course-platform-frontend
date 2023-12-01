import Button from '@mui/material/Button'
import './App.css'
import {Route,Routes} from 'react-router-dom'
import Auth from './pages/creds/Auth'
import { autocompleteClasses } from '@mui/material'
import { Chat } from './pages/Chat'
import {Home} from './pages/Home'
function App() {

  return(
    <div>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route   path='/home' element={<Home />} />
      </Routes>
      
    </div>
  )
}

export default App
