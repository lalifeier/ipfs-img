"use client";
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-background border-b p-4 fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-xl font-semibold">IPFS Uploader</h1>
      </div>
    </header>
  );
};

export default Header;

