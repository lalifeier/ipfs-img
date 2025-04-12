'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

export default function UploadResultPage() {
  const searchParams = useSearchParams();
  const url = searchParams.get('url');
  const hash = searchParams.get('hash');
  const size = searchParams.get('size');
  const name = searchParams.get('name');
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    if (url) {
      navigator.clipboard.writeText(url)
        .then(() => {
          setIsCopied(true);
          toast({
            title: "Copied!",
            description: "URL copied to clipboard.",
          });
          setTimeout(() => setIsCopied(false), 3000);
        })
        .catch(err => {
          console.error("Failed to copy text: ", err);
          toast({
            title: "Error",
            description: "Failed to copy URL.",
            variant: "destructive",
          });
        });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <Card className="w-full max-w-md rounded-xl shadow-md overflow-hidden">
          <CardHeader className="p-6 pb-4">
            <CardTitle className="text-3xl font-semibold text-gray-800">Upload Result</CardTitle>
            <CardDescription className="text-gray-500">File uploaded successfully!</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {url && hash && size && name ? (
              <div>
                <div className="mb-4">
                  <p className="font-semibold text-gray-700">File information</p>
                  <p className="text-gray-600">Name: {name}</p>
                  <p className="text-gray-600">Size: {size} bytes</p>
                  <p className="text-gray-600">IPFS Hash: {hash}</p>
                </div>
                <div className="mb-4 flex items-center">
                  <p className="font-semibold text-gray-700 mr-2">Download Link:</p>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 transition-colors duration-300 underline break-all">
                    {url}
                  </a>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopyClick}
                    disabled={isCopied}
                    className="ml-2 rounded-full hover:bg-gray-200"
                  >
                    {isCopied ? <Copy className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <Link href="/upload" className="w-full">
                  <Button className="w-full rounded-md py-3 font-semibold bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors duration-300">Upload New File</Button>
                </Link>
              </div>
            ) : (
              <p className="text-gray-600">Missing upload parameters.</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
