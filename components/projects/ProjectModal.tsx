import React, { useEffect, useState } from "react";
import { Project, Architecture, SystemNodeType, ErdEntity, ErdRelation } from "types";

type Props = {
  project: Project;
  onClose: () => void;
};

function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,10,31,0.9)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl bg-fun-pink-darkest border border-fun-pink-dark text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full border border-fun-pink-dark text-fun-gray hover:text-white hover:border-fun-gray transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* 썸네일 */}
        <img
          src={project.img}
          alt={project.title}
          className="w-full rounded-t-2xl object-cover"
          style={{ maxHeight: "340px", objectFit: "cover", objectPosition: "center" }}
        />

        <div className="p-7 space-y-7">
          {/* 헤더 */}
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold">{project.title}</h2>
              {project.period && (
                <span className="text-xs text-fun-gray border border-fun-pink-dark rounded-full px-3 py-1">
                  {project.period}
                </span>
              )}
            </div>
            {project.role && (
              <p className="text-fun-pink text-sm font-semibold mb-1">{project.role}</p>
            )}
            {project.team && (
              <p className="text-fun-gray text-sm">{project.team}</p>
            )}
          </div>

          {/* Tech stack */}
          <div>
            <SectionLabel icon={<StackIcon />}>Tech Stack</SectionLabel>
            <div className="flex flex-wrap gap-2 mt-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium bg-fun-pink-dark text-fun-pink rounded-lg px-3 py-1.5 border border-fun-pink border-opacity-20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Overview */}
          {project.overview && (
            <div>
              <SectionLabel icon={<OverviewIcon />}>Overview</SectionLabel>
              <p className="text-fun-gray-light leading-relaxed text-sm mt-3 pl-1 whitespace-pre-wrap">{project.overview}</p>
            </div>
          )}

          {/* Problem */}
          {project.problem && (
            <div>
              <SectionLabel icon={<ProblemIcon />}>Problem</SectionLabel>
              <div className="mt-3 rounded-xl bg-fun-pink-dark bg-opacity-40 border border-fun-pink-dark p-4">
                <p className="text-fun-gray-light leading-relaxed text-sm whitespace-pre-wrap">{project.problem}</p>
              </div>
            </div>
          )}

          {/* Architecture */}
          {project.architecture && (
            <div>
              <SectionLabel icon={<ArchIcon />}>Architecture</SectionLabel>
              <div className="mt-3">
                <ArchitectureSection arch={project.architecture} />
              </div>
            </div>
          )}

          {/* Core Features */}
          {project.features && project.features.length > 0 && (
            <div>
              <SectionLabel icon={<FeaturesIcon />}>Core Features</SectionLabel>
              <div className="mt-3 grid gap-3">
                {project.features.map((f, i) => (
                  <div key={i} className="flex gap-4 rounded-xl border border-fun-pink-dark bg-fun-pink-darkest p-4 hover:border-fun-pink hover:border-opacity-40 transition-colors">
                    <div className="shrink-0 w-7 h-7 rounded-full bg-fun-pink bg-opacity-15 border border-fun-pink border-opacity-30 flex items-center justify-center text-fun-pink text-xs font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm mb-1">{f.title}</p>
                      <p className="text-fun-gray-light text-xs leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Challenges */}
          {project.challenges && project.challenges.length > 0 && (
            <div>
              <SectionLabel icon={<ChallengeIcon />}>Technical Challenges</SectionLabel>
              <div className="mt-3 grid gap-2">
                <ChallengeAccordion challenges={project.challenges} />
              </div>
            </div>
          )}

          {/* Artifacts */}
          {project.artifacts && project.artifacts.length > 0 && (
            <div>
              <SectionLabel icon={<ArtifactIcon />}>산출물</SectionLabel>
              <div className="mt-3 grid gap-3">
                {project.artifacts.map((a, i) => (
                  <div key={i} className="rounded-xl border border-fun-pink-dark overflow-hidden">
                    {a.img && <img src={a.img} alt={a.title} className="w-full" />}
                    <div className="px-4 py-3 flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white text-sm">{a.title}</p>
                        {a.desc && <p className="text-fun-gray-light text-xs mt-1 leading-relaxed">{a.desc}</p>}
                      </div>
                      {a.url && (
                        <a
                          href={a.url}
                          target="_blank"
                          rel="noreferrer"
                          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-fun-pink text-fun-pink hover:bg-fun-pink hover:text-white transition-colors"
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/>
                          </svg>
                          바로가기
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* What I Learned */}
          {project.learning && (
            <div>
              <SectionLabel icon={<LearningIcon />}>What I Learned</SectionLabel>
              <div className="mt-3 rounded-xl border-l-2 border-fun-pink pl-4 py-1">
                <p className="text-fun-gray-light leading-relaxed text-sm italic">{project.learning}</p>
              </div>
            </div>
          )}

          {/* Links */}
          <div className="flex gap-3 pt-1 border-t border-fun-pink-dark">
            <div className="flex gap-3 mt-4">
              {project.link && project.link !== "#" && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm bg-fun-pink text-white hover:opacity-80 transition-opacity"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                    <polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm border border-white text-white hover:bg-white hover:text-bg transition-colors"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  {project.githubFrontend ? "GitHub (BE)" : "GitHub"}
                </a>
              )}
              {project.githubFrontend && (
                <a
                  href={project.githubFrontend}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm border border-white text-white hover:bg-white hover:text-bg transition-colors"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  GitHub (FE)
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Architecture Section ───────────────────────────────────────────────────

type ArchTab = 'system' | 'erd' | 'flow' | 'deploy';

const NODE_COLORS: Record<SystemNodeType, { bg: string; border: string; text: string }> = {
  client:  { bg: 'rgba(29,78,216,0.18)',  border: 'rgba(96,165,250,0.45)',  text: '#93c5fd' },
  gateway: { bg: 'rgba(161,98,7,0.18)',   border: 'rgba(234,179,8,0.45)',   text: '#fde047' },
  app:     { bg: 'rgba(0,199,255,0.08)',  border: 'rgba(0,199,255,0.40)',   text: '#00c7ff' },
  db:      { bg: 'rgba(21,128,61,0.18)',  border: 'rgba(74,222,128,0.40)',  text: '#86efac' },
  cache:   { bg: 'rgba(194,65,12,0.18)',  border: 'rgba(251,146,60,0.40)',  text: '#fdba74' },
  storage: { bg: 'rgba(109,40,217,0.18)', border: 'rgba(167,139,250,0.40)', text: '#c4b5fd' },
  ai:      { bg: 'rgba(8,145,178,0.18)',  border: 'rgba(34,211,238,0.40)',  text: '#67e8f9' },
  crawler: { bg: 'rgba(79,70,229,0.18)',  border: 'rgba(129,140,248,0.40)', text: '#a5b4fc' },
};

function ArchitectureSection({ arch }: { arch: Architecture }) {
  const tabs: { id: ArchTab; label: string }[] = [
    ...(arch.system     ? [{ id: 'system' as ArchTab, label: 'System'     }] : []),
    ...(arch.erd        ? [{ id: 'erd'    as ArchTab, label: 'ERD'        }] : []),
    ...(arch.flows      ? [{ id: 'flow'   as ArchTab, label: 'API Flow'   }] : []),
    ...(arch.deployment ? [{ id: 'deploy' as ArchTab, label: 'Deployment' }] : []),
  ];

  const [activeTab, setActiveTab] = useState<ArchTab>(tabs[0]?.id ?? 'system');

  return (
    <div className="rounded-xl border border-fun-pink-dark overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-fun-pink-dark bg-fun-pink-dark bg-opacity-20">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 text-xs font-semibold py-2.5 transition-colors ${
              activeTab === tab.id
                ? 'text-fun-pink border-b-2 border-fun-pink bg-fun-pink bg-opacity-5'
                : 'text-fun-gray hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'system' && arch.system     && <SystemDiagram   data={arch.system}     />}
        {activeTab === 'erd'    && arch.erd         && <ErdDiagram      data={arch.erd}         />}
        {activeTab === 'flow'   && arch.flows       && <ApiFlows        data={arch.flows}       />}
        {activeTab === 'deploy' && arch.deployment  && <DeploymentDiagram data={arch.deployment} />}
      </div>
    </div>
  );
}

function SystemDiagram({ data }: { data: NonNullable<Architecture['system']> }) {
  return (
    <div className="space-y-2">
      {data.rows.map((row, i) => (
        <React.Fragment key={i}>
          <div className="flex gap-2 flex-wrap justify-center">
            {row.nodes.map((node, j) => {
              const c = NODE_COLORS[node.type];
              return (
                <div
                  key={j}
                  className="rounded-lg px-3 py-2 text-center"
                  style={{
                    background: c.bg,
                    border: `1px solid ${c.border}`,
                    minWidth: '100px',
                  }}
                >
                  <div className="text-xs font-bold" style={{ color: c.text }}>{node.label}</div>
                  {node.sub && (
                    <div className="text-[10px] mt-0.5 opacity-70" style={{ color: c.text }}>
                      {node.sub}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {row.arrow && i < data.rows.length - 1 && (
            <div className="flex justify-center text-fun-gray">
              <svg width="10" height="14" viewBox="0 0 10 14" fill="currentColor">
                <path d="M5 14L0 8.5h3.5V0h3v8.5H10z" />
              </svg>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── ERD SVG constants ────────────────────────────────────────────────────
const EW  = 200; // entity width
const CG  = 52;  // column gap
const RG  = 30;  // row gap
const PT  = 60;  // top padding (arc headroom)
const PS  = 15;  // side padding
const HH  = 28;  // header height
const FH  = 18;  // field row height

type ELayout = { x: number; y: number; h: number };

function buildErdLayout(entities: ErdEntity[]): Map<string, ELayout> {
  const map = new Map<string, ELayout>();
  const cols = new Map<number, { e: ErdEntity; row: number }[]>();
  for (const e of entities) {
    const c = e.col ?? 0;
    if (!cols.has(c)) cols.set(c, []);
    cols.get(c)!.push({ e, row: e.row ?? 0 });
  }
  for (const [col, items] of Array.from(cols.entries())) {
    items.sort((a, b) => a.row - b.row);
    let y = PT;
    for (const { e } of items) {
      const x = PS + col * (EW + CG);
      const h = HH + e.fields.length * FH;
      map.set(e.name, { x, y, h });
      y += h + RG;
    }
  }
  return map;
}

function getConnPt(
  layout: Map<string, ELayout>,
  name: string,
  side: string
): { x: number; y: number } | null {
  const e = layout.get(name);
  if (!e) return null;
  if (side === 'right')  return { x: e.x + EW,      y: e.y + HH / 2 };
  if (side === 'left')   return { x: e.x,            y: e.y + HH / 2 };
  if (side === 'top')    return { x: e.x + EW / 2,   y: e.y };
  if (side === 'bottom') return { x: e.x + EW / 2,   y: e.y + e.h };
  return null;
}

function makeSvgPath(
  fp: { x: number; y: number },
  tp: { x: number; y: number },
  fs: string,
  ts: string
): { d: string; lx: number; ly: number } {
  if (fs === 'right' && ts === 'left') {
    const dx = tp.x - fp.x;
    const dy = tp.y - fp.y;
    if (Math.abs(dy) < 4) {
      if (dx > 150) {
        // Long same-level: arc above
        const arcOff = Math.min(50, dx / 6);
        const arcY = fp.y - arcOff;
        return {
          d: `M ${fp.x} ${fp.y} C ${fp.x} ${arcY} ${tp.x} ${arcY} ${tp.x} ${tp.y}`,
          lx: (fp.x + tp.x) / 2,
          ly: arcY - 8,
        };
      }
      // Short same-level: straight
      return { d: `M ${fp.x} ${fp.y} L ${tp.x} ${tp.y}`, lx: (fp.x + tp.x) / 2, ly: fp.y - 8 };
    }
    // S-curve
    const mx = (fp.x + tp.x) / 2;
    return {
      d: `M ${fp.x} ${fp.y} C ${mx} ${fp.y} ${mx} ${tp.y} ${tp.x} ${tp.y}`,
      lx: mx,
      ly: (fp.y + tp.y) / 2,
    };
  }
  if (fs === 'bottom' && ts === 'top') {
    const same = Math.abs(fp.x - tp.x) < 4;
    if (same) {
      return { d: `M ${fp.x} ${fp.y} L ${tp.x} ${tp.y}`, lx: fp.x + 14, ly: (fp.y + tp.y) / 2 };
    }
    const my = (fp.y + tp.y) / 2;
    return {
      d: `M ${fp.x} ${fp.y} C ${fp.x} ${my} ${tp.x} ${my} ${tp.x} ${tp.y}`,
      lx: (fp.x + tp.x) / 2 + 14,
      ly: my,
    };
  }
  if (fs === 'right' && ts === 'top') {
    return {
      d: `M ${fp.x} ${fp.y} L ${tp.x} ${fp.y} L ${tp.x} ${tp.y}`,
      lx: (fp.x + tp.x) / 2,
      ly: fp.y - 8,
    };
  }
  // Default bezier
  const mx2 = (fp.x + tp.x) / 2;
  return {
    d: `M ${fp.x} ${fp.y} C ${mx2} ${fp.y} ${mx2} ${tp.y} ${tp.x} ${tp.y}`,
    lx: mx2,
    ly: (fp.y + tp.y) / 2,
  };
}

function ErdDiagram({ data }: { data: NonNullable<Architecture['erd']> }) {
  const layout = buildErdLayout(data.entities);

  let maxX = 0, maxY = 0;
  for (const { x, y, h } of Array.from(layout.values())) {
    maxX = Math.max(maxX, x + EW);
    maxY = Math.max(maxY, y + h);
  }
  const svgW = maxX + PS;
  const svgH = maxY + PS + 10;

  return (
    <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '480px' }}>
      <svg
        width={svgW}
        height={svgH}
        viewBox={`0 0 ${svgW} ${svgH}`}
        style={{ display: 'block' }}
      >
        {/* Relations (behind entities) */}
        {data.relations.map((rel, i) => {
          const fs = rel.fromSide ?? 'right';
          const ts = rel.toSide   ?? 'left';
          const fp = getConnPt(layout, rel.from, fs);
          const tp = getConnPt(layout, rel.to,   ts);
          if (!fp || !tp) return null;
          const { d, lx, ly } = makeSvgPath(fp, tp, fs, ts);
          return (
            <g key={i}>
              <path d={d} fill="none" stroke="rgba(0,199,255,0.28)" strokeWidth="1.5" />
              {/* Dot at endpoints */}
              <circle cx={fp.x} cy={fp.y} r="2.5" fill="rgba(0,199,255,0.5)" />
              <circle cx={tp.x} cy={tp.y} r="2.5" fill="rgba(0,199,255,0.5)" />
              {/* Label */}
              <rect x={lx - 13} y={ly - 8} width={26} height={14} rx={3} fill="rgba(0,12,36,0.95)" />
              <text x={lx} y={ly + 4} textAnchor="middle" fill="#00c7ff" fontSize={9} fontFamily="monospace" fontWeight="bold">
                {rel.label}
              </text>
            </g>
          );
        })}

        {/* Entity boxes */}
        {data.entities.map((entity, ei) => {
          const pos = layout.get(entity.name);
          if (!pos) return null;
          const { x, y, h } = pos;
          const hl = entity.highlight;
          return (
            <g key={ei}>
              {/* Box shadow / glow */}
              {hl && (
                <rect x={x - 1} y={y - 1} width={EW + 2} height={h + 2} rx={7}
                  fill="none" stroke="rgba(0,199,255,0.15)" strokeWidth={3} />
              )}
              {/* Box border */}
              <rect x={x} y={y} width={EW} height={h} rx={6}
                fill="rgba(0,10,28,0.95)"
                stroke={hl ? 'rgba(0,199,255,0.55)' : 'rgba(25,39,66,1)'}
                strokeWidth={1.5}
              />
              {/* Header bg */}
              <rect x={x} y={y} width={EW} height={HH} rx={6}
                fill={hl ? 'rgba(0,199,255,0.12)' : 'rgba(25,39,66,0.85)'}
                stroke="none"
              />
              <rect x={x} y={y + HH - 6} width={EW} height={6}
                fill={hl ? 'rgba(0,199,255,0.12)' : 'rgba(25,39,66,0.85)'}
                stroke="none"
              />
              {/* Header separator */}
              <line x1={x} y1={y + HH} x2={x + EW} y2={y + HH}
                stroke={hl ? 'rgba(0,199,255,0.35)' : 'rgba(25,39,66,1)'}
                strokeWidth={1}
              />
              {/* Entity name */}
              <text x={x + EW / 2} y={y + 18} textAnchor="middle"
                fill={hl ? '#00c7ff' : '#ffffff'}
                fontSize={12} fontWeight="bold" fontFamily="system-ui, sans-serif"
              >
                {entity.name}
              </text>

              {/* Fields */}
              {entity.fields.map((field, fi) => {
                const fy = y + HH + fi * FH;
                const markerTxt  = field.pk ? 'PK' : field.fk ? 'FK' : field.uq ? 'UQ' : '';
                const markerCol  = field.pk ? '#fde047' : field.fk ? '#93c5fd' : field.uq ? '#86efac' : '';
                return (
                  <g key={fi}>
                    {fi > 0 && (
                      <line x1={x} y1={fy} x2={x + EW} y2={fy}
                        stroke="rgba(25,39,66,0.6)" strokeWidth={0.5}
                      />
                    )}
                    {/* Marker badge */}
                    {markerTxt && (
                      <>
                        <rect x={x + 5} y={fy + 3} width={18} height={12} rx={2}
                          fill={field.pk ? 'rgba(253,224,71,0.12)' : field.fk ? 'rgba(147,197,253,0.12)' : 'rgba(134,239,172,0.12)'}
                        />
                        <text x={x + 14} y={fy + 13} textAnchor="middle"
                          fill={markerCol} fontSize={8} fontWeight="bold" fontFamily="monospace"
                        >
                          {markerTxt}
                        </text>
                      </>
                    )}
                    {/* Field name */}
                    <text x={x + 29} y={fy + 13}
                      fill={field.pk ? '#ffffff' : field.fk ? '#b2bbcf' : '#b2bbcf'}
                      fontSize={10} fontFamily="system-ui, sans-serif"
                    >
                      {field.name}
                    </text>
                    {/* Field type */}
                    <text x={x + EW - 5} y={fy + 13} textAnchor="end"
                      fill="#7b89a8" fontSize={9} fontFamily="monospace"
                    >
                      {field.type}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function ApiFlows({ data }: { data: NonNullable<Architecture['flows']> }) {
  const [activeFlow, setActiveFlow] = useState(0);
  const flow = data[activeFlow];

  return (
    <div className="space-y-3">
      {/* Flow selector */}
      {data.length > 1 && (
        <div className="flex gap-1.5 flex-wrap">
          {data.map((f, i) => (
            <button
              key={i}
              onClick={() => setActiveFlow(i)}
              className="text-xs font-semibold px-3 py-1 rounded-full border transition-colors"
              style={{
                borderColor: activeFlow === i ? 'rgba(0,199,255,0.6)' : 'rgba(25,39,66,1)',
                color: activeFlow === i ? '#00c7ff' : '#7b89a8',
                background: activeFlow === i ? 'rgba(0,199,255,0.08)' : 'transparent',
                fontSize: '10px',
              }}
            >
              {f.title}
            </button>
          ))}
        </div>
      )}

      {/* Steps */}
      <div className="space-y-0">
        {flow.steps.map((step, i) => (
          <div key={i} className="flex gap-3 items-start">
            {/* Timeline */}
            <div className="flex flex-col items-center shrink-0" style={{ width: '24px' }}>
              <div
                className="flex items-center justify-center rounded-full font-bold"
                style={{
                  width: '22px',
                  height: '22px',
                  background: 'rgba(0,199,255,0.1)',
                  border: '1px solid rgba(0,199,255,0.35)',
                  color: '#00c7ff',
                  fontSize: '9px',
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              {i < flow.steps.length - 1 && (
                <div style={{ width: '1px', flex: 1, minHeight: '16px', background: 'rgba(25,39,66,1)', marginTop: '2px' }} />
              )}
            </div>

            {/* Content */}
            <div className="pb-3">
              <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                <span
                  className="rounded font-bold"
                  style={{
                    fontSize: '9px',
                    padding: '1px 6px',
                    background: 'rgba(0,199,255,0.1)',
                    border: '1px solid rgba(0,199,255,0.25)',
                    color: '#00c7ff',
                  }}
                >
                  {step.actor}
                </span>
                {step.async && (
                  <span
                    className="rounded"
                    style={{
                      fontSize: '9px',
                      padding: '1px 6px',
                      border: '1px solid rgba(253,186,116,0.35)',
                      color: '#fdba74',
                    }}
                  >
                    async
                  </span>
                )}
              </div>
              <p className="text-fun-gray-light" style={{ fontSize: '11px', lineHeight: '1.5' }}>{step.desc}</p>
              {step.sub && (
                <p className="text-fun-gray mt-0.5" style={{ fontSize: '10px' }}>{step.sub}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DeploymentDiagram({ data }: { data: NonNullable<Architecture['deployment']> }) {
  return (
    <div className="space-y-4">
      {/* Pipeline */}
      <div className="overflow-x-auto pb-1">
        <div className="flex items-center gap-1" style={{ minWidth: 'max-content' }}>
          {data.stages.map((stage, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center text-center" style={{ minWidth: '88px' }}>
                <div
                  className="rounded-lg w-full"
                  style={{
                    padding: '6px 8px',
                    border: '1px solid rgba(25,39,66,1)',
                    background: 'rgba(0,12,36,0.5)',
                  }}
                >
                  <div className="text-white font-bold" style={{ fontSize: '10px' }}>{stage.name}</div>
                  {stage.desc && (
                    <div className="text-fun-gray mt-0.5" style={{ fontSize: '9px' }}>{stage.desc}</div>
                  )}
                </div>
              </div>
              {i < data.stages.length - 1 && (
                <div className="text-fun-gray shrink-0" style={{ padding: '0 2px' }}>
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor">
                    <path d="M9 0L14 5l-5 5V7H0V3h9V0z" />
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Infrastructure */}
      {data.infra && data.infra.length > 0 && (
        <div>
          <p className="text-fun-gray uppercase tracking-widest mb-2" style={{ fontSize: '9px' }}>Infrastructure</p>
          <div className="flex flex-wrap gap-1.5">
            {data.infra.map((item, i) => (
              <span
                key={i}
                className="rounded-full text-fun-gray-light"
                style={{
                  fontSize: '10px',
                  padding: '2px 10px',
                  border: '1px solid rgba(25,39,66,1)',
                  background: 'rgba(0,12,36,0.3)',
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Challenge Accordion ────────────────────────────────────────────────────

function ChallengeAccordion({ challenges }: { challenges: { title: string; desc: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="grid gap-2">
      {challenges.map((c, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="rounded-xl border transition-colors"
            style={{
              borderColor: isOpen ? 'rgba(0,199,255,0.35)' : 'rgba(25,39,66,1)',
              background: isOpen ? 'rgba(0,199,255,0.04)' : 'transparent',
            }}
          >
            <button
              className="w-full flex items-center gap-3 p-4 text-left"
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              <span
                className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px]"
                style={{
                  background: isOpen ? 'rgba(0,199,255,0.15)' : 'rgba(25,39,66,0.8)',
                  border: `1px solid ${isOpen ? 'rgba(0,199,255,0.4)' : 'rgba(25,39,66,1)'}`,
                  color: isOpen ? '#00c7ff' : '#7b89a8',
                }}
              >
                {i + 1}
              </span>
              <span className="flex-1 font-semibold text-sm" style={{ color: isOpen ? '#ffffff' : '#c8d0e0' }}>
                {c.title}
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 transition-transform duration-200"
                style={{
                  color: isOpen ? '#00c7ff' : '#4a5568',
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {isOpen && (
              <div className="px-4 pb-4 pt-0">
                <div
                  className="rounded-lg p-3 text-xs leading-relaxed whitespace-pre-wrap"
                  style={{
                    background: 'rgba(0,10,28,0.5)',
                    border: '1px solid rgba(25,39,66,0.8)',
                    color: '#8892a4',
                  }}
                >
                  {c.desc}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Shared UI ──────────────────────────────────────────────────────────────

function SectionLabel({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-fun-pink">{icon}</span>
      <h3 className="text-xs font-bold uppercase tracking-widest text-fun-pink">{children}</h3>
    </div>
  );
}

// Icons
const StackIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
  </svg>
);
const OverviewIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);
const ProblemIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const ArchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="6" height="6" rx="1"/><rect x="16" y="3" width="6" height="6" rx="1"/><rect x="9" y="15" width="6" height="6" rx="1"/>
    <line x1="5" y1="9" x2="5" y2="13"/><line x1="19" y1="9" x2="19" y2="13"/>
    <line x1="5" y1="13" x2="19" y2="13"/><line x1="12" y1="13" x2="12" y2="15"/>
  </svg>
);
const FeaturesIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
  </svg>
);
const ChallengeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
  </svg>
);
const LearningIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
  </svg>
);

const ArtifactIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
  </svg>
);

export default ProjectModal;
