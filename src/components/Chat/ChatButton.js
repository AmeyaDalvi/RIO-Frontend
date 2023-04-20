import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import Cookies from "js-cookie";

const ChatButton = ({otherUser}) => {

    const router = useRouter();

    let userInCookie = Cookies.get("rioUser");
    userInCookie = userInCookie !== undefined ? JSON.parse(userInCookie) : null;
    const tokenInCookie = Cookies.get("rioUserToken");
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [currentUser, setIsUser] = useState({});

    useEffect(() => {
      checkUserInCookie();
    }, [tokenInCookie]);

    const checkUserInCookie = () => {
      if (tokenInCookie) {
        setIsUserLoggedIn(true);
        setIsUser(userInCookie);
      } else {
        setIsUserLoggedIn(false);
        setIsUser({});
      }
    };

    const chatBtnHandler = () => {
        router.push({
            pathname: "/chat",
            query: {
                currentUser: JSON.stringify({"id": userInCookie["user_id"], "name": userInCookie["first_name"] + " " + userInCookie["last_name"]}),
                otherUser: JSON.stringify(otherUser)
            },
        });
    };

    return (
        <Box>
            <Button
                sx=
                {{
                    color: "black",
                    border: "1px solid black",
                    fontSize: "18px",
                    fontWeight: "bold",
                    ":hover": {
                        background: "black",
                        color: "white",
                    },
                    width: "80px",
                }}
                onClick={chatBtnHandler}
                >Chat
            </Button>
      </Box>
    )
};

export default ChatButton;