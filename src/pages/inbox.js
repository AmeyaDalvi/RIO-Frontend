import { useEffect, useRef } from "react";
import Talk from "talkjs";
import { useRouter } from "next/router";
import styles from "styles/userchat.module.css";
import { Box, Button, IconButton, Avatar } from "@mui/material";
import { Chat as ChatIcon, People } from "@mui/icons-material";

const admin = JSON.stringify({
  id: 17,
  name: "admin",
  welcomeMessage: "Hi! This is the admin!",
  role: "default",
});

function initInbox(currentUser, otherUser, chatboxEl) {
  Talk.ready
    .then(() => {
      const currentUserObject = currentUser ? JSON.parse(currentUser) : null;
      const otherUserObject = otherUser ? JSON.parse(otherUser) : null;

      if (!currentUserObject) {
        console.log("Missing user information");
        return;
      }

      const currentUserTalkJS = new Talk.User(currentUserObject);
      const otherUserTalkJS = new Talk.User(otherUserObject);

      const session = new Talk.Session({
        appId: process.env.NEXT_PUBLIC_TALKJS_APP_ID,
        me: currentUserTalkJS,
      });

      // session.getOrCreateConversation(currentUser.id, otherUser).then(conversation => {
      //   console.log("CONNN ", conversation);
      //   // Initialize the TalkJS Inbox component with the conversation
      //   const inbox = session.createInbox({
      //     selected: conversation,
      //     onChatStarted: (id) => {
      //       console.log(`Chat started with conversation ID: ${id}`);
      //     },
      //   });

      //   // Mount the TalkJS Inbox component
      //   inbox.mount(inboxEl.current);
      // });

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
export default function Inbox() {
  const chatboxEl = useRef();
  const router = useRouter();
  const { currentUser, otherUser } = router.query;
  let userInCookie = Cookies.get("rioUser");
  userInCookie = userInCookie !== undefined ? JSON.parse(userInCookie) : null;
  const tokenInCookie = Cookies.get("rioUserToken");

  useEffect(() => {
    Talk.ready
      .then(() => {
        initInbox(currentUser, otherUser, chatboxEl);
      })
      .catch((error) => {
        console.error(error instanceof Error ? error : new Error(error));
      });
  }, [currentUser, otherUser, chatboxEl]);

  return (
    <div className={styles.container}>
      <div ref={chatboxEl} style={{ width: "100%", height: "80%" }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
        }}
      >
        {userInCookie &&
          userInCookie["first_name"] !== "admin" &&
          userInCookie["last_name"] !== "admin" && (
            <IconButton
              onClick={() => initInbox(currentUser, admin, chatboxEl)}
            >
              <People />
            </IconButton>
          )}

        <IconButton
          onClick={() => initInbox(currentUser, otherUser, chatboxEl)}
        >
          <People />
        </IconButton>
      </Box>
    </div>
  );
}
