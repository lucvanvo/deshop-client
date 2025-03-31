"use client"
import Button from "@/component/Button";
import InputField from "@/component/InputField";
import { useState } from "react";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gradient-to-l from-[#FF5758] to-white">
      {/* Nửa bên trái */}
      <div className="w-1/2 flex items-center justify-center">
        <img src="/image/logo.png" alt="Logo" className="w-[300px] h-auto" />
      </div>

      {/* Nửa bên phải */}
      <div className="w-1/2 flex items-center justify-center">
        <RenderInput />
      </div>
    </div>
  );
}

function RenderInput() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn trang web load lại khi submit
    console.log("Tài khoản:", username);
    console.log("Mật khẩu:", password);
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
    </form>
  )
}
