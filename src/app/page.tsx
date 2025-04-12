"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="grid h-screen place-items-center bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-6 md:px-20 text-center">
        <Card className="w-full max-w-md rounded-xl shadow-md overflow-hidden animate-fade-in">
          <CardHeader className="p-6 pb-4">
            <CardTitle className="text-3xl font-semibold text-gray-800">文件速递</CardTitle>
            <CardDescription className="text-gray-500">安全便捷地上传您的文件</CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <Link href="/upload" className="w-full">
              <Button className="w-full rounded-md py-3 font-semibold bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors duration-300">
                前往上传页面
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
