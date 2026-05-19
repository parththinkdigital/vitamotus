'use client';

/**
 * MainLayout is a helper wrapper for pages.
 * Note: Navbar, Footer, and SmoothScroll are already handled globally in app/layout.js
 */
export default function MainLayout({ children }) {
  return (
    <div className="relative w-full flex flex-col">
      {children}
    </div>
  );
}
