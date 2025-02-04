import { UserButton } from "@clerk/clerk-react";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>This is a private route. Only authenticated users can see this.</p>
      <UserButton />
    </div>
  );
};

export default Dashboard;
