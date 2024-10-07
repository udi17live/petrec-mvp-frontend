import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation';

export default async function dashboard() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/dashboard/appointment');
  } else {
    redirect('/login');
  }
  return null;
}