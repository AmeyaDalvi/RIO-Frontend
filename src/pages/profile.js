import { React, useContext } from "react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { baseUrl } from "utils/baseUrl";
import styles from "styles/profile.module.css"
import {Avatar, Chip} from "@mui/material";
import { useRouter } from "next/router";

const profile = () => {

    const router = useRouter();

    const [fName, setFName] = useState([]);
    const [lName, setLName] = useState([]);
    const [email, setEmail] = useState([]);
    const [profilepic, setPPic] = useState([]);
    const [contact, setContact] = useState([]);
    const [street, setStreet] = useState([]);
    const [city, setCity] = useState([]);
    const [state, setState] = useState([]);
    const [country, setCountry] = useState([]);
    const [zip, setZip] = useState([]);
    
    let userInCookie = Cookies.get("rioUser");
    userInCookie = userInCookie !== undefined ? JSON.parse(userInCookie) : null;
    const tokenInCookie = Cookies.get("rioUserToken");
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isUser, setIsUser] = useState({});

    useEffect(() => {
        checkUserInCookie();
        getAllProfileDetails();
    }, [tokenInCookie]);

    const update = async () => {
        const ucontact = document.getElementById("userContact").value;
        const ustreet = document.getElementById("userStreet").value;
        const ucity = document.getElementById("userCity").value;
        const ustate = document.getElementById("userState").value;
        const ucountry = document.getElementById("userCountry").value;
        const uzip = document.getElementById("userZip").value;

        try {
            console.log("isuser ",tokenInCookie)
            console.log("hello",  userInCookie["user_id"])
            const response = await fetch(baseUrl + "/updateprofile?id=" + userInCookie["user_id"], {
              method: "POST",
              headers: {
                "Authorization": "Bearer " + tokenInCookie,
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                emailId: userInCookie["email_id"],
                contact: ucontact,
                street: ustreet,
                city: ucity,
                state: ustate,
                country: ucountry,
                zip: uzip
                }),
            });
            if (response.status === 200) {
              const data = await response.json();
              console.log("data",data);
              router.replace("/profile");
            } else if (response.status === 401) {
              console.log("Unauthorized");
            } else if (response.status === 403) {
              console.log("Forbidden");
            }
          } catch (error) {
            console.log(error);
          }
        };

    const discard = () => {
        router.replace("/profile");
    };

    const checkUserInCookie = () => {
        console.log("tok", tokenInCookie)
        if (tokenInCookie) {
          setIsUserLoggedIn(true);
          setIsUser(userInCookie);
          console.log("cookie",userInCookie)
        } else {
          setIsUserLoggedIn(false);
          setIsUser({});
        }
    };

    const getAllProfileDetails = async () => {
        try {
            console.log("isuser ",tokenInCookie)
            console.log("hello",  userInCookie["user_id"])
            const response = await fetch(baseUrl + "/getuprofile?id=" + userInCookie["user_id"], {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + tokenInCookie,
                    "Content-Type": "application/json",
                }
              });
        
            if (response.status === 200) {
                const data = await response.json();
                console.log(data);
                setFName(data[0]["FName"]);
                setLName(data[0]["LName"]);
                setEmail(data[0]["EmailID"])
                setPPic(data[0]["ProfilePic"]);
                setContact(data[0]["Contact"]);
                setStreet(data[0]["Street"]);
                setCity(data[0]["City"]);
                setState(data[0]["State"]);
                setCountry(data[0]["Country"]);
                setZip(data[0]["Zip"]);
            } else if (response.status === 401) {
                console.log("Unauthorized");
            } else if (response.status === 403) {
                console.log("Forbidden");
            }

        } catch (error) {
            console.log(error);
        }
    };
        
    return (
        <div className={styles.container}>
            <h1>Account</h1>
            <p className={styles.subheading}>Manage your account settings</p><br/><br/>
            
            <br/><h3>Profile</h3><hr className={styles.hr}/><br/>
            <div className={styles.flex_container}>
                <Avatar id="profile-img" sx={{width:100, height:100}} src={profilepic}/><br/>
                <p id="profile-name" className={styles.profile}>{fName + " " + lName}</p>
            </div>

            <br/><br/><h3>Email Address</h3><hr className={styles.hr}/><br/>
            <div className={styles.flex_container}>
                <p id="profile-name" className={styles.profile}>{email}</p>
                <Chip label="primary" color="primary" />
            </div>

            <br/><br/><h3>Phone Numbers</h3><hr className={styles.hr}/><br/>
            <div className={styles.flex_container}>
                <input id="userContact" className={styles.input} type="text" defaultValue={contact} placeholder="Enter Mobile Number"/>
                <Chip label="primary" color="primary" />
            </div>

            <br/><br/><h3>Address</h3><hr className={styles.hr}/><br/>
            <input id="userStreet" className={styles.input} type="text" defaultValue={street} placeholder="Enter Street Address"/><br/><br/>
            
            <div className={styles.flex_container}>
            <input id="userCity" className={styles.input} type="text" defaultValue={city} placeholder="Enter City"/>
            <input id="userZip" className={styles.input} type="text" defaultValue={zip} placeholder="Enter Zip"/>
            </div><br/>

            <div className={styles.flex_container}>
            <input id="userState" className={styles.input} type="text" defaultValue={state} placeholder="Enter State"/>
            <input id="userCountry" className={styles.input} type="text" defaultValue={country} placeholder="Enter Country"/>
            </div>

            <br/><br/>
            <div className={styles.flex_container}>
            <input className={styles.save} type="button" defaultValue="Save" onClick={update}/>
            <input className={styles.discard} type="button" defaultValue="Discard" onClick={discard}/>
            </div>
            <br/><br/>
        </div>
    );
};
export default profile;