'use client';

import { useState, useCallback } from "react";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { File } from "lucide-react";

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
    <div className="flex flex-col items-center justify-center min-h-screen py-4 bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <Card className="w-full max-w-md rounded-xl shadow-md overflow-hidden">
          <CardHeader className="p-6 pb-4">
            <CardTitle className="text-3xl font-semibold text-gray-800">File Upload</CardTitle>
            <CardDescription className="text-gray-500">Drag and drop your file here</CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div
              className="relative border-2 border-dashed rounded-md p-12 w-full cursor-pointer transition-colors duration-300 hover:border-indigo-500"
              onDrop={onDrop}
              onDragOver={preventDefault}
              onDragEnter={preventDefault}
              onDragLeave={preventDefault}
            >
              {selectedFile ? (
                <div className="flex items-center justify-center">
                  <File className="w-6 h-6 text-gray-500 mr-2" />
                  <p className="text-gray-700">Selected file: {selectedFile.name}</p>
                </div>
              ) : (
                <>
                  <p className="text-gray-600 mb-2">Drag and drop a file here, or click to select one</p>
                  <input
                    type="file"
                    className="hidden"
                    id="file-upload"
                    onChange={onFileSelect}
                  />
                  <label htmlFor="file-upload" className="text-indigo-600 hover:text-indigo-700 transition-colors duration-300 cursor-pointer font-semibold">
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
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-700"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              className="mt-6 w-full rounded-md py-3 font-semibold bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors duration-300"
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
