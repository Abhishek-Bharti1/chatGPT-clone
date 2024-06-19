"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
const Login = () => {
  return (
    <div className="bg-[#13b48b] h-screen flex flex-col items-center justify-center text-center">
      <Image
        src="https://static.vecteezy.com/system/resources/previews/021/059/825/original/chatgpt-logo-chat-gpt-icon-on-green-background-free-vector.jpg"
        width={300}
        height={300}
        alt="logo"
      />
      <button onClick={()=>signIn('google')} className="text-white font-bold text-3xl animate-pulse">Sign In to use ChatGPT</button>
    </div>
  );
};

export default Login;
