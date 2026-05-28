import About from "@/components/home/About";
import CTA from "@/components/home/CTA";
import Hero from "@/components/home/Hero";
import Page from "@/components/utility/Page";
import Projects from "@/components/home/Projects";
import Skills from "@/components/home/Skills";
import Testimonials from "@/components/home/Testimonials";
// import { allPosts } from "contentlayer/generated";
// import { GetStaticProps } from "next";

// export const getStaticProps: GetStaticProps = async () => {
//   return {
//     props: {
//       allPosts: allPosts.sort(({date: dateA}: any, {date: dateB}: any) => dateB - dateA),
//     },
//   };
// }

export default function Home() {
  return (
    <Page currentPage="Home" meta={{ desc: "I'm a developer passionate about building clean, intuitive digital experiences for the web." }}>
      <Hero />
      <div className="mt-20 space-y-32">
        <About />
        <Projects />
        <Skills />
        <Testimonials />
        {/* <Posts allPosts={allPosts} /> */}
      </div>
      <CTA />
    </Page>
  );
}
