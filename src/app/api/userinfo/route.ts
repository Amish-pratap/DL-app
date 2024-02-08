import User from "@/models/User";
import connect from "@/utils/db";
import { getServerSession } from "next-auth/next";

import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const session = await getServerSession(request);

  // If no session exists, reject the request
  if (!session) {
    return new NextResponse("User is not authenticated", { status: 401 });
  }
  const { email } = await request.json();

  if (!email) {
    return new NextResponse("Email is required", { status: 400 });
  }

  await connect();

  const user = await User.findOne({ email });

  if (!user) {
    return new NextResponse("User not found", { status: 404 });
  }

  const { password, ...userInfo } = user._doc;
  console.log(userInfo);

  return NextResponse.json({ userInfo }, { status: 200 });
};

export const PUT = async (request: any) => {
  const session = await getServerSession(request);

  // If no session exists, reject the request
  if (!session) {
    return new NextResponse("User is not authenticated", { status: 401 });
  }
  const { email, name, address, phoneNo } = await request.json();

  if (!email) {
    return new NextResponse("Email is required", { status: 400 });
  }

  try {
    await connect();

    let user = await User.findOne({ email });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    user.name = name || user.name;
    user.address = address || user.address;
    user.phoneNo = phoneNo || user.phoneNo;

    await user.save();

    // Fetch the updated user
    user = await User.findOne({ email });

    const { password, ...userInfo } = user._doc;
    console.log(userInfo);

    return NextResponse.json({ userInfo }, { status: 200 });
  } catch (error) {
    console.error("Error updating user information:", error);
    return new NextResponse("Error updating user information", { status: 500 });
  }
};
