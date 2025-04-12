"use client";
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t p-4 w-full z-10 h-24 flex items-center">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center ">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} IPFS Uploader by lalifeier. All rights reserved. - 基于 IPFS 的文件存储服务
        </p>
      </div>
    </footer>
  );
};

export default Footer;

