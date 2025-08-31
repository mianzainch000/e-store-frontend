import { cookies } from "next/headers";
import Navbar from "@/components/Navbar";
const Layout = async ({ children }) => {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value || "light";
  const firstName = cookieStore.get("firstName")?.value || null;
  const lastName = cookieStore.get("lastName")?.value || null;
  return (
    <div>
      <Navbar initialTheme={theme} firstName={firstName} lastName={lastName} />

      {children}
    </div>
  );
};
export default Layout;
