"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <Card className="w-full max-w-md rounded-xl shadow-md overflow-hidden">
          <CardHeader className="p-6 pb-4">
            <CardTitle className="text-3xl font-semibold text-gray-800">FileDrop</CardTitle>
            <CardDescription className="text-gray-500">Upload your files securely and easily</CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <Link href="/upload" className="w-full">
              <Button className="w-full rounded-md py-3 font-semibold bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors duration-300">
                Go to Upload Page
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
