import { useEffect } from "react"
import { SparklesPreview } from "./comp/newIntro"
import AOS from "aos"
import "aos/dist/aos.css"
import MainNavbar from "./comp/Navbar"
import InputPage from "./Pages/InputPage"
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ResultPage from "./Pages/ResultPage"
import SmiuPage from "./Pages/SmiuPage"
import NG from "./Pages/NG"
import AG from "./Pages/AG"

function App() {

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: 'ease-in-sine',
      delay: 100
    });
    AOS.refresh();
  }, []);
  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }
  return (
    <div className="bg-black">
      <BrowserRouter>

        <ScrollToTop />
        <Routes>
          <Route path='/gpa-cal/' element={
            <>
              <MainNavbar titel="NG"/>
              <SparklesPreview titel="NG"/>
            </>
          } />
          <Route path="/gpa-cal/NG/:inputno" element={<><MainNavbar titel="NG"/><SmiuPage /></>} />
          <Route path="/gpa-cal/NG" element={<><MainNavbar titel="NG"/><NG /></>} />

          <Route path="/gpa-cal/AG/:inputno" element={<><MainNavbar titel="AG"/><InputPage /></> } />
          <Route path="/gpa-cal/AG" element={<><MainNavbar titel="AG"/><AG /></>} />

          <Route path="/gpa-cal/result/:result" element={ <><MainNavbar/><ResultPage /></>} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
