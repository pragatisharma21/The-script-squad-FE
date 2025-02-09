/* eslint-disable react/prop-types */
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProfileTabs = ({ activeTab, setActiveTab, userType }) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
      <TabsList className="sm:space-x-2 flex ">
        <TabsTrigger
          value="profile"
          className={
            activeTab === "profile"
              ? "bg-gray-200 sm:text-base text-[10px]"
              : "sm:text-base text-[10px]"
          }
        >
          Profile
        </TabsTrigger>
        <TabsTrigger
          value="myBooks"
          className={
            activeTab === "myBooks"
              ? "bg-gray-200 sm:text-base text-[10px]"
              : "sm:text-base text-[10px]"
          }
        >
          My Books
        </TabsTrigger>
        {/* <TabsTrigger
          value="myPosts"
          className={
            activeTab === "myPosts"
              ? "bg-gray-200 sm:text-base text-[10px]"
              : "sm:text-base text-[10px]"
          }
        >
          My Post
        </TabsTrigger>
        {userType === "FLEET_ADMIN" && (
          <TabsTrigger
            value="paymentHistory"
            className={
              activeTab === "paymentHistory"
                ? "bg-gray-200 sm:text-base text-[10px]"
                : "sm:text-base text-[10px]"
            }
          >
            Payment History
          </TabsTrigger>
        )} */}
      </TabsList>
    </Tabs>
  );
};

export default ProfileTabs;
