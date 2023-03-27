import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import Policy from "./pages/Policy";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/policy" element={<Policy/>}/>
        <Route path="*" element={<PageNotFound/>}/> {/*if any other page is requested we will dislpay page not found*/}  
      </Routes>
    </>
  );
}

export default App;