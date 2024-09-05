import { useEffect } from "react"
// import { PlaceholdersAndVanishInputDemo } from "./comp/input"
import { SparklesPreview } from "./comp/newIntro"
import AOS from "aos"
import "aos/dist/aos.css"
import MainNavbar from "./comp/Navbar"
import InputPage from "./Pages/InputPage"
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ResultPage from "./Pages/ResultPage"

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
        <MainNavbar />
        <Routes>
          <Route path='/gpa-cal/' element={
            <>
              <SparklesPreview />
              {/* <PlaceholdersAndVanishInputDemo /> */}
            </>
          } />
          <Route path="/gpa-cal/input/:inputno" element={<InputPage />} />
          <Route path="/gpa-cal/result/:result" element={<ResultPage/>} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
