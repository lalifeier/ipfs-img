'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

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
            title: "已复制!",
            description: "URL 已复制到剪贴板。",
          });
          setTimeout(() => setIsCopied(false), 3000);
        })
        .catch(err => {
          console.error("复制失败: ", err);
          toast({
            title: "错误",
            description: "复制 URL 失败。",
            variant: "destructive",
          });
        });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 max-w-3xl">
        <Card className="w-full rounded-xl shadow-md overflow-hidden">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-3xl font-semibold text-gray-800">上传结果</CardTitle>
            <CardDescription className="text-gray-500">文件上传成功!</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            {url && hash && size && name ? (
              <div className="flex flex-col gap-4">
                <div className="mb-6">
                  <p className="font-semibold text-gray-700 mb-2">文件信息</p>
                  <p className="text-gray-600">文件名: {name}</p>
                  <p className="text-gray-600">文件大小: {formatBytes(parseInt(size))}</p>
                  <p className="text-gray-600">IPFS 哈希值: {hash}</p>
                </div>

                <div className="mb-6">
                    <p className="font-semibold text-gray-700 mb-2">下载链接:</p>
                    <div className="flex items-center">
                        <div className="overflow-x-auto whitespace-nowrap mr-2">
                            <a href={url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 transition-colors duration-300 underline break-all">
                                {url}
                            </a>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleCopyClick}
                            disabled={isCopied}
                            className="rounded-full hover:bg-gray-200"
                        >
                            {isCopied ? <Copy className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>

                <Link href="/upload" className="w-full">
                  <Button className="w-full rounded-md py-4 font-semibold bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors duration-300">上传新文件</Button>
                </Link>
              </div>
            ) : (
              <p className="text-gray-600">缺少上传参数。</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

