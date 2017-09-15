import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import './style/left-side.scss'
import './style/right-side.scss'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()