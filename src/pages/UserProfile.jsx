
import { useAuth } from '../context/AuthContext';  // Import the useAuth hook

const UserProfile = () => {
  const { user, userData } = useAuth();  // Get user and userData from the context

  if (!user) {
    return <div>Loading...</div>; // Or display a login prompt if user is not authenticated
  }

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="profile">
        {/* Display profile image if available */}
        {user?.image ? (
          <img src={user.image} alt="Profile" className="profile-img" />
        ) : (
          <div className="profile-img">No Image</div>
        )}
        <h2>{user?.name}</h2>
        <p>Email: {user?.email}</p>

        {/* You can display additional data if userData is available */}
        {userData && (
          <div>
            <p>Additional Data:</p>
            <pre>{JSON.stringify(userData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
