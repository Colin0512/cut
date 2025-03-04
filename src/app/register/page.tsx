"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      // 向后端 /api/register 发起 POST 请求
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      // 调试：打印响应状态码
      console.log("res.status:", res.status);

      // 如果响应状态码不是 200～299，则认为注册失败
      if (!res.ok) {
        const msg = await res.text();
        setErrorMsg(msg || "注册失败");
        return;
      }

      // 注册成功，跳转到登录页面
      router.push("/login");
    } catch (error) {
      console.error("注册请求出错:", error);
      setErrorMsg("网络错误或服务器异常");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleRegister} className="flex flex-col gap-4 w-[300px]">
        <h1 className="text-xl font-bold text-center">注册页面</h1>

        {errorMsg && (
          <p className="text-red-500 text-center">{errorMsg}</p>
        )}

        <input
          type="email"
          placeholder="邮箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="昵称（可选）"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded"
        >
          注册
        </button>
      </form>
    </main>
  );
}
