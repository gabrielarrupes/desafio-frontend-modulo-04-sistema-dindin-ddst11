import React from 'react'
import ReactDOM from 'react-dom/client'
import MyRoutes from '../src/routes/routes';
import '../src/css/global.css'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MyRoutes />
    </BrowserRouter>
  </React.StrictMode>,
)
