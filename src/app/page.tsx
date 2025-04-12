"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>FileDrop</CardTitle>
            <CardDescription>Upload your files securely</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/upload">
              <Button>
                Go to Upload Page
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

