import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font"
import "./globals.css";

// Configure clean system fonts to match our sans-serif style rules
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans" 
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif"
});

// --- UPDATE THIS BLOCK HERE ---
export const metadata: Metadata = {
  title: "AOG Studio | Digital Design & Web Development",
  description: "A hands-on creative studio crafting exceptional brand identities and reliable custom software custom-tailored for your business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}