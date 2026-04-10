import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.redirect("/admin/login");
  response.cookies.delete("admin-token");
  return response;
}
