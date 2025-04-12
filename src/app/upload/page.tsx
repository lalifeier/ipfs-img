'use client';

import { useState, useCallback } from "react";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { File } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

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
        title: "未选择文件",
        description: "请选择您要上传的文件。",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", selectedFile);
    if (password) {
      formData.append("password", password);
    }

    try {
      const response = await fetch("https://ipfs.lalifeier.eu.org/upload", {
        method: "POST",
        body: formData,
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      router.push(`/upload/result?url=${data.url}&hash=${data.hash}&size=${data.size}&name=${data.name}`);

    } catch (error: any) {
      toast({
        title: "上传失败",
        description: error.message || "上传过程中发生错误。",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const preventDefault = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="grid h-screen place-items-center bg-gray-100 p-4">
      <main className="flex flex-col items-center justify-center w-full flex-1 max-w-4xl">
        <Card className="w-full rounded-xl shadow-md overflow-hidden animate-fade-in">
          <CardHeader className="p-6 pb-4">
            <CardTitle className="text-2xl font-semibold text-gray-800">文件上传</CardTitle>
            <CardDescription className="text-gray-500">拖拽文件到此处</CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div
              className="relative border-2 border-dashed rounded-md p-8 w-full cursor-pointer transition-colors duration-300 hover:border-indigo-500"
              onDrop={onDrop}
              onDragOver={preventDefault}
              onDragEnter={preventDefault}
              onDragLeave={preventDefault}
            >
              {selectedFile ? (
                <div className="flex items-center justify-center">
                  <File className="w-6 h-6 text-gray-500 mr-2" />
                  <p className="text-gray-700">已选择文件: {selectedFile.name}</p>
                </div>
              ) : (
                <>
                  <p className="text-gray-600 mb-2">拖拽文件到这里，或者点击选择文件</p>
                  <input
                    type="file"
                    className="hidden"
                    id="file-upload"
                    onChange={onFileSelect}
                  />
                  <label htmlFor="file-upload" className="text-indigo-600 hover:text-indigo-700 transition-colors duration-300 cursor-pointer font-semibold">
                    选择文件
                  </label>
                </>
              )}
            </div>

            <div className="mt-4">
              <Input
                type="password"
                placeholder="密码 (可选)"
                value={password}
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-700"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {isUploading && (
              <div className="mt-4">
                <Progress value={uploadProgress} />
                <p className="text-sm text-gray-500 mt-1 text-right">{uploadProgress}%</p>
              </div>
            )}

            <Button
              className="mt-6 w-full rounded-md py-3 font-semibold bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors duration-300"
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
            >
              {isUploading ? "上传中..." : "上传"}
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
