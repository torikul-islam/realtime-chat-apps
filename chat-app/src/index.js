import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './hello';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Hello />, document.getElementById('root'));

serviceWorker.unregister();
