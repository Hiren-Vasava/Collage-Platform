import './globals.css';

export const metadata = {
  title: 'College App',
  description: 'A Next.js application for college management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">{children}</body>
    </html>
  );
}