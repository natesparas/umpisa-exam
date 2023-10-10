import '@fortawesome/fontawesome-free'
import '@fortawesome/fontawesome-free/css/all.min.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './sb-admin-2.css'
// import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store, persistor } from './store/index.js'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* <Router>
            <App />
        </Router> */}
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </React.StrictMode>
)
