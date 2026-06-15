'use client'; 
import { authClient } from "@/lib/auth-client"; 
import { useRouter } from "next/navigation";

function Dashboard() {
const router = useRouter();
const { data: session, isPending } = authClient.useSession();
if (isPending) {
  return <p>Loading...</p>;
}
const handleDashboardClick = () => {
  if (!session || !session.user) {
    router.push("/login");
    return;
  }

  const userRole = session?.user.role; 

  console.log('Logging in user role:', userRole);

  if (userRole === "admin") {
    router.push("/admin");
  } else if (userRole === "doctor") {
    router.push("/doctor");
  } else if (userRole === "patient") {
    router.push("/patient");
  } else {
   
    router.push("/"); 
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