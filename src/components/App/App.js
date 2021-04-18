import React, { useState } from 'react';

// Components
import AppWrap from "./AppWrap";
import Router from "./Router";

function App() {

  return (
    <AppWrap>
      <div className="App">
        <Router />
      </div>
    </AppWrap>
  );
}

export default App;
