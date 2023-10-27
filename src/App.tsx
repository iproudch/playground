import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ColorExample, { EColor } from "./ColorExample";
import Card from "./layouts/Card";
import ApplicationLayout from "./layouts/ApplicationLayout";
import Dashboard from "./pages/Dashboard";
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <>
      {/* <Sidebar />
      <Card>
        <Dashboard />
      </Card> */}
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<AppRoutes />} />
        </Routes>
      </BrowserRouter>
      {/* <div className="card">
        <ColorExample color={EColor.ORANGE} />
        <ColorExample color={EColor.CREAM} />
        <ColorExample color={EColor.SAGE} />
        <ColorExample color={EColor.BLACK} />
      </div> */}
    </>
  );
}

export default App;
