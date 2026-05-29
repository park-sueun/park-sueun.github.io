import Footer from "../global/Footer";
import Head from "next/head";
import MobileNavbar from "../global/MobileNavbar";
import Navbar from "../global/Navbar";
import Link from "next/link";
import React, { ReactChildren } from "react";

function Page({ currentPage, meta: { title, desc }, children }: PageProps) {
  const pageTitle = `${
    currentPage === "Home"
      ? "Su Eun Park - Developer"
      : `${currentPage} - Su Eun Park`
  }`;
  return (
    <div
      className="w-full m-auto flex flex-col items-center justify-center min-h-screen opening-box-animate-paddin text-white overflow-hidden md:overflow-visible"
      style={{ maxWidth: "1200px" }}
    >
      <Head>
        <title>{pageTitle}</title>

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/static/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/static/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/static/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/static/favicon/site.webmanifest" />
        <meta name="title" content={pageTitle} />
        <meta name="description" content={desc} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://park-sueun.github.io/" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={desc} />
      </Head>
      <main className="p-5 w-full flex-1 text-center">
        {currentPage === "Projects" && (
          <nav className="flex justify-start mb-6">
            <Link href="/">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-fun-pink-dark text-fun-gray hover:text-white hover:border-fun-gray transition-colors text-sm font-medium cursor-pointer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
                </svg>
                Home
              </span>
            </Link>
          </nav>
        )}
        {currentPage !== "Home" && currentPage !== "Projects" && (
          <>
            <div className="hidden sm:block z-100">
              <Navbar currentPage={currentPage} />
            </div>
            <div className="-m-5 block sm:hidden z-100">
              <MobileNavbar />
            </div>
          </>
        )}
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default Page;

type PageProps = {
  currentPage: string;
  meta: {
    title?: string;
    desc: string;
  };
  children?: JSX.Element | JSX.Element[];
};
