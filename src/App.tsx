import "./App.scss"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Page404 from "./pages/Page404/Page404"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  )
}

export default App
