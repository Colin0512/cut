"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // 不要立即跳转
    });

    if (result?.error) {
      // 登录失败
      setErrorMsg(result.error);
    } else {
      // 登录成功，跳转到首页
      router.push("/");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen">
      <form onSubmit={onSubmit} className="flex flex-col gap-4 w-[300px]">
        <h1 className="text-xl font-bold text-center">登录</h1>
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
          type="password"
          placeholder="密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded"
        >
          登录
        </button>
        <div className="text-center mt-4">
          <Link href="/register" className="text-blue-500 underline">
            没有账号？去注册
          </Link>
        </div>
      </form>
    </main>
  );
}
