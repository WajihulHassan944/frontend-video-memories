"use client";
import { useSelector } from "react-redux";
import HeroSection from "./home/page";
import CookieConsent from "../../components/CookieConsent/CookieConsent";
import Home from "./upload/Home";

export default function Page() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
  
      <main style={{paddingTop:'20px'}}>
      {!isLoggedIn && <HeroSection />
      }
      <CookieConsent />
         <Home /> 
      </main>
 
  );
}
