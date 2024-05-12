"use client";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/index";

function Page() {
  const { user } = useAppContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    // If user is not logged in, redirect to login page or show a message
    return <div>Please log in to view this page.</div>;
  }

  // If user is logged in, render the page content
  return (
    <div className="p-4">
      <p>
        Welcome, {user.displayName} - you are logged in to the profile page - a
        protected route.
      </p>
    </div>
  );
}

export default Page;
