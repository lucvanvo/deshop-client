"use client"
import Button from "@/component/Button";
import InputField from "@/component/InputField";
import SwitchAuth from "@/component/SwithAuth";
import { useState } from "react";
export default function RegisterPage() {
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
    )
}

function RenderInput() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Tài khoản:", username);
        console.log("Mật khẩu:", password);
        console.log("Họ tên: ", fullname);
        console.log("Email:", email);
        console.log("Điện thoại:", phone);
        console.log("Địa chỉ: ", address);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg w-[400px] h-auto flex flex-col items-center space-y-4"
        >
            <h2 className="text-[36px] font-bold text-black">Đăng Ký</h2>

            <div className="w-full space-y-3">
                <InputField label="Tài khoản" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <InputField label="Mật khẩu" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <InputField label="Họ tên" type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} />
                <InputField label="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <InputField label="Điện thoại" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <InputField label="Địa chỉ" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>

            <Button text="Đăng Ký" type="submit" className="w-[350px] h-auto p-2 bg-red-400" />
            <SwitchAuth a="Bạn đã có tài khoản?" b="Đăng nhập ngay!" link="http://localhost:3000/login" />
        </form>
    );
}