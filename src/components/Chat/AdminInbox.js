import { useEffect, useRef, useState } from 'react';
import Talk from 'talkjs';
import { useRouter } from 'next/router';
import styles from "styles/userchat.module.css";
import { Box, Button, IconButton, Avatar, Typography } from "@mui/material";
import { Chat as ChatIcon, People } from '@mui/icons-material';

const admin = JSON.stringify({
    id: 17,
    name: "admin",
    welcomeMessage: "Hi! This is the admin!",
    role: "default"
  });

async function fetchConversations() {
    return fetch(`https://api.talkjs.com/v1/${process.env.NEXT_PUBLIC_TALKJS_APP_ID}/conversations`, {
      headers: new Headers({
        Authorization: `Bearer sk_test_fEOryySnUOs5zR1M3rGyW7wPyHjlP2a7`,
        'Content-Type': 'application/json'
      })
    })
      .then(response => response.json())
      .catch(error => console.error(error));
  }
  
  export default function AdminInbox() {
    const [conversations, setConversations] = useState([]);
  
    useEffect(() => {
      fetchConversations().then(result => {
        setConversations(result.data);
        console.log("CONERR ", result.data);
      });
    }, []);
    
    
    function initInbox(currentUser, otherUser) {
      Talk.ready.then(() => {

        console.log("ADMIN ", currentUser, " WHOO ", otherUser);
        const currentUserObject = currentUser ? JSON.parse(currentUser) : null;
        const otherUserObject = otherUser ? JSON.parse(otherUser) : null;

        
  
        if (!currentUserObject || !otherUserObject) {
          console.log('Missing user information');
          return;
        }
  
        const currentUserTalkJS = new Talk.User(currentUserObject);
        const otherUserTalkJS = new Talk.User(otherUserObject);
  
        const conversationId = Talk.oneOnOneId(currentUserTalkJS, otherUserTalkJS);
        const conversation = conversations.find(convo => convo.id === conversationId);
  
        if (!conversation) {
          console.log(`Conversation ${conversationId} not found`);
          return;
        }
  
        const session = new Talk.Session({
          appId: process.env.NEXT_PUBLIC_TALKJS_APP_ID,
          me: currentUserTalkJS,
        });
  
        const chatbox = session.createChatbox(conversation);
        chatbox.mount({ popup: true });
      }).catch(error => {
        console.error(error instanceof Error ? error : new Error(error));
      });
    }
  
    return (
      <div>
        <Typography variant="h4">Inbox</Typography>
        {conversations.map(conversation => (
          <div key={conversation.id}>
            <Typography>{conversation.subject}</Typography>
            {conversation.participants[0] == admin.id ? (
                <Button onClick={() => initInbox(admin, conversation.participants[1])}>Chat</Button>
            ) : console.log("participant 0 is admin")}
            {conversation.participants[1] == admin.id ? (
                <Button onClick={() => initInbox(admin, conversation.participants[0])}>Chat</Button>
            ) : console.log("participant 1 is admin")}
            
          </div>
        ))}
      </div>
    );
  }
  