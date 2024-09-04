// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>{children}</body>
//     </html>
//   );
// }


// import { ReactNode } from 'react';
// import Sidebar from '@/components/Sidebar';
// import styles from '@/app/main.module.css';
// import Navbar from '@/components/Navbar';

// interface LayoutProps {
//   children: ReactNode;
// }

// const Layout = ({ children }: LayoutProps) => {
//   return (
//     <div className={styles.container}>
//       <div className={styles.menu}>
//         <Sidebar />
//       </div>
//       <div className={styles.content}>
//         <div className="sticky top-0 z-10">
//           <Navbar />
//         </div>
//         <main className="flex-1 overflow-y-auto p-4">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;


import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import styles from '@/app/main.module.css';
import Navbar from '@/components/Navbar';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MyLibrary",
  description: "Generated by create next app",
};
interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`${inter.className} text-base-content`}>
        <div className={styles.container}>
          <div className={styles.menu}>
            <Sidebar />
          </div>
          <div className={styles.content}>
            <div className="sticky top-0 z-10">
              <Navbar />
            </div>
            <div className="h-screen overflow-y-auto bg-base-200">
              {children}
            </div>
        <Footer/>
          </div>
        </div>
      </body>
    </html>
    </ClerkProvider>
  );
};

export default Layout;
