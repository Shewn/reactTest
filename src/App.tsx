import './App.css';
import Portal from './component/login/portal'
import { BrowserRouter, Routes, Route } from "react-router-dom";
const element = <div className="App">
<div className="loginComponent">
  <Portal />
</div>
</div>;
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={element}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
