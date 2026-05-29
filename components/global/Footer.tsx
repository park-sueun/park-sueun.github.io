import React from "react";

function Footer() {
  return (
    <footer className="w-full py-6 text-center border-t border-fun-pink-dark">
      <p className="text-xs text-fun-gray opacity-50">
        Design inspired by{" "}
        <a
          href="https://braydentw.io"
          target="_blank"
          rel="noreferrer"
          className="underline hover:opacity-100 transition-opacity"
        >
          braydentw.io
        </a>
      </p>
    </footer>
  );
}

export default Footer;
