"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { BiSolidLockAlt } from "react-icons/bi";
import { MdAlternateEmail } from "react-icons/md";
import { toast } from "react-toastify";
import Image from "next/image";

const inputStyle =
  "text-sm bg-transparent w-full focus:outline-none text-[#000]";
const labelStyle =
  "font-medium text-sm text-black w-full text-left leading-[18px] pb-[18px]";
const inputGroupStyle =
  "rounded-[50px] p-4 h-[52px] border border-borderIndlay flex flex-row items-between justify-center gap-5 bg-white w-full";

const InputField = ({ label, id, type = "text", onChange, colSpan, icon }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center w-full col-span-${colSpan}`}
    >
      <label htmlFor={id} className={labelStyle}>
        {label}:
      </label>
      <div className={inputGroupStyle}>
        <span className="text-indlay">{icon}</span>
        <input
          name={id}
          id={id}
          type={type}
          placeholder={`Enter ${label}`}
          className={inputStyle}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default function Page() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        toast.error("Please fill in all fields");
        return;
      }
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/login`,
        {
          email: email?.toLowerCase(),
          password,
        }
      );
      if (res.data.token) {
        // Set token in an httpOnly cookie via an API route
        localStorage.setItem("token", res.data.token);
        router.push("/"); // Redirect to a protected route
      }
    } catch (error) {
      toast.error("Login failed: " + error.message);
      console.error("Login failed:", error);
    }
  };
  return (
    <div className="bg-bgIndlay w-full min-h-screen grid grid-cols-2 px-10 py-5">
      <div className="col-span-1">
        <div className="h-[100px] w-full">
          <Image
            src="/images/logo.png"
            width={118}
            height={48}
            alt={"Indlay"}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="font-youth font-medium text-[32px] text-center">
            Welcome back
          </h2>
          <h6 className="font-banana font-normal text-base text-center text-indlay">
            {"Don't have an account ? "}
            <Link href="/register" className="font-medium text-cta">
              Sign up
            </Link>
          </h6>
          <form
            onSubmit={handleLogin}
            className="grid grid-cols-2 gap-5 w-full my-14"
          >
            <InputField
              label={"Email"}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              colSpan={2}
              icon={<MdAlternateEmail />}
            />
            <InputField
              label={"Password"}
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              colSpan={2}
              icon={<BiSolidLockAlt />}
            />
            <br />
            <button
              type="submit"
              className="flex items-center justify-center bg-ctaDarker border border-ctaDarker rounded-[70px] text-white font-banana font-medium h-[56px] w-full col-span-2"
            >
              Create account &nbsp;&nbsp;&nbsp;
              <FaArrowRightLong />
            </button>
            <div className="text-center col-span-2">
              <span className="text-indlay text-sm font-normal font-banana">
                By signing in you agree to our
              </span>
              <br />
              <Link
                href="/terms-conditions"
                className="text-ctaDarker text-sm font-medium font-banana"
              >
                Terms & conditions & Privacy policy
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="col-span-1"></div>
    </div>
  );
}
