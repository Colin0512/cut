import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    // 校验必填字段
    if (!email || !password) {
      return new NextResponse("邮箱或密码不能为空", { status: 400 });
    }

    // 检查该邮箱是否已被注册
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return new NextResponse("该邮箱已被注册", { status: 400 });
    }

    // 对密码进行加密
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建用户
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    // 返回注册成功的用户信息，状态码 200
    return NextResponse.json({ id: user.id, email: user.email });
  } catch (error) {
    console.error("注册接口出错：", error);
    return new NextResponse("服务器内部错误", { status: 500 });
  }
}
