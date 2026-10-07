import "@/app/globals.scss";
import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/Navbar/Navbar";
import CategoryList from "@/app/components/CategoryList/CategoryList";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <CategoryList />
        {children}
        <Footer
          companyName="NewsAI"
          description="AI-powered news application"
          year={2026}
        />
      </body>
    </html>
  );
}