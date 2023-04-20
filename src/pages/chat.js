import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Talk from "talkjs";
import styles from "styles/userchat.module.css";

function initChatbox(currentUser, otherUser, chatboxEl) {
  Talk.ready
    .then(() => {
      const currentUserObject = currentUser ? JSON.parse(currentUser) : null;
      const otherUserObject = otherUser ? JSON.parse(otherUser) : null;

      if (!currentUserObject || !otherUserObject) {
        console.log("Missing user information");
        return;
      }

      const currentUserTalkJS = new Talk.User(currentUserObject);
      const otherUserTalkJS = new Talk.User(otherUserObject);

      const session = new Talk.Session({
        appId: process.env.NEXT_PUBLIC_TALKJS_APP_ID,
        me: currentUserTalkJS,
      });

      const conversation = session.getOrCreateConversation(
        Talk.oneOnOneId(currentUserTalkJS, otherUserTalkJS)
      );

      conversation.setParticipant(currentUserTalkJS);
      conversation.setParticipant(otherUserTalkJS);

      const chatbox = session.createChatbox();
      chatbox.select(conversation);
      chatbox.mount(chatboxEl.current);
    })
    .catch((error) => {
      console.error(error instanceof Error ? error : new Error(error));
    });
}

export default function Chat() {
  const chatboxEl = useRef();
  const router = useRouter();
  const { currentUser, otherUser } = router.query;

  // useEffect(() => {
  //   initChatbox(currentUser, otherUser, chatboxEl);
  //   // const timeout = setTimeout(() => {
  //   //   location.reload();
  //   // }, 1000);

  //   // return () => clearTimeout(timeout);
  // }, [currentUser, otherUser, chatboxEl]);

  useEffect(() => {
    Talk.ready
      .then(() => {
        initChatbox(currentUser, otherUser, chatboxEl);
      })
      .catch((error) => {
        console.error(error instanceof Error ? error : new Error(error));
      });
  }, [currentUser, otherUser, chatboxEl]);

  return (
    <div className={styles.container}>
      <div ref={chatboxEl} style={{ width: "100%", height: "80%" }} />
    </div>
  );
}
