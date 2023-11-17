import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const dashboard = async () => {

  const session = await getServerSession();
  
  if (!session) {
    redirect("/");
  }

  return (

    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      
      <h2> this is dashboard</h2>

      {!session ? (
        <>
          <h2> Dashboard </h2>
        </>
      ) : (
        <>
          <li>{session.user?.email}</li>
        </>
      )}

    </div>
  );
};

export default dashboard;
