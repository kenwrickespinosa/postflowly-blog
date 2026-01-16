import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthdate, setBirthdate] = useState(null);
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Format birthdate
  const handleFormatDate = (birthdate) => {
    if (!birthdate) return null;
    return birthdate.toISOString().split("T")[0];
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          birthdate: handleFormatDate(birthdate),
          gender,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to sign up");

      localStorage.setItem("token", data.token);
      localStorage.setItem("authUser", JSON.stringify(data.user));

      navigate("/home");

      console.log(data.token);
      console.log(data.user);
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
          <p className="text-2xl">Create account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="flex gap-2">
              {/* Firstname */}
              <Input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                placeholder="Firstname"
                className="text-neutral-800"
              />

              {/* Lastname */}
              <Input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                placeholder="Lastname"
                className="text-neutral-800"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {/* Brithdate */}
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    data-empty={!birthdate}
                    className="w-full border bg-inherit text-neutral-500 font-normal hover:bg-inherit cursor-pointer"
                  >
                    {birthdate
                      ? birthdate.toLocaleDateString()
                      : "Select Birthdate"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={birthdate}
                    captionLayout="dropdown"
                    onSelect={(birthdate) => {
                      setBirthdate(birthdate);
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>

              {/* Gender */}
              <Select value={gender} onValueChange={(g) => setGender(g)}>
                <SelectTrigger className="w-full cursor-pointer">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              {/* Email */}
              <Input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="text-neutral-800"
              />

              {/* Password  */}
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="text-neutral-800"
              />
            </div>
            <Button className="bg-green-700 cursor-pointer hover:bg-green-900">
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
