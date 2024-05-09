"use client";

import { useUser } from "@clerk/nextjs";

export const WelcomeMessage = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="space-y02 mb-4">
      <h2 className="text-2xl lg:text-4xl text-white font-medium">
        Welcome back{isLoaded ? ", " : " "}
        <span className="text-[#194c56]">{user?.firstName}</span> 👋🏻
      </h2>
      <p className="text-sm lg:text-base text-slate-50/90 font-medium">
        This is your Finance Overview Report
      </p>
    </div>
  );
};
