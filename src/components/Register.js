import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../utilites/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export default function Form() {
  // States to be used
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform login logic here
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Fname:", fname);
    console.log("Lname:", lname);
    const q = query(collection(db, "Users"), where("email", "==", email));

    if(fname === "" || fname === null || fname === " "){
      alert("Firtst Name can't be empty")
    }
    if(lname === "" || lname === null || lname === " "){
      alert("Last Name can't be empty")
    }
    
    await getDocs(q)
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          alert("User already exists! Please Login");
        } else {
          const usersRef = collection(db, "Users");
          const userId = Math.random().toString(36).substring(2);
          const userDocRef = doc(usersRef, userId);
          if (regex.test(email) && password != "") {
            
            setDoc(userDocRef, {
              uid: userId,
              email: email,
              password: password,
              lname: lname, 
              fname: fname
            })
              .then(() => {
                alert("User data successfully saved!");
              })
              .catch((error) => {
                alert("Error adding user data: ", error);
              });
        } else {
            alert("Invalid email address");
        }
        }
      })
      .catch((error) => {
        alert("Error checking user existence: ", error);
      });

      navigate("/home")
  };

  return (
    <div>
      {/* Section: Design Block */}
      <section className="text-center text-lg-start">
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n    .cascading-right {\n      margin-right: -50px;\n    }\n\n    @media (max-width: 991.98px) {\n      .cascading-right {\n        margin-right: 0;\n      }\n    }\n  ",
          }}
        />
        {/* Jumbotron */}
        <div className="container py-4">
          <div className="row g-0 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div
                className="card cascading-right"
                style={{
                  background: "hsla(0, 0%, 100%, 0.55)",
                  backdropFilter: "blur(30px)",
                }}
              >
                <div className="card-body p-5 shadow-5 text-center">
                  <h2 className="fw-bold mb-5">Sign up now</h2>
                  <form>
                    {/* 2 column grid layout with text inputs for the first and last names */}
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div data-mdb-input-init="" className="form-outline">
                          <input
                            onChange={(e) => {
                              setFname(e.target.value);
                            }}
                            type="text"
                            id="form3Example1"
                            className="form-control"
                          />
                          <label className="form-label" htmlFor="form3Example1">
                            First name
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div data-mdb-input-init="" className="form-outline">
                          <input
                            onChange={(e) => {
                              setLname(e.target.value);
                            }}
                            type="text"
                            id="form3Example2"
                            className="form-control"
                          />
                          <label className="form-label" htmlFor="form3Example2">
                            Last name
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* Email input */}
                    <div data-mdb-input-init="" className="form-outline mb-4">
                      <input
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        type="email"
                        id="form3Example3"
                        className="form-control"
                      />
                      <label className="form-label" htmlFor="form3Example3">
                        Email address
                      </label>
                    </div>
                    {/* Password input */}
                    <div data-mdb-input-init="" className="form-outline mb-4">
                      <input
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        type="password"
                        id="form3Example4"
                        className="form-control"
                      />
                      <label className="form-label" htmlFor="form3Example4">
                        Password
                      </label>
                    </div>

                    {/* Submit button */}
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      data-mdb-button-init=""
                      data-mdb-ripple-init=""
                      className="btn btn-primary btn-block mb-4"
                    >
                      Sign up
                    </button>
                    {/* Register buttons */}
                    <div className="text-center">
                      <div className="container">
                        <div className="login-ask">
                          <h4>Already a Member?</h4>
                          <Link to={"/login"}>
                            <h5>Click here to Login</h5>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-5 mb-lg-0">
              <img
                // src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
                src="../images/couple.jpg"
                className="w-100 rounded-4 shadow-4"
                alt=""
              />
            </div>
          </div>
        </div>
        {/* Jumbotron */}
      </section>
      {/* Section: Design Block */}
    </div>
  );
}
