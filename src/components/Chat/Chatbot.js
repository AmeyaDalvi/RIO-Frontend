import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && !window['dfMessengerLoaded']) {
      window['dfMessengerLoaded'] = true;
      const script = document.createElement('script');
      script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <df-messenger
      intent="WELCOME"
      chat-title="rio-ai"
      agent-id="a039af0d-f548-48c1-9caf-296685c723f1"
      language-code="en"
    ></df-messenger>
  );
}

export default Chatbot;
