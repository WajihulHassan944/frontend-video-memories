"use client";
import { useSelector } from "react-redux";
import HeroSection from "./home/page";
import CookieConsent from "../../components/CookieConsent/CookieConsent";
import Home from "./upload/Home";
import React, { useEffect, useState, useMemo } from "react";
import { baseUrl } from "@/const";
import ComingSoon from "./coming-soon/ComingSoon";
import { parseDynamicTitle } from "@/utils/parseTitle";

export default function Page() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const [sections, setSections] = useState([]);
  const [isComingSoon, setIsComingSoon] = useState(false);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const res = await fetch(`${baseUrl}/pages/url/%2F`, {
          cache: "no-store",
        });

        const data = await res.json();

        if (data.success && data.pageByUrl) {
          setSections(data.pageByUrl.sections || []);

          if (typeof data.pageByUrl.isComingSoon === "boolean") {
            setIsComingSoon(data.pageByUrl.isComingSoon);
          }
        }
      } catch (err) {
        console.error("Error fetching home page data:", err);
      }
    };

    fetchPageData();
  }, []);

  const getSection = (id) => sections.find((sec) => sec.sectionId === id);

  // 🚀 HERO DATA
  const heroSection = getSection("hero");
 const parsedHeroTitle = parseDynamicTitle(heroSection?.description);
 
  return (
    <main style={{ paddingTop: "20px" }}>
      {isComingSoon ? (
        <ComingSoon />
      ) : (
        <>
          {/* HERO ONLY IF LOGGED OUT */}
          {!isLoggedIn && heroSection && (
            <HeroSection
              subtitle={heroSection.title}
              title={parsedHeroTitle}
              description={heroSection.subDescription}
            />
          )}

          <CookieConsent />
          <Home seeDifference={getSection("see-difference")}
          whyUpgrade={getSection("why-upgrade")}
          whatExpect={getSection("what-expect")}
          updates={getSection("updates")} />
        </>
      )}
    </main>
  );
}
