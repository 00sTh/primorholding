import { cookies } from "next/headers";
import { verifyJwt } from "./jwt";

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-token")?.value;
  if (!token) return null;
  try {
    return await verifyJwt(token);
  } catch {
    return null;
  }
}
