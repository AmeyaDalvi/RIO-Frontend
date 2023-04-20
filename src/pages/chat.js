import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Talk from 'talkjs';
import styles from "styles/userchat.module.css";

export default function Chat() {
  const chatboxEl = useRef();
  const router = useRouter();

  const { currentUser, otherUser } = router.query;

  useEffect(() => {
    console.log('currentUser:', currentUser);
    console.log('otherUser:', otherUser);

    Talk.ready.then(() => {
      const currentUserObject = JSON.parse(currentUser);
      const otherUserObject = JSON.parse(otherUser);

      console.log('currentUserObject:', currentUserObject);
      console.log('otherUserObject:', otherUserObject);

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

      console.log('chatbox:', chatbox);
      console.log('conversation:', conversation);

      chatbox.mount(chatboxEl.current);
    });
  }, [currentUser, otherUser]);

  return (
    <div className={styles.container}>
      <div ref={chatboxEl} style={{ width: '100%', height: '80%' }} />
    </div>
  );
}