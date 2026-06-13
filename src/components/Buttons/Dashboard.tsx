'use client'; 
import { authClient } from "@/lib/auth-client"; 
import { useRouter } from "next/navigation";

function Dashboard() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
     console.log('session',session) 

  if (isPending) {
    return <p>Loading...</p>;
  }
  const handleDashboardClick = () => {
    if (!session) {
      router.push("/login");
      return;
    }
    const userRole = "admin" 
    if (userRole === "admin") {
      router.push("/admin");
    } else if (userRole === "doctor") {
      router.push("/doctor"); 
    } else {
      router.push("/patient"); 
    }
  };
  return (
    <button 
      onClick={handleDashboardClick} 
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Dashboard
    </button>
  );
}

export default Dashboard;