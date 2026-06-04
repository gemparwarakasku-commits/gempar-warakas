export const metadata = {
  title: 'GEMPAR - Gerakan Memilah Sampah Dari Rumah',
  description: 'Aplikasi pemilahan sampah dari rumah',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-[#FAFBFA] text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
