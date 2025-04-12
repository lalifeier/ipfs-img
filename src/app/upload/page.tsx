'use client';

import { useState, useCallback } from "react";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  }, []);

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    if (password) {
      formData.append("password", password);
    }

    try {
      const response = await fetch("https://ipfs.lalifeier.eu.org/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      router.push(`/upload/result?url=${data.url}&hash=${data.hash}&size=${data.size}&name=${data.name}`);

    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "An error occurred during upload.",
        variant: "destructive",
      });
    }
  };

  const preventDefault = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>File Upload</CardTitle>
            <CardDescription>Upload your files securely</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="border-2 border-dashed rounded-md p-10 w-full cursor-pointer"
              onDrop={onDrop}
              onDragOver={preventDefault}
              onDragEnter={preventDefault}
              onDragLeave={preventDefault}
            >
              {selectedFile ? (
                <p>Selected file: {selectedFile.name}</p>
              ) : (
                <>
                  <p>Drag and drop a file here, or click to select one</p>
                  <input
                    type="file"
                    className="hidden"
                    id="file-upload"
                    onChange={onFileSelect}
                  />
                  <label htmlFor="file-upload" className="text-primary cursor-pointer">
                    Select file
                  </label>
                </>
              )}
            </div>

            <div className="mt-4">
              <Input
                type="password"
                placeholder="Password (optional)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              className="mt-4"
              onClick={handleUpload}
              disabled={!selectedFile}
            >
              Upload
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
