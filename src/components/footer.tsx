"use client";
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t p-4">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} IPFS Uploader by lalifeier. All rights reserved. - 基于 IPFS 的文件存储服务</p>
      </div>
    </footer>
  );
};

export default Footer;
