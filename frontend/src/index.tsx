import React from 'react'
import ReactDOM from 'react-dom'
import App from 'containers/App'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './stores/reducers'
import { BrowserRouter as Router } from 'react-router-dom'
import './styles/index.css'

const store = createStore(rootReducer)

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Provider store={store}>
                <App />
            </Provider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
)
