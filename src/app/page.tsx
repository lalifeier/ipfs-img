'use client';

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { File } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadResult, setUploadResult] = useState<{
    url: string;
    hash: string;
    size: number;
    name: string;
  } | null>(null);
  const [showResult, setShowResult] = useState(false);

  const resetForm = () => {
    setSelectedFile(null);
    setPassword("");
    setUploadResult(null);
    setShowResult(false);
    setUploadProgress(0);
  };
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
    if (!selectedFile) return;
    setIsUploading(true);
    setUploadProgress(0);
    setUploadError(null);

    const formData = new FormData();
    formData.append("file", selectedFile);
    if (password) {
      formData.append("password", password);
    }

    try {
      const response = await fetch("https://ipfs.lalifeier.eu.org/upload", {
        method: "POST",
        body: formData,
        signal: AbortSignal.timeout(60000),
        // reporting upload progress
        onUploadProgress: (progressEvent: ProgressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        },
      });

      if (!response.ok) {
        setUploadError(`上传失败: HTTP状态码 ${response.status}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUploadResult(data);
      setShowResult(true);
    } catch (error: any) {
      setUploadError("上传失败");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const preventDefault = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const uploadForm = () => (
    <>
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

          {uploadError && (
            <p className="text-red-500 mt-4">{uploadError}</p>
          )}

          <Button
            className="mt-6 w-full rounded-md py-3 font-semibold bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors duration-300"
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
          >
            {isUploading ? `上传中...` : "上传"}
          </Button>
        </CardContent>
      </Card>
    </>
  );

  const resultCard = () => {
    if (!uploadResult) return null;

    const { url, hash, size, name } = uploadResult;
    const handleCopyClick = () => {
      navigator.clipboard.writeText(url);
    };

    return (
      <Card className="w-full rounded-xl shadow-md overflow-hidden animate-fade-in">
        <CardHeader className="p-6 pb-4">
          <CardTitle className="text-2xl font-semibold text-gray-800">上传结果</CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <p>文件名: {name}</p>
          <p>文件大小: {size} bytes</p>
          <p>URL: {url}</p>
          <p>Hash: {hash}</p>
          <Button className="mt-4 mr-2" onClick={handleCopyClick}>
            复制 URL
          </Button>
          <Button className="mt-4" onClick={resetForm}>
            上传新文件
          </Button>
        </CardContent>
      </Card>
    );
  }
  return (
    <div className="grid h-screen place-items-center bg-gray-100 p-4">
      <main className="flex flex-col items-center justify-center w-full flex-1 max-w-4xl">
        {!showResult && uploadForm()}
        {showResult && resultCard()}
      </main>
    </div>
  );
}
