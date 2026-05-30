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
    role: "백엔드 개발",
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
    title: "Jobs for 2nd / 3rd Visa in Australia",
    desc: "호주 워킹홀리데이 2nd, 3rd 비자 취득을 위한 농공장 구인 정보를 지도 기반으로 탐색하는 풀스택 플랫폼.",
    img: "/static/projects/88days.png",
    link: "https://88days-jobs-au.vercel.app/places",
    github: "https://github.com/park-sueun/88days-jobs-au-backend",
    githubFrontend: "https://github.com/park-sueun/88days-jobs-au-frontend",
    tags: [
      "Java 17",
      "Spring Boot 4.0.3",
      "MySQL",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React Query",
      "Leaflet",
      "Docker",
      "Fly.io",
      "Vercel",
      "JWT",
      "Google Maps API",
    ],
    period: "2024.12 – 2025.03",
    role: "풀스택 개발",
    team: "개인 프로젝트",
    overview: `호주 워킹홀리데이 2nd, 3rd 비자 취득 조건인 88일 이상 지정 업종 근무를 위해, 농장·공장·어업 등 구인 정보를 지도 위에서 탐색할 수 있는 풀스택 플랫폼입니다.
호주 현지 페이스북 커뮤니티에서 구인 정보를 직접 수집하고, Google Maps API로 위경도·주소·연락처를 자동 보강한 뒤 Google Sheets → Apps Script → MySQL 파이프라인으로 마이그레이션했습니다.
Leaflet 지도에 Supercluster 기반 마커 클러스터링을 적용하여 수백 개 구인 정보를 인터랙티브하게 탐색할 수 있으며, Fly.io(백엔드)와 Vercel(프론트엔드)에 실서비스로 배포했습니다.`,
    problem: `호주 워킹홀리데이 2nd, 3rd 비자를 위한 88일 요건을 충족하려면 농장·공장 일자리를 직접 찾아야 합니다. 

기존에는:
- 페이스북 커뮤니티 게시글을 일일이 수동으로 확인해야 했고
- 위치 정보가 없거나 부정확해 실제 이동 거리를 파악하기 어려웠으며
- 비자 연장 가능 여부·숙소 제공 여부 등 핵심 정보가 산재되어 있었습니다.

구인 정보를 한곳에서 지도 기반으로 탐색하고, 조건별로 필터링할 수 있는 서비스가 필요했습니다.`,
    features: [
      {
        title: "지도 기반 구인 정보 탐색",
        desc: `Google Maps API는 사용량 기반 과금 구조라 개인 프로젝트 운영 비용 부담이 컸습니다. Leaflet + OpenStreetMap은 무료로 동일한 지도 기능을 제공하여 선택했습니다.
Supercluster 기반 마커 클러스터링을 적용하여 클러스터 크기에 따라 이모지 pill·원형 배지로 시각화했습니다.
마커 클릭 → 미니 카드 → 상세 패널의 2단계 UX, 경계 기반 API 자동 호출(300ms debounce + grid snapping)로 불필요한 요청을 최소화했습니다.`,
      },
      {
        title: "다중 조건 필터링 및 URL 동기화",
        desc: `주(State)·카테고리·작물 종류·계절·비자 연장 가능 여부·숙소 제공 여부를 조합 필터링할 수 있습니다.
필터 상태를 URL 파라미터와 동기화하여 필터 공유 및 새로고침 후 복원을 지원합니다.
React Query 기반 캐싱으로 동일 조건 재요청 시 API 호출 없이 캐시를 반환합니다.`,
      },
      {
        title: "데이터 수집·보강 파이프라인",
        desc: `호주 페이스북 커뮤니티에서 구인 정보를 직접 수집했습니다.
Google Maps Places/Geocoding API로 농장명 기반 위경도·상세주소·연락처를 자동 보강하고, Google Sheets에서 Google Apps Script로 파싱·정제하여 MySQL DB에 마이그레이션했습니다.`,
      },
    ],
    challenges: [
      {
        title: "위치 데이터 수집 및 보강 자동화",
        desc: `문제
페이스북 구인 게시글에는 정확한 주소 대신 농장 이름이나 마을명만 기재된 경우가 많아, 지도 마커 표시에 필요한 위경도 데이터를 확보하기 어려웠습니다.

해결
· Google Maps Places API로 농장명·지역명 검색 → 위경도·상세주소 자동 수집
· Geocoding API로 주소 문자열 → 좌표 변환
· Google Sheets에 수집한 원본 데이터를 Google Apps Script로 파싱·정제 후 MySQL INSERT 쿼리 생성

결과
수작업 없이 정확한 위치 데이터 확보. 수집한 구인 정보를 지도 마커로 즉시 시각화 가능.`,
      },
      {
        title: "마커 과밀 및 불필요한 API 호출 최적화",
        desc: `문제
수백 개 마커를 그대로 렌더링하면 브라우저 성능이 크게 저하되고, 지도를 조금만 이동해도 매번 API가 재호출되는 문제가 있었습니다.

해결
· Supercluster 클러스터링: 줌 레벨에 따라 인접 마커를 자동 병합, 클러스터 크기별 색상·이모지 시각화
· Grid Snapping: 지도 경계를 줌 레벨 기반 그리드 단위로 스냅하여 미세 이동 시 동일 쿼리 재사용
· 300ms Debounce: 빠른 이동 중 불필요한 중간 요청 제거

결과
마커 수와 무관하게 안정적인 렌더링 성능 유지, API 호출 횟수 대폭 감소.`,
      },
    ],
    learning: `이번 프로젝트는 실제 필요에서 시작한 개인 프로젝트였습니다. 호주 현지에서 직접 농장 일자리를 찾으며 겪은 불편함을 서비스로 풀어보고 싶었고, 혼자서 기획부터 데이터 수집·백엔드·프론트엔드·배포까지 전 과정을 담당했습니다.

가장 많이 배운 부분은 데이터 수집 파이프라인이었습니다. 정제되지 않은 SNS 데이터를 실제 서비스에 쓸 수 있는 형태로 변환하는 과정에서 Google Maps API·Apps Script를 직접 다루며, 외부 API를 활용한 데이터 보강 전략을 경험했습니다.

지도 기반 서비스를 처음 구현하면서 Leaflet·Supercluster의 동작 방식, SSR 환경에서의 클라이언트 라이브러리 처리, 맵 경계 기반 API 설계 등 위치 기반 서비스 특유의 기술적 고려사항을 체득할 수 있었습니다.

풀스택을 혼자 담당하면서 백엔드와 프론트엔드 사이의 API 계약을 스스로 설계하고 맞춰가는 경험도 값졌습니다. 기능 단위로 백-프론트를 함께 개발하며 전체 데이터 흐름을 머릿속에 그리는 습관이 생겼습니다.`,
    architecture: {
      system: {
        rows: [
          {
            nodes: [{ type: "client", label: "Web Frontend", sub: "Next.js · Vercel" }],
            arrow: true,
          },
          {
            nodes: [{ type: "app", label: "Spring Boot", sub: "Java 17 · Fly.io · Docker" }],
            arrow: true,
          },
          {
            nodes: [
              { type: "db",      label: "MySQL 8",        sub: "구인 정보 · 사용자"     },
              { type: "crawler", label: "Google Maps API", sub: "위경도 · 주소 보강"     },
              { type: "storage", label: "Google Sheets",   sub: "Apps Script 파이프라인" },
            ],
          },
        ],
      },
      erd: {
        entities: [
          {
            name: "User", col: 0, row: 0, highlight: true,
            fields: [
              { name: "id",              type: "BIGINT",  pk: true           },
              { name: "email",           type: "VARCHAR", uq: true           },
              { name: "password",        type: "VARCHAR"                     },
              { name: "firstName",       type: "VARCHAR"                     },
              { name: "lastName",        type: "VARCHAR"                     },
              { name: "role",            type: "ENUM"                        },
            ],
          },
          {
            name: "RefreshToken", col: 0, row: 1,
            fields: [
              { name: "id",        type: "BIGINT",  pk: true           },
              { name: "user_id",   type: "BIGINT",  fk: true           },
              { name: "token",     type: "VARCHAR"                     },
              { name: "expiresAt", type: "DATETIME"                    },
            ],
          },
          {
            name: "Place", col: 1, row: 0, highlight: true,
            fields: [
              { name: "id",                     type: "BIGINT",  pk: true },
              { name: "name",                   type: "VARCHAR"           },
              { name: "address",                type: "VARCHAR"           },
              { name: "latitude",               type: "DOUBLE"            },
              { name: "longitude",              type: "DOUBLE"            },
              { name: "category",               type: "ENUM"              },
              { name: "state",                  type: "VARCHAR"           },
              { name: "season",                 type: "VARCHAR"           },
              { name: "cropType",               type: "VARCHAR"           },
              { name: "payRate",                type: "VARCHAR"           },
              { name: "isVisaExtensionEligible",type: "BOOLEAN"           },
              { name: "hasAccommodation",       type: "BOOLEAN"           },
              { name: "status",                 type: "ENUM"              },
            ],
          },
          {
            name: "Contact", col: 2, row: 0,
            fields: [
              { name: "id",       type: "BIGINT",  pk: true           },
              { name: "place_id", type: "BIGINT",  fk: true           },
              { name: "name",     type: "VARCHAR"                     },
              { name: "phone",    type: "VARCHAR"                     },
              { name: "email",    type: "VARCHAR"                     },
            ],
          },
        ],
        relations: [
          { from: "User",  to: "RefreshToken", label: "1:N", fromSide: "bottom", toSide: "top" },
          { from: "Place", to: "Contact",      label: "1:N" },
        ],
      },
      flows: [
        {
          title: "지도 탐색",
          steps: [
            { actor: "Client",  desc: "지도 이동 → 경계 좌표 계산 (Grid Snapping + 300ms Debounce)" },
            { actor: "Client",  desc: "GET /api/places?minLat=&maxLat=&minLng=&maxLng=&filters..." },
            { actor: "Service", desc: "JPA Specification으로 경계 + 필터 조건 조합 쿼리" },
            { actor: "Client",  desc: "Supercluster로 마커 클러스터링 → Leaflet 렌더링" },
            { actor: "Client",  desc: "마커 클릭 → 미니 카드 → 상세 패널 2단계 UX" },
          ],
        },
        {
          title: "데이터 수집 파이프라인",
          steps: [
            { actor: "Manual",       desc: "Facebook 커뮤니티에서 구인 정보 수집 → Google Sheets 입력" },
            { actor: "Google Maps",  desc: "Places / Geocoding API로 위경도·주소·연락처 자동 보강", async: true },
            { actor: "Apps Script",  desc: "Sheets 데이터 파싱·정제 → MySQL INSERT 쿼리 생성", async: true },
            { actor: "MySQL",        desc: "구인 정보 DB 적재 완료 → 지도 마커로 즉시 표시" },
          ],
        },
      ],
      deployment: {
        stages: [
          { name: "Code",          desc: "GitHub main"            },
          { name: "Docker Build",  desc: "Multi-stage (JDK 17)"  },
          { name: "Fly.io Deploy", desc: "Sydney 리전 · HTTPS"   },
        ],
        infra: [
          "Fly.io (백엔드)",
          "Vercel (프론트엔드)",
          "MySQL 8",
          "Docker",
          "Google Maps API",
          "Google Apps Script",
        ],
      },
    },
  },
  {
    id: 2,
    title: "점프핏 (JumpFit)",
    desc: "점핑 피트니스 센터의 카카오톡 수기 예약을 시스템화한 이용권 기반 예약·회원 관리 서비스.",
    img: "/static/projects/jumpfit.png",
    github: "https://github.com/park-sueun/jumpfit-backend",
    tags: [
      "Python",
      "Django",
      "PostgreSQL",
      "DRF",
      "JWT",
      "OAuth2.0",
      "Docker",
      "Nginx",
      "Gunicorn",
    ],
    period: "2024.04 – 2024.10",
    role: "기획 · 디자인 · 백엔드 개발",
    team: "팀 프로젝트 (2명)",
    overview: `점핑 피트니스 센터 운영자가 카카오톡으로 수기 관리하던 예약·회원·이용권 업무를 시스템화한 예약 관리 서비스입니다.
이용권 종류(횟수제·기간제)에 따라 예약 가능 횟수를 자동 차감하고, 클래스 시간대별 수용인원을 제한하는 예약 로직을 구현했습니다.
Django Admin 커스터마이징으로 운영자가 별도 개발 없이 회원·예약·이용권을 직접 관리할 수 있는 어드민 페이지를 제공합니다.`,
    problem: `점핑 피트니스 센터 운영자는 예약 접수·이용권 확인·회원 관리를 모두 카카오톡 메시지로 수기 처리하고 있었습니다.
- 예약 누락·중복이 빈번히 발생했고
- 이용권 잔여 횟수를 직접 계산·기록해야 했으며
- 회원별 예약 이력 파악이 어려웠습니다.

이 프로젝트는 운영자와 회원 양측의 업무 흐름을 분석하여, 기존 수기 프로세스를 그대로 대체할 수 있는 시스템을 설계했습니다.`,
    features: [
      {
        title: "이용권 기반 예약 시스템",
        desc: `횟수제·기간제 두 가지 이용권 유형을 지원합니다.
예약 생성 시 이용권 승인 상태·잔여 횟수·클래스 시간대 수용인원을 순차 검증하고, 예약 확정 시 잔여 횟수를 자동 차감합니다.
예약 취소 시 해당 시간이 지나지 않았을 경우에만 취소를 허용하고 잔여 횟수를 복구합니다.`,
      },
      {
        title: "Django Admin 커스터마이징",
        desc: `운영자가 코드 없이 회원·이용권·예약을 직접 관리할 수 있도록 Django Admin을 커스터마이징했습니다.
User 생성 시 Profile 자동 생성, Inline 편집, list_display 항목 최적화로 운영 편의성을 높였습니다.`,
      },
      {
        title: "소셜 로그인 및 권한 분리",
        desc: `카카오·구글·네이버 OAuth 2.0 소셜 로그인을 직접 구현했습니다. (외부 라이브러리 미사용, requests 기반 OAuth 흐름 직접 처리)
센터 스태프·회원·예약 본인을 구분하는 Custom Permission 클래스로 리소스별 접근 권한을 세밀하게 제어했습니다.`,
      },
    ],
    challenges: [
      {
        title: "수기 업무 흐름을 도메인으로 구조화",
        desc: `문제
카카오톡 수기 예약 프로세스를 시스템으로 옮기려면, 운영자의 실제 업무 흐름(이용권 확인 → 잔여 횟수 차감 → 예약 확정)을 정확히 이해하고 도메인으로 설계해야 했습니다.

해결
· 운영자 인터뷰를 통해 이용권 발급·승인·일시정지·만료 상태 흐름 파악
· 횟수제(max_bookings)·기간제(duration_days) 두 유형을 하나의 MembershipType 모델로 통합 설계
· 이용권 승인 시 start_date·end_date 자동 계산, 일시정지 시 pause_date 기록 로직 구현

결과
수기로 관리하던 이용권·예약 흐름을 API 레벨에서 완전히 자동화.`,
      },
      {
        title: "예약 동시성 및 검증 순서 설계",
        desc: `문제
예약 생성 시 이용권 상태·잔여 횟수·수용인원을 모두 검증해야 하며, 동시 요청 시 수용인원 초과나 잔여 횟수 이중 차감이 발생할 수 있었습니다.

해결
· Serializer validate 단계에서 이용권 승인 상태 → 잔여 횟수 → 수용인원 순 검증 순서 확립
· remaining_bookings 차감과 Booking 생성을 하나의 트랜잭션으로 처리하여 데이터 정합성 보장
· 예약 취소 시 시간 초과 여부 확인 후 잔여 횟수 복구

결과
예약 중복·잔여 횟수 오차 없이 안정적인 예약 처리.`,
      },
    ],
    learning: `이 프로젝트에서 처음으로 도메인 설계 단계부터 참여한 경험이 가장 값졌습니다. 운영자의 카카오톡 업무 흐름을 직접 인터뷰하고, 그 흐름을 모델·API·권한 구조로 옮기는 과정에서 "기능 구현"보다 "도메인 이해"가 먼저라는 점을 체감했습니다.

Django REST Framework를 처음 실무 수준으로 다루면서, Serializer의 validate/create/update 분리, Custom Permission 설계, Nested Router로 자원 계층 표현하는 방식을 익혔습니다.

또한 Django Admin을 커스터마이징하면서, 별도 어드민 프론트엔드 없이도 운영자가 직접 데이터를 관리할 수 있는 구조를 만드는 것이 소규모 팀에서 얼마나 실용적인지 배울 수 있었습니다.`,
    architecture: {
      system: {
        rows: [
          {
            nodes: [{ type: "client", label: "Client", sub: "iOS · Android · Web" }],
            arrow: true,
          },
          {
            nodes: [{ type: "gateway", label: "Nginx", sub: "Reverse Proxy" }],
            arrow: true,
          },
          {
            nodes: [{ type: "app", label: "Django + Gunicorn", sub: "Python 3.12 · Docker" }],
            arrow: true,
          },
          {
            nodes: [
              { type: "db",    label: "PostgreSQL",                 sub: "예약 · 회원 · 이용권" },
              { type: "cache", label: "Kakao / Google / Naver",     sub: "OAuth 2.0"           },
            ],
          },
        ],
      },
      erd: {
        entities: [
          {
            name: "User", col: 0, row: 0, highlight: true,
            fields: [
              { name: "id",       type: "INT",     pk: true },
              { name: "username", type: "VARCHAR", uq: true },
              { name: "email",    type: "VARCHAR"           },
              { name: "provider", type: "ENUM"              },
            ],
          },
          {
            name: "Profile", col: 0, row: 1,
            fields: [
              { name: "id",           type: "INT",     pk: true           },
              { name: "user_id",      type: "INT",     fk: true, uq: true },
              { name: "nickname",     type: "VARCHAR"                     },
              { name: "phone_number", type: "VARCHAR"                     },
              { name: "sex",          type: "ENUM"                        },
              { name: "birthday",     type: "DATE"                        },
            ],
          },
          {
            name: "Center", col: 1, row: 0, highlight: true,
            fields: [
              { name: "id",           type: "INT",     pk: true },
              { name: "name",         type: "VARCHAR"           },
              { name: "address",      type: "VARCHAR"           },
              { name: "opening_time", type: "TIME"              },
              { name: "closing_time", type: "TIME"              },
              { name: "created_by",   type: "INT",     fk: true },
            ],
          },
          {
            name: "MembershipType", col: 1, row: 1,
            fields: [
              { name: "id",            type: "INT",     pk: true },
              { name: "center_id",     type: "INT",     fk: true },
              { name: "name",          type: "VARCHAR"           },
              { name: "price",         type: "INT"               },
              { name: "duration_days", type: "INT"               },
              { name: "max_bookings",  type: "INT"               },
            ],
          },
          {
            name: "Membership", col: 2, row: 0, highlight: true,
            fields: [
              { name: "id",                 type: "INT",  pk: true },
              { name: "user_id",            type: "INT",  fk: true },
              { name: "membership_type_id", type: "INT",  fk: true },
              { name: "start_date",         type: "DATE"           },
              { name: "end_date",           type: "DATE"           },
              { name: "remaining_bookings", type: "INT"            },
              { name: "status",             type: "ENUM"           },
              { name: "pause_date",         type: "DATE"           },
            ],
          },
          {
            name: "Class", col: 3, row: 0,
            fields: [
              { name: "id",        type: "INT",     pk: true },
              { name: "center_id", type: "INT",     fk: true },
              { name: "name",      type: "VARCHAR"           },
              { name: "is_active", type: "BOOLEAN"           },
            ],
          },
          {
            name: "ClassTimeSlot", col: 3, row: 1,
            fields: [
              { name: "id",            type: "INT",  pk: true },
              { name: "jump_class_id", type: "INT",  fk: true },
              { name: "start_time",    type: "TIME"           },
              { name: "end_time",      type: "TIME"           },
              { name: "max_capacity",  type: "INT"            },
            ],
          },
          {
            name: "Booking", col: 4, row: 0, highlight: true,
            fields: [
              { name: "id",                  type: "INT",  pk: true },
              { name: "user_id",             type: "INT",  fk: true },
              { name: "class_time_slot_id",  type: "INT",  fk: true },
              { name: "membership_id",       type: "INT",  fk: true },
              { name: "date",                type: "DATE"           },
              { name: "is_cancelable",       type: "BOOLEAN"        },
            ],
          },
        ],
        relations: [
          { from: "User",          to: "Profile",        label: "1:1", fromSide: "bottom", toSide: "top" },
          { from: "User",          to: "Membership",     label: "1:N" },
          { from: "Center",        to: "MembershipType", label: "1:N", fromSide: "bottom", toSide: "top" },
          { from: "MembershipType",to: "Membership",     label: "1:N" },
          { from: "Center",        to: "Class",          label: "1:N" },
          { from: "Class",         to: "ClassTimeSlot",  label: "1:N", fromSide: "bottom", toSide: "top" },
          { from: "ClassTimeSlot", to: "Booking",        label: "1:N" },
          { from: "Membership",    to: "Booking",        label: "1:N" },
        ],
      },
      flows: [
        {
          title: "예약 생성",
          steps: [
            { actor: "Client",     desc: "POST /time_slots/{id}/bookings/ — 날짜·이용권 ID 전달" },
            { actor: "Serializer", desc: "이용권 승인 상태 확인 → 잔여 횟수 확인 → 수용인원 확인" },
            { actor: "DB",         desc: "remaining_bookings -= 1 후 Booking 생성 (트랜잭션)" },
            { actor: "Client",     desc: "예약 완료 응답" },
          ],
        },
        {
          title: "이용권 승인",
          steps: [
            { actor: "Client",  desc: "PATCH /memberships/{id}/ — status: approved" },
            { actor: "Service", desc: "start_date = today, end_date = today + duration_days 자동 계산" },
            { actor: "DB",      desc: "Membership 상태 업데이트" },
          ],
        },
      ],
      deployment: {
        stages: [
          { name: "Code",     desc: "GitHub"               },
          { name: "Docker",   desc: "Python 3.12 + Gunicorn" },
          { name: "Compose",  desc: "App + Nginx"          },
        ],
        infra: [
          "Docker",
          "Gunicorn",
          "Nginx",
          "PostgreSQL",
        ],
      },
    },
  },
  {
    id: 3,
    title: "닥터앤서 2.0 — 약물 부작용 예측 AI",
    desc: "만성 B형간염 장기 약물치료 환자의 EMR 시계열 데이터에 GRU-D 모델을 적용해 크레아티닌 청소율 저하·저인산혈증 부작용을 예측한 의료 AI 연구.",
    img: "/static/projects/dr-answer.png",
    tags: [
      "Python",
      "MySQL",
      "GRU-D",
      "XAI",
      "Machine Learning",
      "EMR",
      "시계열 분석",
    ],
    period: "2021 – 2022",
    role: "전 과정 (전처리 · 모델 설계 · 구현 · 평가)",
    team: "캡스톤 프로젝트 · 한동대학교 HAIL 학부연구생 (코아아이티 · 아주대학교의료원 협력)",
    overview: `과학기술정보통신부 AI 정밀의료솔루션(닥터앤서 2.0) 사업의 일환으로 진행된 학부 연구 프로젝트입니다.
만성 B형간염 환자의 전자의무기록(EMR) 시계열 데이터를 분석하여, 장기 항바이러스 약물치료 과정에서 발생할 수 있는 두 가지 부작용을 예측하는 AI 모델을 개발했습니다.
- 크레아티닌 청소율(CCr) 저하
- 저인산혈증(Hypophosphatemia)

의료 시계열 데이터의 불규칙적 결측을 처리하기 위해 GRU-D 모델을 채택하고, XAI 기법으로 예측 결과의 해석 가능성을 확보했습니다.`,
    problem: `의료 EMR 데이터는 일반적인 시계열 데이터와 다른 두 가지 구조적 특성이 있었습니다.

첫째, 결측치가 무작위가 아닌 임상적 의미를 지닙니다. 검사를 시행하지 않은 것 자체가 환자 상태와 관련된 정보일 수 있어, 단순 보간으로 처리하면 임상적 맥락이 손실됩니다.

둘째, 측정 간격이 불규칙합니다. 진료 일정과 검사 주기가 환자마다 다르기 때문에 고정 윈도우 기반 모델 적용이 어렵습니다.

일반적인 LSTM·Random Forest로는 이 두 특성을 동시에 처리하기 어렵다는 점이 모델 선정의 핵심 과제였습니다.`,
    features: [
      {
        title: "EMR 시계열 데이터 전처리 및 결측치 라벨링",
        desc: `아주대학교의료원의 만성 B형간염 환자 EMR 데이터를 MySQL에서 추출·정제했습니다.
측정 시점이 불규칙한 시계열 특성을 반영하여, 결측값을 단순 제거 대신 임상적 의미를 유지하는 방식으로 라벨링했습니다.
크레아티닌 청소율 저하·저인산혈증 두 타겟 레이블을 기준으로 코호트를 구성하고 피처를 선별했습니다.`,
      },
      {
        title: "GRU-D 모델 구현 및 비교 실험",
        desc: `의료 시계열 결측치를 시간 간격과 결측 마스크로 처리하는 GRU-D(Gated Recurrent Unit with Decay) 모델을 선택·구현했습니다.
Logistic Regression·Random Forest·XGBoost·LightGBM·LSTM 등 다양한 베이스라인 모델과 성능을 비교하여 GRU-D의 유효성을 검증했습니다.`,
      },
      {
        title: "XAI 도입으로 예측 근거 해석 가능성 확보",
        desc: `의료 AI에서 '왜 이런 예측을 했는가'는 임상 신뢰성의 핵심입니다.
XAI(Explainable AI) 기법을 적용하여 모델 예측에 기여한 주요 임상 피처를 시각화하고, 의료진이 결과를 해석할 수 있는 근거를 제공했습니다.`,
      },
    ],
    challenges: [
      {
        title: "의료 시계열 결측치 처리 전략 수립",
        desc: `문제
EMR 데이터의 결측은 '데이터가 없음'이 아니라 '검사를 시행하지 않음'이라는 임상 정보를 담고 있습니다. 일반적인 보간(forward fill, 평균 대체)을 적용하면 이 맥락이 사라집니다.

해결
· GRU-D 모델 채택: 마지막 관측값으로부터의 시간 경과(time decay)와 결측 마스크를 입력으로 활용하여, 결측 자체를 모델이 학습할 수 있는 구조 적용
· 단순 보간 대비 결측 패턴이 예측에 미치는 영향을 실험적으로 비교

결과
불규칙 결측이 있는 의료 시계열에서 GRU-D가 베이스라인 대비 더 높은 예측 성능을 보임을 확인.`,
      },
      {
        title: "임상 해석 가능성 확보를 위한 XAI 적용",
        desc: `문제
블랙박스 모델의 예측 결과는 의료 현장에서 신뢰받기 어렵습니다. 높은 정확도만으로는 임상 의사결정 지원 도구로 채택되기 어렵다는 점이 과제였습니다.

해결
· XAI 기법으로 각 예측에 기여한 임상 피처(검사 수치, 투약 기간 등)의 중요도를 산출
· 의료진이 모델 예측 이유를 확인하고 임상 판단에 참고할 수 있는 형태로 시각화

결과
예측 근거 제시로 모델 신뢰성 확보, 논문 게재 수준의 실험 결과 도출.`,
      },
    ],
    learning: `이 연구는 처음으로 실제 임상 데이터를 다룬 경험이었습니다. 공개 데이터셋과 달리, 병원 EMR 데이터는 결측이 많고 측정 주기가 불규칙하며 개인정보 제약도 존재했습니다. 이 과정에서 데이터가 만들어진 맥락을 이해하는 것이 전처리의 출발점이라는 점을 배웠습니다.

GRU-D를 선정하면서 '왜 이 모델인가'를 논리적으로 설명해야 했고, 베이스라인과의 비교 실험을 직접 설계하면서 실험 결과를 어떻게 해석하고 주장을 뒷받침하는지 훈련할 수 있었습니다.

XAI를 도입하면서 정확도 높은 모델만으로는 부족하고, 결과의 해석 가능성이 실제 활용 가능성을 결정한다는 점도 체감했습니다. 이는 이후 서비스 개발에서도 '사용자가 신뢰할 수 있는 결과'를 고민하는 습관으로 이어졌습니다.`,
    artifacts: [
      {
        title: "학술 논문 — 만성 B형간염의 장기 약물치료에 따른 부작용 예측",
        img: "/static/projects/dr-answer-paper.png",
        desc: "2022 대한의료정보학회 춘계학술대회 발표논문집 게재. 제1저자(공동). AUROC 기준 크레아티닌 청소율 저하 0.9942, 저인산혈증 0.9751 달성.",
      },
      {
        title: "실서비스 — HBV-AI (B형간염 AI 예측 서비스)",
        desc: "본 연구의 AI 모델이 탑재된 실제 운영 서비스. 코아아이티·아주대학교의료원이 운영하며 현재 임상에서 사용 중. (프론트엔드 구현은 연구팀 외부 담당)",
        url: "https://hbv-ai.com/login",
      },
      {
        title: "닥터앤서 2.0 — 제품 소개 페이지",
        desc: "과학기술정보통신부 AI 정밀의료솔루션(닥터앤서 2.0) 사업 공식 마켓플레이스 등록 제품. 코아아이티·아주대학교의료원 주관.",
        url: "https://www.dranswer.kr/market/disease/20/sw/31",
      },
    ],
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
