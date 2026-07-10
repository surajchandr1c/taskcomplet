import React from "react";

export default function Footer(): React.ReactElement {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm">
        © {year} TaskComplet. All rights reserved.
      </div>
    </footer>
  );
}
