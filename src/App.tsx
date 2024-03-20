import './App.css';
import Portal from './component/login/portal'
import CallbackPage from './component/callback/callback';
import { BrowserRouter, Routes, Route } from "react-router-dom";
const element = <div className="App">
<div className="loginComponent">
  <Portal />
</div>
</div>;

const cbElement = <CallbackPage />;
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={element}></Route>
      <Route path="/callback" element={cbElement}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
