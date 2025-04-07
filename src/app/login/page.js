"use client"
import Button from "@/component/Button";
import InputField from "@/component/InputField";
import SwitchAuth from "@/component/SwithAuth";
import { useState } from "react";
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [showPopup, setShowPopup] = useState(true);

  const credentialsAction = async (e) => {
    e.preventDefault();
    await signIn("credentials", {
      username,
      password,
      callbackUrl: "/admin/product",
    })
  }

  return (
    <form
      onSubmit={credentialsAction}
      className="bg-white p-6 rounded-lg w-[400px] h-[500px] space-y-4 text-center"
    >
      <h2 className="text-[36px] font-bold text-center text-black">Đăng Nhập</h2>

      {error === "CredentialsSignin" && showPopup && (
        <PopupError message="Sai tài khoản hoặc mật khẩu"
          onClose={() => setShowPopup(false)} />
      )}

      <InputField
        label="Tài khoản"
        type="email"
        name="username"
        placeholder="Nhập tài khoản"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputField
        label="Mật khẩu"
        type="password"
        value={password}
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button text="Đăng Nhập" type="submit" />
      <SwitchAuth a="Bạn chưa có tài khoản? " b="Đăng ký ngay!" link="http://localhost:3000/register" />
    </form>
  )
}

function PopupError({ message, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-[300px] text-center space-y-4 z-50">
        <h2 className="text-xl font-bold text-red-600">Thông báo!!!</h2>
        <p className="text-black">{message}</p>
        <button
          className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={onClose}
        >
          Đóng
        </button>
      </div>
    </div>
  )
}