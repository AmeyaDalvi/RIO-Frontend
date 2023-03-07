import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const ChatEngine = dynamic(() =>
    import('react-chat-engine').then((module) => module.ChatEngine), {ssr : false}
);
// const MessageFromSocial = dynamic(() =>
//     import('react-chat-engine').then((module) => module.MessageFromSocial)
// );

export default function Chat() {
    const { username, secret } = {"username" : "dummy", "secret" : "dummy"}
    // const { username, secret } = useContext(LoginForm);
    const [showChat, setShowChat] = useState(false);
    const router = useRouter()

    useEffect(() => {
        if(typeof document !== null) {
            setShowChat(true);
        }
    });

    useEffect(() => {
        if (username.length === 0 || secret.length === 0) router.push("/");
    });

    if(!showChat) return <div/>

    return (
        <div className = "background">
            <div className = 'shadow'>
                <ChatEngine
                    height = 'calc(100ch - 200px)'
                    projectID = '220d49c0-8394-4c85-b732-a3b743f8fa33'
                    userName = "dummy"
                    userSecret = "dummy"
                    // renderNewMessageForm = {() => <MessageFromSocial/>}
                />
            </div>
        </div>
    );
}