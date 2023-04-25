import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import Cookies from "js-cookie";
import { baseUrl } from "utils/baseUrl";

const ChatButton = ({otherUser, renter}) => {

    const router = useRouter();

    let userInCookie = Cookies.get("rioUser");
    userInCookie = userInCookie !== undefined ? JSON.parse(userInCookie) : null;
    const tokenInCookie = Cookies.get("rioUserToken");
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [currentUser, setIsUser] = useState({});
    const [otherU, setOtherU] = useState(0);

    useEffect(() => {
      checkUserInCookie();
    }, [tokenInCookie]);
    
    // useEffect(() => {
    //   setOtherUserData(otherUserId);
    //   // setOtherU({});
    // }, [])

    const checkUserInCookie = () => {
      if (tokenInCookie) {
        setIsUserLoggedIn(true);
        setIsUser(userInCookie);
      } else {
        setIsUserLoggedIn(false);
        setIsUser({});
      }
    };

    const setOtherUserData = async (otherUserId) => {
      try {
        console.log("____-__", otherUserId);
        if (otherUserId) {
        const res = await fetch(
          baseUrl + `/getuprofile?id=${otherUserId}`,{
            method:"GET",
            headers: {
              "Content-Type": "application/json",
            }
          }
        )
        if (res.status === 200) {
          const udata = await res.json();
          setOtherU(udata);
      //     setSeller({
      //       "id": udata[0]["UserID"],
      //       "name": product?.SIName,
      //       "welcomeMessage": "Hey there!",
      //       "role": "default"
      //     });
      // console.log("IMPPP - ", seller, sellerId);
        } else if (res.status === 401) {
          console.log("Unauthorized");
        }
      }
    } catch (error) {
      console.log(error);
    }
    }

    const chatBtnHandler = () => {
      console.log("ID O ",otherUser.id, " ID C ", userInCookie["user_id"]);
        router.push({
            pathname: "/chat",
            query: {
                currentUser: JSON.stringify({"id": userInCookie["user_id"],
                "name": userInCookie["first_name"] + " " + userInCookie["last_name"],
                "welcomeMessage": "Hey there!",
                "role": "default"
            }),
                otherUser: JSON.stringify(otherUser)
            },
        });
    };

    const inboxBtnHandler = () => {
      console.log("ID O ",otherUser.id, " ID C ", userInCookie["user_id"]);
        router.push({
            pathname: "/inbox",
            query: {
                currentUser: JSON.stringify({"id": userInCookie["user_id"],
                "name": userInCookie["first_name"] + " " + userInCookie["last_name"],
                "welcomeMessage": "Hey there!",
                "role": "default"
            }),
            otherUser: JSON.stringify(renter)
            },
        });
    };

    return (
        <Box>
          {userInCookie["user_id"] == otherUser.id ? (
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
            onClick={inboxBtnHandler}
            >Chat 
        </Button>
          ): (
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
          )}
            
      </Box>
    )
};

export default ChatButton;