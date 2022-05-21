import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import mouseController from '../.';

const App = () => {
  console.log(mouseController);
  return <div>test jquery hook</div>;
};

ReactDOM.render(<App />, document.getElementById('root'));
