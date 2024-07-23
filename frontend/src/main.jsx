import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.jsx'
import Header from './components/Header.jsx'
// import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
    <BrowserRouter>
      <Header/>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  </Provider>
)
