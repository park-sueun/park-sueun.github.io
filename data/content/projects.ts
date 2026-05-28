import { kebabCase, kebabArray } from "@/utils/utils";
import { Project } from "types";

const projects: Project[] = [
  {
    id: 0,
    title: "음어그 (U-U-G)",
    desc: "채용 공고 URL 하나로 AI가 맞춤 면접 질문을 생성하고, 실시간 음성 분석으로 습관어·침묵·논리 구조까지 피드백하는 면접 스피치 코칭 서비스.",
    img: "/static/projects/uug.png",
    link: "https://u-u-g-frontend.vercel.app",
    github: "https://github.com/U-U-G/U-U-G-backend",
    tags: [
      "Java 21",
      "Spring Boot 4.0.5",
      "Spring Boot JPA",
      "MySQL",
      "Docker",
      "JWT",
      "OAuth2.0",
      "REST API",
      "Playwright",
      "WebFlux",
      "SSE",
      "gemini-3.1-flash-lite-preview",
      "claude-sonnet-4-5",
    ],
    period: "2026.03 – 2026.05",
    role: "Tech Lead & Backend Developer",
    team: "팀 프로젝트 (PM 1명 · BE 3명 · FE 2명 · UX/UI 1명)",
    overview: `AI 기반 모의 면접 및 스피치 분석 플랫폼입니다. 채용 공고 URL을 입력하면 회사·직무·기술 스택을 분석해 맞춤형 면접 질문을 생성하고, 사용자의 답변 음성을 분석하여 침묵 구간·볼륨 변화·습관어 사용 등을 피드백합니다. 
또한 면접 연습 결과를 회차별로 저장·비교하여 개선 흐름을 추적할 수 있으며, AI 추천 커리큘럼과 면접 일정 관리 기능을 통해 지속적인 면접 학습 경험을 제공합니다.`,
    problem: `기존 면접 준비 방식은 범용 질문 위주의 연습에 머무르는 경우가 많았고, 실제 면접에서 등장하는 기업별 서비스·기술 스택·직무 기반 질문에 즉흥적으로 대응하기 어려운 문제가 있었습니다.
    
특히 취업 준비생들은:
- 지원 기업에 맞는 면접 질문을 직접 수집·정리해야 했고,
- 자신의 말버릇이나 침묵 습관을 객관적으로 파악하기 어려웠으며,
- 면접 연습 결과를 지속적으로 관리·비교할 수 있는 도구가 부족했습니다.

이 프로젝트는 이러한 문제를 해결하기 위해, 채용 공고 기반 질문 생성과 실시간 스피치 분석을 결합하여 사용자가 실제 면접 환경에 가까운 방식으로 반복 학습할 수 있도록 설계했습니다.`,
    features: [
      {
        title: "채용 공고 기반 AI 질문 생성 파이프라인",
        desc: `채용 공고 URL 입력만으로 크롤링 → 본문 정제 → 직무·기술 스택 추출 → AI 프롬프트 생성 → 맞춤형 면접 질문 생성까지 이어지는 자동화 파이프라인을 구축했습니다.
다양한 채용 플랫폼의 동적 페이지 데이터를 수집하고, 직무·기술 스택 단위로 데이터를 가공하여 기업 맞춤형 면접 질문을 생성할 수 있도록 설계했습니다.`,
      },
      {
        title: "면접 세션 상태 관리 및 분석 리포트 시스템",
        desc: `면접 진행 상태를 Session Lifecycle 기반으로 관리하고, 질문·답변·분석 결과를 연결하는 도메인 중심 구조를 설계했습니다.
답변 텍스트·발화 시간·침묵 시간 데이터를 기반으로 평균 침묵 시간, 습관어 빈도, 질문별 점수 등을 분석하여 리포트를 생성했으며, 회차별 결과 비교를 통해 사용자의 성장 흐름을 추적할 수 있도록 구현했습니다.`,
      },
      {
        title: "AI 기반 커리큘럼 추천 시스템",
        desc: `면접 분석 결과를 기반으로 사용자의 부족 영역을 추출하고, 우선순위 기반 AI 커리큘럼을 생성하는 추천 시스템을 구현했습니다.
단순 결과 저장이 아닌 회차별 분석 데이터를 기반으로 사용자의 변화량을 계산하고, 이후 학습 방향까지 연결될 수 있도록 설계했습니다.`,
      },
    ],
    challenges: [
      {
        title: "Selenium 기반 크롤러 성능 개선",
        desc: `문제
채용 URL 입력 후 질문 생성까지 평균 30초~1분 소요. CSR 기반 플랫폼 렌더링 대기, 크롤링·AI 분석의 동기 순차 처리, 동일 URL 반복 분석이 복합적으로 작용했습니다.

원인
· Selenium WebDriver 특성상 CSR 렌더링 완료까지 대기하며 오버헤드 발생
· 크롤링 → 정제 → AI 분석 → 질문 생성이 하나의 API 요청에 순차 처리되어 지연 누적
· 이미 분석된 공고도 매번 재크롤링·AI 재분석 수행

해결
· Playwright(Java) 전환: 이미지·폰트 차단, 3단계 Selector Fallback, ThreadLocal 기반 Chromium 재사용 (Playwright Java 객체의 스레드 비안전성 고려)
· @Async 비동기 분리: 크롤링과 AI 분석을 분리하여 사용자 대기 시간 단축
· DB 캐싱: 동일 URL 재요청 시 재크롤링 없이 저장된 결과 재사용

결과
크롤링 ~3초 / AI 분석 ~8초 수준으로 단축. 외부 API 호출 비용 및 서버 리소스 사용량 감소.`,
      },
      {
        title: "AI Provider 최적화 및 Fallback 구조 설계",
        desc: `문제
Gemini 단일 Provider 의존으로 요청 집중 시간대 timeout·응답 실패가 반복 발생했습니다. AI 질문 생성이 서비스 핵심 기능이었기에 Provider 하나의 장애가 서비스 전체 품질을 직접 흔들었습니다.

원인
· 무료 플랜 기반 rate limit 및 처리 속도 불안정
· AI 호출 로직이 특정 Provider에 강결합되어 모델 교체·장애 대응이 어려운 구조

해결
· Provider Interface 추상화: Service → Gemini 직접 호출 → Service → AI Provider Interface → Gemini/Claude 구조로 전환
· 응답 속도·토큰 사용량·비용·응답 품질·Rate Limit 안정성 기준으로 직접 테스트 후 Provider별 최적 모델 선정
· 우선순위 기반 Fallback: Rate Limit 감지 → 자동 재시도 → Gemini 폴백 순 자동 전환

결과
요청 집중 시간대 응답 안정성 개선, AI 질문 생성 실패율 감소, 모델 교체·확장 용이성 확보.`,
      },
      {
        title: "Polling 대신 SSE(Server-Sent Events) 도입",
        desc: `문제
면접 진행 상태·AI 분석 결과 전달에 Polling 방식을 검토했으나, 실제 데이터 변경이 없어도 반복 요청이 발생하는 구조로 사용자 증가 시 서버 부하가 크게 늘어날 수 있었습니다.

기술 선택 과정
· WebSocket 검토 → 실제 요구사항은 서버 → 클라이언트 단방향 전송이 핵심. 양방향 구현 복잡도와 연결 관리 비용이 불필요하다고 판단
· SSE 선택: HTTP 기반 단방향 이벤트 스트리밍으로 현재 요구사항에 적합, 연결 관리 단순

구현 중 발생한 문제
· 트랜잭션 커밋 전 SSE 이벤트 전송 시 데이터 정합성 문제
  → Spring TransactionSynchronization AFTER_COMMIT 이벤트 처리 구조로 해결
· 분석 작업·SSE 이벤트 전송이 같은 Executor 공유로 비동기 불안정
  → Executor 분리로 책임 분리 및 안정성 개선

결과
Polling 제거로 불필요한 반복 요청 감소, 서버 부하 감소, 실시간 이벤트 전달 지연 감소.`,
      },
    ],
    learning: `이번 프로젝트에서는 단순한 기능 구현을 넘어, 프로젝트의 방향성과 완성도를 함께 고민하는 경험을 할 수 있었습니다. 이전까지는 주로 배우고 따라가는 입장에서 개발에 참여했다면, 이번에는 백엔드 팀 내에서 비교적 개발 경험이 많은 팀원으로 참여하게 되면서 자연스럽게 일정과 우선순위까지 함께 고려하게 되었습니다.

특히 제한된 6주 일정 안에서 어떤 기능을 먼저 구현해야 하는지, 일정이 부족할 경우 어떤 범위를 조정해야 하는지, 팀이 끝까지 프로젝트를 완주하기 위해 무엇이 필요한지를 지속적으로 고민하며 개발을 진행했습니다. 그 과정에서 모든 기능을 완벽하게 구현하려 하기보다, 사용자에게 전달해야 하는 핵심 가치를 우선적으로 동작시키는 것이 중요하다는 점을 배울 수 있었습니다.

기술적으로도 많은 인사이트를 얻을 수 있었습니다. 채용 공고 분석, AI 질문 생성, 실시간 음성 분석과 같이 외부 AI API 및 크롤러에 의존하는 기능이 많았기 때문에, 내가 직접 통제할 수 없는 시스템을 전제로 안정성을 고려해야 했습니다. 이를 통해 API 실패 상황을 대비한 예외 처리, 응답 지연에 대한 폴백 전략, 의존성 분리를 위한 추상화 구조의 필요성을 체감할 수 있었습니다.

이번 경험을 통해 개발은 단순히 기능을 구현하는 작업이 아니라, 제한된 시간과 불확실한 환경 속에서도 우선순위를 판단하고 안정적으로 서비스를 완성해나가는 과정이라는 점을 배울 수 있었습니다.`,
    architecture: {
      system: {
        rows: [
          {
            nodes: [{ type: "client", label: "Web Frontend", sub: "Next.js · Vercel" }],
            arrow: true,
          },
          {
            nodes: [{ type: "gateway", label: "Nginx", sub: "Reverse Proxy · TLS/SSL" }],
            arrow: true,
          },
          {
            nodes: [{ type: "app", label: "Spring Boot", sub: "Java 21 · Blue-Green · EC2" }],
            arrow: true,
          },
          {
            nodes: [
              { type: "db",      label: "MySQL 8.4",      sub: "AWS RDS"             },
              { type: "cache",   label: "Redis",           sub: "토큰 · 인증코드"     },
              { type: "storage", label: "AWS S3",          sub: "미디어 저장"          },
              { type: "ai",      label: "Claude / Gemini", sub: "멀티 AI 프로바이더"  },
              { type: "crawler", label: "Playwright",      sub: "채용공고 크롤링"      },
            ],
          },
        ],
      },
      erd: {
        entities: [
          // ── col 0 ──────────────────────────────────────────────
          {
            name: "User", col: 0, row: 0, highlight: true,
            fields: [
              { name: "id",           type: "BIGINT",  pk: true           },
              { name: "uuid",         type: "UUID",    uq: true           },
              { name: "email",        type: "VARCHAR", uq: true           },
              { name: "password",     type: "VARCHAR"                     },
              { name: "role",         type: "ENUM"                        },
              { name: "provider",     type: "ENUM"                        },
              { name: "providerId",   type: "VARCHAR"                     },
              { name: "refreshToken", type: "VARCHAR"                     },
            ],
          },
          {
            name: "JobPosting", col: 0, row: 1, highlight: true,
            fields: [
              { name: "id",              type: "BIGINT",  pk: true },
              { name: "uuid",            type: "UUID"              },
              { name: "user_id",         type: "BIGINT",  fk: true },
              { name: "url",             type: "VARCHAR"           },
              { name: "status",          type: "ENUM"              },
              { name: "companyName",     type: "VARCHAR"           },
              { name: "position",        type: "VARCHAR"           },
              { name: "requiredSkills",  type: "TEXT"              },
              { name: "preferredSkills", type: "TEXT"              },
            ],
          },
          // ── col 1 ──────────────────────────────────────────────
          {
            name: "Profile", col: 1, row: 0,
            fields: [
              { name: "id",              type: "BIGINT",  pk: true           },
              { name: "user_id",         type: "BIGINT",  fk: true, uq: true },
              { name: "nickname",        type: "VARCHAR", uq: true           },
              { name: "profileImageUrl", type: "VARCHAR"                     },
            ],
          },
          // ── col 2 ──────────────────────────────────────────────
          {
            name: "InterviewSession", col: 2, row: 0, highlight: true,
            fields: [
              { name: "id",             type: "BIGINT",  pk: true },
              { name: "uuid",           type: "UUID",    uq: true },
              { name: "user_id",        type: "BIGINT",  fk: true },
              { name: "job_posting_id", type: "BIGINT",  fk: true },
              { name: "status",         type: "ENUM"              },
              { name: "retry",          type: "BOOLEAN"           },
              { name: "attemptNumber",  type: "INT"               },
              { name: "interviewDate",  type: "DATE"              },
              { name: "startedAt",      type: "DATETIME"          },
              { name: "endedAt",        type: "DATETIME"          },
            ],
          },
          {
            name: "InterviewReport", col: 2, row: 1,
            fields: [
              { name: "id",           type: "BIGINT",  pk: true            },
              { name: "uuid",         type: "UUID",    uq: true            },
              { name: "session_id",   type: "BIGINT",  fk: true, uq: true  },
              { name: "aiSummary",    type: "TEXT"                         },
              { name: "silenceScore", type: "INT"                          },
              { name: "fillerScore",  type: "INT"                          },
              { name: "logicScore",   type: "INT"                          },
              { name: "totalScore",   type: "INT"                          },
              { name: "status",       type: "ENUM"                         },
            ],
          },
          // ── col 3 ──────────────────────────────────────────────
          {
            name: "InterviewQuestion", col: 3, row: 0,
            fields: [
              { name: "id",            type: "BIGINT",  pk: true },
              { name: "uuid",          type: "UUID",    uq: true },
              { name: "session_id",    type: "BIGINT",  fk: true },
              { name: "content",       type: "TEXT"              },
              { name: "sequenceOrder", type: "INT"               },
            ],
          },
          // ── col 4 ──────────────────────────────────────────────
          {
            name: "InterviewAnswer", col: 4, row: 0,
            fields: [
              { name: "id",             type: "BIGINT",  pk: true },
              { name: "uuid",           type: "UUID",    uq: true },
              { name: "question_id",    type: "BIGINT",  fk: true },
              { name: "totalElapsedMs", type: "INT"               },
              { name: "transcript",     type: "TEXT"              },
              { name: "fillerWords",    type: "TEXT(JSON)"        },
              { name: "silencePeriods", type: "TEXT(JSON)"        },
              { name: "speechPeriods",  type: "TEXT(JSON)"        },
            ],
          },
          {
            name: "AnswerAnalysis", col: 4, row: 1,
            fields: [
              { name: "id",                  type: "BIGINT",  pk: true            },
              { name: "uuid",                type: "UUID",    uq: true            },
              { name: "answer_id",           type: "BIGINT",  fk: true, uq: true  },
              { name: "totalSilenceDuration",type: "INT"                          },
              { name: "silenceCount",        type: "INT"                          },
              { name: "fillerWords",         type: "JSON"                         },
              { name: "aiReview",            type: "TEXT"                         },
              { name: "logicScore",          type: "INT"                          },
              { name: "silenceScore",        type: "INT"                          },
              { name: "fillerScore",         type: "INT"                          },
              { name: "totalScore",          type: "INT"                          },
            ],
          },
        ],
        relations: [
          { from: "User",              to: "Profile",            label: "1:1"                                    },
          { from: "User",              to: "JobPosting",         label: "1:N", fromSide: "bottom", toSide: "top"  },
          { from: "User",              to: "InterviewSession",   label: "1:N"                                    },
          { from: "JobPosting",        to: "InterviewSession",   label: "1:N"                                    },
          { from: "InterviewSession",  to: "InterviewQuestion",  label: "1:N"                                    },
          { from: "InterviewSession",  to: "InterviewReport",    label: "1:1", fromSide: "bottom", toSide: "top"  },
          { from: "InterviewQuestion", to: "InterviewAnswer",    label: "1:1"                                    },
          { from: "InterviewAnswer",   to: "AnswerAnalysis",     label: "1:1", fromSide: "bottom", toSide: "top"  },
        ],
      },
      flows: [
        {
          title: "채용공고 분석",
          steps: [
            { actor: "Client",         desc: "POST /api/job-postings — URL 입력" },
            { actor: "Service",        desc: "JobPosting 생성 (PENDING) → TransactionalEvent 발행" },
            { actor: "CrawlerFactory", desc: "플랫폼 감지 후 Playwright 크롤러 실행", async: true, sub: "Wanted · Saramin · JobKorea 셀렉터 추상화" },
            { actor: "AiService",      desc: "공고 텍스트 AI 파싱 (회사·직무·기술스택)", async: true, sub: "Claude 우선 → Gemini 폴백, 최대 3회 재시도" },
            { actor: "SSE",            desc: "JOB_POSTING_ANALYSIS_DONE → 클라이언트 스트리밍", sub: "GET /api/job-postings/{uuid}/stream" },
          ],
        },
        {
          title: "면접 질문 생성",
          steps: [
            { actor: "Client",    desc: "POST /api/interview-sessions — jobPostingUuid + 날짜" },
            { actor: "Service",   desc: "InterviewSession 생성 (READY) → 이벤트 발행" },
            { actor: "AiService", desc: "공고 분석 기반 맞춤 질문 N개 생성", async: true, sub: "버전 관리된 프롬프트 템플릿 사용" },
            { actor: "SSE",       desc: "QUESTIONS_READY → 클라이언트 스트리밍", sub: "GET /api/interview-sessions/{uuid}/stream" },
          ],
        },
        {
          title: "답변 분석 & 리포트",
          steps: [
            { actor: "Client",        desc: "POST /api/questions/{uuid}/answers — STT + 침묵 구간 + 오디오 URL" },
            { actor: "AnswerService", desc: "InterviewAnswer 저장 → 전체 제출 완료 시 이벤트 발행" },
            { actor: "AiService",     desc: "질문별 논리·완성도 분석", async: true },
            { actor: "ReportService", desc: "세션 전체 리포트 생성 (침묵·습관어·논리 점수)", async: true },
            { actor: "SSE",           desc: "SESSION_ANALYSIS_DONE → 클라이언트 스트리밍" },
          ],
        },
      ],
      deployment: {
        stages: [
          { name: "Push",         desc: "develop 브랜치"              },
          { name: "CI Build",     desc: "JAR 빌드 (JDK 21)"          },
          { name: "Docker Build", desc: "멀티 스테이지 + Playwright"  },
          { name: "ECR Push",     desc: "AWS Container Registry"     },
          { name: "EC2 Deploy",   desc: "SSH → compose up"           },
          { name: "Blue-Green",   desc: "Nginx 트래픽 전환"           },
        ],
        infra: [
          "AWS EC2 (Blue-Green)",
          "AWS RDS MySQL 8.4",
          "AWS ECR",
          "AWS S3",
          "Docker",
          "Nginx",
        ],
      },
    },
  },
  {
    id: 1,
    title: "Project Two",
    desc: "An elegant data visualization tool that transforms complex datasets into clear insights.",
    img: "/static/projects/project2.png",
    link: "#",
    github: "https://github.com/park-sueun",
    tags: ["Python", "NodeJS", "CSS"],
  },
  {
    id: 2,
    title: "Project Three",
    desc: "A creative design system with reusable components and a consistent visual language.",
    img: "/static/projects/project3.png",
    github: "https://github.com/park-sueun",
    tags: ["HTML", "CSS", "Figma"],
  },
  {
    id: 3,
    title: "Project Four",
    desc: "A full-stack web service with authentication, real-time features, and clean API design.",
    img: "/static/projects/project4.png",
    link: "#",
    github: "https://github.com/park-sueun",
    tags: ["NextJS", "Firebase", "TypeScript"],
  },
  {
    id: 4,
    title: "Project Five",
    desc: "A command-line tool that automates repetitive development tasks with ease.",
    img: "/static/projects/project5.png",
    github: "https://github.com/park-sueun",
    tags: ["Python", "CLI", "NodeJS"],
  },
  {
    id: 5,
    title: "Project Six",
    desc: "An open-source library that simplifies complex UI interactions for React apps.",
    img: "/static/projects/project6.png",
    github: "https://github.com/park-sueun",
    tags: ["React", "TypeScript", "NPM"],
  },
];

export const allTags: string[] = []

projects.forEach((project) => {
  project.tags.forEach((tag) => !allTags.includes(tag) && allTags.push(tag))
});

export const allKebabTags = allTags.map(tag => (
  kebabCase(tag)
))

export default projects
