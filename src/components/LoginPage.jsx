import React, { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../utilites/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setMail = (e) => {
    setEmail(e.target.value);
  };
  const setPass = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform login logic here
    console.log("Email:", email);
    console.log("Password:", password);
    const database = collection(db, "Users");
    const q = query(database, where("email", "==", email));
    const r = query(database, where("password", "==", password));

    await getDocs(q)
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const dd = querySnapshot.docs[0].data();
          if (dd.password === password) {
            alert("Password is Correct");
          } else {
            alert("incorrect Password");
          }
        } else {
          alert("User not found");
        }
      })
      .catch((error) => {
        console.error("Error checking user existence: ", error);
      }); // You can add your login logic using fetch or any other method here
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
                  <h2 className="fw-bold mb-5">Login Now</h2>
                  <form>
                    {/* 2 column grid layout with text inputs for the first and last names */}

                    {/* Email input */}
                    <div data-mdb-input-init="" className="form-outline mb-4">
                      <input
                        onChange={setMail}
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
                        onChange={setPass}
                        type="password"
                        id="form3Example4"
                        className="form-control"
                      />
                      <label className="form-label" htmlFor="form3Example4">
                        Password
                      </label>
                    </div>

                    {/* Login button */}
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      data-mdb-button-init=""
                      data-mdb-ripple-init=""
                      className="btn btn-primary btn-block mb-4"
                    >
                      Login
                    </button>
                    {/* Register buttons */}
                    <div className="text-center">
                      <h4> Don't have an account? </h4>
                      <div className="register-check">
                        <Link to={"/"} className="nostyle">
                          <h5>Click here to Register</h5>
                        </Link>
                        <Link to={"/admin"} className="mt-5 nostyle"><h5>Admin Login </h5></Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-5 mb-lg-0">
              <img
                src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
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
};

export default LoginPage;
