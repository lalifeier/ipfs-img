'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function UploadResultPage() {
  const searchParams = useSearchParams();
  const url = searchParams.get('url');
  const hash = searchParams.get('hash');
  const size = searchParams.get('size');
  const name = searchParams.get('name');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Upload Result</CardTitle>
            <CardDescription>File uploaded successfully!</CardDescription>
          </CardHeader>
          <CardContent>
            {url && hash && size && name ? (
              <div>
                <div className="mb-4">
                  <p className="font-semibold">File information</p>
                  <p>Name: {name}</p>
                  <p>Size: {size} bytes</p>
                  <p>IPFS Hash: {hash}</p>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Download Link</p>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                    {url}
                  </a>
                </div>
                <Link href="/upload">
                  <Button>Upload New File</Button>
                </Link>
              </div>
            ) : (
              <p>Missing upload parameters.</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
