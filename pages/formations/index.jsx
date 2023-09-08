import RootLayout from "@/layouts/BasicLayout";
import React from "react";
import Course from "@/components/Courses/Courses";
export default function Index() {
  return (
    <RootLayout>
      <main className="container">
        <Course />
      </main>
    </RootLayout>
  );
}
