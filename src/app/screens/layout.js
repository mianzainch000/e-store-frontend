import { cookies } from "next/headers";
import Navbar from "@/components/Navbar";
const Layout = async ({ children }) => {
  const cookieStore = await cookies();
  const firstName = cookieStore.get("firstName")?.value || null;
  const lastName = cookieStore.get("lastName")?.value || null;
  return (
    <div>
      <Navbar firstName={firstName} lastName={lastName} />

      {children}
    </div>
  );
};
export default Layout;
