import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { decodeUserToken } from "../utils/jwtDecode";

interface User {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  birthdate: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const userInfo = decodeUserToken();
    console.log(userInfo);
    if (userInfo) {
      setUser({
        username: userInfo.username,
        email: userInfo.email,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        birthdate: userInfo.birthdate || '' // Provide default empty string if missing
      });
    }
  }, []);
  

  return (
    <Layout profileImageUrl="">
      <div className="p-6 space-y-6 max-w-lg mx-auto">
        <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
          {/* Profile Picture */}
          <img
            src=""
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
          {/* Full Name */}
          <h2 className="text-2xl font-semibold mb-2">{user?.firstName} {user?.lastName}</h2>
          {/* Username */}
          <p className="text-gray-600">@{user?.username}</p>
        </div>

        {/* User Information Section */}
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-gray-700">
              <span className="font-semibold">Email:</span>
              <span>{user?.email}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span className="font-semibold">Date of Birth:</span>
              <span>{user?.birthdate}</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
