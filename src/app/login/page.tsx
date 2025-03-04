"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // 1. 调用后端注册接口
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    });

    // 2. 检查返回结果
    if (!res.ok) {
      setErrorMsg("注册失败，请检查信息或稍后再试。");
      return;
    }

    const data = await res.json();
    console.log("注册成功：", data);

    // 3. 注册成功后，你可以跳转到登录页或其他页面
    router.push("/login");
  };

  return (
    <main className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleRegister} className="flex flex-col gap-4 w-[300px]">
        <h1 className="text-xl font-bold text-center">注册</h1>

        {errorMsg && (
          <p className="text-red-500 text-center">
            {errorMsg}
          </p>
        )}

        <input
          type="email"
          placeholder="邮箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="昵称（可选）"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="password"
          placeholder="密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />

        <button type="submit" className="bg-blue-500 text-white py-2 rounded">
          注册
        </button>
      </form>
    </main>
  );
}
