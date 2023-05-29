import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import AppMain from "./views/AppMain";
import Join from "./views/Join";

function App() {
  return (
    <div className="container-doc">
      <BrowserRouter>
        <Routes>
          {/* /main/list : booklist , /main/order_history : order history , /main/basket : basketlist */}
          <Route path="/main/*" element={<AppMain />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/join" element={<Join />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
