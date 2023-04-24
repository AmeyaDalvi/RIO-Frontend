import React, { useEffect } from "react";

const AlanChat = () => {
  useEffect(() => {
    const alanBtn = require("@alan-ai/alan-sdk-web");
    const alanBtnInstance = alanBtn({
      key: process.env.NEXT_PUBLIC_ALAN_AI_KEY,
      rootEl: document.getElementById("alan-btn"),
      bottom: "50px",
      right: "25px",
      zIndex: 10,
      onConnectionStatus: (status) => {
        console.log(status);
        if (status == "authorized") {
          console.clear();
        }
      },
    });
  }, []);

  return <></>;
};

export default AlanChat;
