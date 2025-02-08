import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const Profile = () => {
  const { logout } = useAuth();
  return (
    <div>
      <div className="flex justify-center items-center p-4">
        <div onClick={() => logout()}>
          <Button>SignOut</Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
