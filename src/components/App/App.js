import { useEffect } from "react";
import { registerServiceWorker } from "../../utils/pwa";

// Components
import AppWrap from "./AppWrap";

function App() {
  useEffect(() => {
    registerServiceWorker();
  }, [])
  return (
    <AppWrap>
      <div className="App">
      </div>
    </AppWrap>
  );
}

export default App;
