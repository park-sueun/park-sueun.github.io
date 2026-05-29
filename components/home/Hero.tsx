import React from "react";
import { Link as ScrollLink } from "react-scroll";

function Hero() {
  return (
    <>
      <div
        className="relative heroElem w-full pt-60 pb-40 m-auto flex justify-center text-center flex-col items-center z-1"
        style={{ maxWidth: "1200px" }}
      >
        <p className="text-3xl mb-10">안녕하세요, 박수은입니다.</p>
        <h1 className="heroTitle inline-block max-w-2xl lg:max-w-4xl  w-auto relative text-3xl md:text-5xl lg:text-6xl tracking-tighter leading-snug mb-10 font-bold heroShinyBg">
          복잡한 문제를{" "}
          <span className="heroShiny1 text-fun-pink">구조적으로</span>{" "}
          풀어내는
          <br />
          <span className="heroShiny2 text-fun-pink">백엔드</span>{" "}
          개발자입니다.
          <img
            className="sqD left-[-35px] bottom-[-85px] sm:bottom-[-100px] sm:left-5 opacity-40"
            style={{ animationDelay: "0.3s" }}
            src="/static/doodles/hero/code.svg"
          />
          <img
            className="sqD right-[-30px] bottom-[-90px] sm:right-0 sm:bottom-[-110px] opacity-40"
            style={{ animationDelay: "0.6s" }}
            src="/static/doodles/hero/coder.svg"
          />
        </h1>
        <ScrollLink
          activeClass="active"
          to="learnmore"
          spy={true}
          offset={-30}
          smooth={true}
          duration={500}
        >
          <div className="cursor-pointer font-bold whitespace-nowrap px-10 py-4 text-fun-white border-2 text-xl rounded-full border-fun-white bg-bg hover:bg-fun-pink hover:text-white hover:border-fun-pink transition-colors">
            Tell me more
          </div>
        </ScrollLink>
      </div>
    </>
  );
}

export default Hero;
