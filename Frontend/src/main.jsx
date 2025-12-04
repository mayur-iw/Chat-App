import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import route from './routes/index.jsx'
import { Provider } from "react-redux";
import { store } from './redux/Store.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={route} >
      <App />
    </RouterProvider>
    </Provider>
  </StrictMode>,
)
