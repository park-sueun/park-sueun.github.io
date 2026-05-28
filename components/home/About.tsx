import React from "react";
import SectionTitle from "../global/SectionTitle";

function About() {
  return (
    <div id="learnmore" className="flex flex-col text-left justify-between pt-8 relative">
      <SectionTitle title="A bit about who I am." />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

        {/* Bio */}
        <div className="space-y-5 text-fun-gray-light text-lg leading-relaxed">
          <p>
            Hi! I'm Su Eun, a developer based in Korea who loves building
            beautiful things on the web. I care deeply about clean code,
            thoughtful UX, and products that make a real difference.
          </p>
          <p>
            When I'm not coding, I'm exploring new technologies, contributing
            to open source, or sharpening my design eye in Figma. I believe
            the best software lives at the intersection of technical excellence
            and great design.
          </p>
          <p>
            I'm always open to new opportunities and interesting
            collaborations — feel free to reach out!
          </p>

          {/* Document download buttons */}
          <div className="flex flex-wrap gap-3 pt-4">
            <a
              href="/assets/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-fun-pink text-fun-pink rounded-full font-bold text-sm hover:bg-fun-pink hover:text-white transition-colors"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="12" y1="12" x2="12" y2="18"/>
                <line x1="9" y1="15" x2="15" y2="15"/>
              </svg>
              이력서
            </a>
            <a
              href="/assets/career.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white rounded-full font-bold text-sm hover:bg-white hover:text-bg transition-colors"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="8" y1="13" x2="16" y2="13"/>
                <line x1="8" y1="17" x2="16" y2="17"/>
              </svg>
              경력기술서
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-5">
          {[
            { number: "3+",  label: "Years of Experience" },
            { number: "10+", label: "Projects Shipped" },
            { number: "5+",  label: "Tech Stacks" },
            { number: "∞",   label: "Cups of Coffee" },
          ].map(({ number, label }) => (
            <div
              key={label}
              className="border border-fun-pink-dark rounded-2xl p-6 text-center bg-fun-pink-darkest"
            >
              <p className="text-4xl font-bold text-fun-pink tracking-tighter mb-1">
                {number}
              </p>
              <p className="text-fun-gray text-sm font-medium">{label}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default About;
