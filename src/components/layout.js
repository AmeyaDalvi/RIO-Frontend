import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "components/Navbar/Navbar";
import { useInView } from "react-intersection-observer";

const layout = ({ children }) => {
  const [showSideBar, setShowSideBar] = useState(false);
  const showSideBarHandler = (value) => {
    setShowSideBar(value);
  };

  const [homeRef, homeInView] = useInView({
    threshold: 0.5,
  });

  const [aboutRef, aboutInView] = useInView({
    threshold: 0.5,
  });
  const [skillRef, skillInView] = useInView({
    threshold: 0.5,
  });
  const [qualRef, qualInView] = useInView({
    threshold: 0.5,
  });
  const [projectsRef, projectsInView] = useInView({
    threshold: 0.5,
  });
  const [contactRef, contactInView] = useInView({
    threshold: 0.5,
  });

  const activeTab = () => {
    if (homeInView) {
      return 0;
    } else if (aboutInView) {
      return 1;
    } else if (qualInView) {
      return 2;
    } else if (projectsInView) {
      return 3;
    } else if (skillInView) {
      return 4;
    } else if (contactInView) {
      return 5;
    } else {
      return -1;
    }
  };

  const router = useRouter();
  const showHeader =
    router.pathname === "/login" || router.pathname === "/signup"
      ? false
      : true;
  return (
    <>
      {showHeader && <Navbar />}
      {children}
    </>
  );
};

export default layout;
