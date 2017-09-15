import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './style/left-side.css'
import './style/right-side.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()