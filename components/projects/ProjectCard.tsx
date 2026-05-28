import React, { useState } from "react";
import Image from "next/image";
import { kebabCase } from "@/utils/utils";
import Link from "next/link";
import ProjectModal from "./ProjectModal";
import { Project } from "types";

function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="max-w-sm mx-auto flex flex-col projects-center md:projects-start md:justify-center cursor-pointer"
        key={project.id}
        onClick={() => setOpen(true)}
      >
        <div className="w-full relative rounded-xl border-fun-gray border p-2 transition hover:-translate-y-2 hover:opacity-75 hover:border-fun-pink will-change-projectCard">
          <img className="w-full rounded-md" src={project.img} alt={project.title} />
        </div>
        <div className="w-full mt-5">
          <div className="flex projects-center justify-between">
            <h3 className="text-lg font-bold">{project.title}</h3>
            <div className="space-x-2" onClick={(e) => e.stopPropagation()}>
              {project.link && project.link !== "#" && (
                <a href={project.link} target="_blank" rel="noreferrer">
                  <Image src="/static/icons/external-link.svg" width={16} height={16} alt="Link Icon" />
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer">
                  <Image src="/static/icons/github.svg" width={16} height={16} alt="Github Icon" />
                </a>
              )}
            </div>
          </div>
          <p className="text-fun-gray text-left text-sm">{project.desc}</p>
          <ul className="flex flex-wrap items-center mt-2 -ml-2 list-none" onClick={(e) => e.stopPropagation()}>
            {project.tags.map((tag) => (
              <li key={tag}>
                <Link href={`/projects/tag/${kebabCase(tag)}`}>
                  <div className="m-1 rounded-lg text-sm bg-fun-pink-dark py-1 px-2 cursor-pointer hover:opacity-75">
                    {tag}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {open && <ProjectModal project={project} onClose={() => setOpen(false)} />}
    </>
  );
}

export default ProjectCard;
