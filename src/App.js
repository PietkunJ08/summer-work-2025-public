import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import { CartProvider } from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useRef, useLayoutEffect } from "react";
import styled from "styled-components";

import Home from "./pages/HomePage";
import Coffee from "./pages/Coffee";
import BakedGoods from "./pages/BakedGoods";
import CustomHamper from "./pages/CustomHamper";
import BakingLessons from "./pages/BakingLessons";
import Restaurants from "./pages/Restaurants";
import ReservationHarrogate from "./pages/ReservationHarrogate";
import ReservationLeeds from "./pages/ReservationLeeds";
import ReservationKnaresborough from "./pages/ReservationKnaresborough";
import AboutPage from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Account from "./pages/Account";
import Footer from "./components/Footer";
import Checkout from "./pages/Checkout";
import Campaign from "./pages/Campaign";
import NotFound from "./pages/NotFound";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import BgImg from "./media/images/backgrounds/home-page2.png";

const AppWrapper = styled.div`
  /* Defaults in case measurement fails */
  --nav-h: 64px;
  --footer-h: 96px;

  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const BackgroundImage = styled.div`
  background-image: url(${BgImg});
  background-size: cover;
  background-position: top;
  opacity: 0.8;
  background-attachment: fixed;
  background-repeat: no-repeat;
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
`;

const MainContent = styled.main`
  flex: 0 0 auto;
  min-height: calc(100dvh - var(--nav-h) - var(--footer-h));
  display: block; /* your pages control their own layout/centering */
`;

function App() {
  const navRef = useRef(null);
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    const setSizes = () => {
      const navH = navRef.current?.offsetHeight || 64;
      const footH = footerRef.current?.offsetHeight || 96;
      const root = document.querySelector("#app-wrapper");
      if (root) {
        root.style.setProperty("--nav-h", `${navH}px`);
        root.style.setProperty("--footer-h", `${footH}px`);
      }
    };

    setSizes();
    const roNav = new ResizeObserver(setSizes);
    const roFoot = new ResizeObserver(setSizes);
    if (navRef.current) roNav.observe(navRef.current);
    if (footerRef.current) roFoot.observe(footerRef.current);

    window.addEventListener("resize", setSizes);
    return () => {
      window.removeEventListener("resize", setSizes);
      roNav.disconnect();
      roFoot.disconnect();
    };
  }, []);

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppWrapper id="app-wrapper">
        <BackgroundImage />

        <div ref={navRef}>
          <Navbar />
        </div>

        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coffee" element={<Coffee />} />
            <Route path="/baked-goods" element={<BakedGoods />} />
            <Route path="/custom-hamper" element={<CustomHamper />} />
            <Route path="/baking-lessons" element={<BakingLessons />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/reservation-harrogate" element={<ReservationHarrogate />} />
            <Route path="/reservation-leeds" element={<ReservationLeeds />} />
            <Route path="/reservation-knaresborough" element={<ReservationKnaresborough />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/campaign" element={<Campaign />} />
              <Route path="*" element={<NotFound />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/account" element={<Account />} />
              <Route path="/signup" element={<SignUp />} />
          </Routes>
        </MainContent>

        <div ref={footerRef}>
          <Footer />
        </div>
        </AppWrapper>
          <Toaster
            position="BOTTOM-right"
            toastOptions={{
              style: {
                background: "#3f382e",
                color: "#f3e6d3",
                borderRadius: "10px",
                border: "1px solid #43533d",
              },
              success: { style: { borderColor: "#c49a6c" } },
              error:   { style: { borderColor: "#d16565" } },
            }}
          />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
