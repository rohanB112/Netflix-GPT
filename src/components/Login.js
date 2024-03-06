import React, { useRef } from "react";
import Header from "./Header";
import { useState } from "react";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_IMAGE } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleIsSignIn = () => {
    setIsSignInForm(!isSignInForm);
  };
  const nameFormData = useRef(null);
  const emailFormData = useRef(null);
  const passwordFormData = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleButtonClick = () => {
    const message = checkValidData(
      emailFormData.current.value,
      passwordFormData.current.value
    );
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      //Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        emailFormData.current.value,
        passwordFormData.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: nameFormData.current.value,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
            })
            .catch((error) => {
              // console.log("An error occurred");
            });

          // console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      //Sign In Logic
      signInWithEmailAndPassword(
        auth,
        emailFormData.current.value,
        passwordFormData.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          // console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={BG_IMAGE} alt="bg-image" />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="absolute w-[450px] p-12 my-24 mx-auto right-0 left-0 bg-black rounded-md bg-opacity-90 text-white"
      >
        <h1 className="text-3xl font-bold py-2">
          {isSignInForm ? "Sign In" : "Sign up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={nameFormData}
            className="p-3 my-2 w-full rounded-md bg-[#333333]"
            type="text"
            placeholder="Full Name"
          />
        )}
        <input
          ref={emailFormData}
          className="p-3 my-2 w-full rounded-md bg-[#333333]"
          type="text"
          placeholder="Email Address"
        />
        <input
          ref={passwordFormData}
          className="p-3 my-2 w-full rounded-md bg-[#333333]"
          type="password"
          placeholder="Password"
        />
        <p className="text-red-600">{errorMessage}</p>
        <button
          className="p-3 my-8 w-full rounded-md bg-red-600"
          onClick={handleButtonClick}
        >
          Sign In
        </button>
        <p className="cursor-pointer hover:underline" onClick={toggleIsSignIn}>
          {isSignInForm
            ? "New to Netflix? Sign up now."
            : "Already have an account? Sign In."}
        </p>
      </form>
    </div>
  );
};

export default Login;
