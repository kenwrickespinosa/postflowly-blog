import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to Login");
      }

      localStorage.setItem("token", data.token);
      navigate("/home");
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-screen relative mx-6 md:mx-36">
      <div className="absolute py-15 md:py-15">
        <Link
          to="/"
          className="flex items-center text-neutral-600 text-lg md:text-2xl"
        >
          <MdArrowBackIos />
          Back
        </Link>
      </div>
      <div className="min-h-screen flex flex-col items-center gap-8 justify-center">
        <div>
          <p className="text-2xl">Welcome</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6 w-62.5">
              <Input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-neutral-800"
              />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-neutral-800"
              />
            </div>
            <Button type="submit" className="bg-green-700 hover:bg-green-900 cursor-pointer">Log In</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
