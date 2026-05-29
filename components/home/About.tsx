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
          단순히 기능이 동작하는 것보다, 왜 이런 구조로 동작해야 하는지를 먼저 고민합니다. 문제가 발생했을 때 임시 대응보다 원인을 분석하고 구조적으로 해결하는 방식을 선호하며, 유지보수성과 확장성을 함께 고려하려고 노력합니다.
          </p>
          <p>
            기술은 목적이 아니라 문제를 해결하기 위한 도구라고 생각합니다. 특정 기술 스택에 얽매이기보다 상황에 적합한 방법을 찾고, 필요한 기술을 빠르게 학습하며 적용하는 과정을 즐깁니다.
            </p>
          <p>
          또한 좋은 개발은 개인의 구현에서 끝나지 않는다고 생각합니다. 기술적인 판단과 구현 의도를 팀과 공유하고, 함께 이해할 수 있는 구조를 만드는 과정 역시 중요한 개발 역량이라고 믿습니다.
          </p>
          <p>
          아직 배우고 성장해야 할 부분은 많지만, 그 과정을 즐길 줄 아는 개발자입니다. 반갑습니다! 🙌
          </p>

          {/* Document download buttons */}
          <div className="flex flex-wrap gap-3 pt-4">
            <a
              href="/resume.html"
              target="_blank"
              rel="noreferrer"
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
            { number: "3+",    label: "Years of Experience" },
            { number: "5.76M", label: "Daily Data Processed" },
            { number: "30x",   label: "API Response Improved" },
            { number: "10+",   label: "Tech Stacks" },
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
