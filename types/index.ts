export type SystemNodeType = 'client' | 'gateway' | 'app' | 'db' | 'cache' | 'storage' | 'ai' | 'crawler';

export type ErdField = {
  name: string;
  type: string;
  pk?: boolean;
  fk?: boolean;
  uq?: boolean;
};

export type ErdEntity = {
  name: string;
  col: number;
  row: number;
  highlight?: boolean;
  fields: ErdField[];
};

export type ErdRelation = {
  from: string;
  to: string;
  label: string;
  fromSide?: 'right' | 'bottom' | 'left' | 'top';
  toSide?: 'left' | 'top' | 'right' | 'bottom';
};

export type Architecture = {
  system?: {
    rows: {
      nodes: { label: string; sub?: string; type: SystemNodeType }[];
      arrow?: boolean;
    }[];
  };
  erd?: {
    entities: ErdEntity[];
    relations: ErdRelation[];
  };
  flows?: {
    title: string;
    steps: { actor: string; desc: string; async?: boolean; sub?: string }[];
  }[];
  deployment?: {
    stages: { name: string; desc?: string }[];
    infra?: string[];
  };
};

export type Project = {
  id: number;
  title: string;
  desc: string;
  img: string;
  link?: string;
  github?: string;
  tags: string[];
  // Detail fields for modal
  period?: string;
  role?: string;
  team?: string;
  overview?: string;
  problem?: string;
  features?: { title: string; desc: string }[];
  challenges?: { title: string; desc: string }[];
  learning?: string;
  architecture?: Architecture;
};
