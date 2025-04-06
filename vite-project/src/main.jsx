import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router } from "react-router-dom";
import App from './App.jsx'
import Tp from './Tp.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Tp></Tp> */}
    <Router>
      <App></App>
    </Router>
  </StrictMode>,
)
