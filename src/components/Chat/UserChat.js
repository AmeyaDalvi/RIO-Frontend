import Talk from 'talkjs';
import { useEffect, useRef } from 'react';

/* REFERENCE CODE FOR USER CHAT */

export default function UserChat({ currentUser, otherUser }) {
    
    const chatboxEl = useRef();

    useEffect(() => {
        Talk.ready.then(() => {
            // const currentUser = new Talk.User({
            //     id: '1632',
            //     name: 'Kate Smith',
            //     email: 'katesmith@example.com',
            //     // photoUrl: 'kate.jpeg',
            //     welcomeMessage: 'Hey there!',
            //     role: 'default',
            // });
            
            // const otherUser = new Talk.User({
            //     id: '1629',
            //     name: 'Jack White',
            //     email: 'jackwhite@example.com',
            //     // photoUrl: 'jack.jpeg',
            //     welcomeMessage: 'Hi, how can I help?',
            //     role: 'default',
            // });

            const session = new Talk.Session({
                appId: process.env.NEXT_PUBLIC_TALKJS_APP_ID,
                me: currentUser,
            });

            const conversation = session.getOrCreateConversation(
                Talk.oneOnOneId(currentUser, otherUser)
            );
              
            conversation.setParticipant(currentUser);
            conversation.setParticipant(otherUser);

            const chatbox = session.createChatbox();
            chatbox.select(conversation);
            
            setTimeout(() => {
                chatbox.mount(chatboxEl.current);
            }, 1000);

        });
    }, []);

    return (

        <main>
            <div ref={chatboxEl} style={{ width: '100%', height: '400px' }} />
        </main>
        
    )
}
