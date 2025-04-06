"use client"
import Button from "@/component/Button";
import InputField from "@/component/InputField";
import SwitchAuth from "@/component/SwithAuth";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-l from-[#FF5758] to-white">
      <div className="w-1/2 flex items-center justify-center">
        <img src="/image/logo.png" alt="Logo" className="w-[300px] h-auto" />
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <RenderInput />
      </div>
    </div>
  );
}

function RenderInput() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false, // không redirect ngay, để bạn xử lý logic
      username,
      password,
    });

    if (res.ok) {
      router.push("/"); // hoặc chuyển đến trang dashboard
    } else {
      alert("Sai tài khoản hoặc mật khẩu!");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg w-[400px] h-[500px] space-y-4 text-center"
    >
      <h2 className="text-[36px] font-bold text-center text-black">Đăng Nhập</h2>
      <InputField
        label="Tài khoản"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputField
        label="Mật khẩu"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button text="Đăng Nhập" type="submit" />
      <SwitchAuth a="Bạn chưa có tài khoản? " b="Đăng ký ngay!" link="http://localhost:3000/register" />
    </form>
  )
}
