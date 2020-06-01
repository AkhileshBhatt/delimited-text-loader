import React, { useState } from 'react';
import './App.css';
import Table from './Components/Table/Table';
import MyDropzone from './Components/DragbaleZone/Dragable';

function App() {
  const [textDisbaled, setTextDisbaled] = useState(true);
  return (
    <div className='App'>
      <header className='App-header'>
        Render Dynamic Table on the basis of given 'Delimiter'
        <p>Please upload a specific delimited file first!!! </p>
      </header>
      <MyDropzone setTextDisbaled={setTextDisbaled} />
      <hr />
      <Table textDisbaled={textDisbaled} />
    </div>
  );
}

export default App;
