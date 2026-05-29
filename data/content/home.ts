type Skill = {
  title: string,
  icon: string,
  style?: object
};
type Testimonial = {
  quote: string,
  name: string,
  job: string
};


export const skills: Skill[] = [
  {
    title: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    title: "Django",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
    style: { filter: "invert(1)" },
  },
  {
    title: "Java",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  {
    title: "Spring Boot",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
  },
  {
    title: "Kafka",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg",
    style: { filter: "invert(1)" },
  },
  {
    title: "Celery",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/celery/celery-original.svg",
  },
  {
    title: "Redis",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  },
  {
    title: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    title: "MySQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  {
    title: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    title: "AWS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
    style: { filter: "invert(1)" },
  },
  {
    title: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "The communication throughout the project was spot on and the genre of design was carried out well.",
    name: "Wilson Bright",
    job: "Co-Founder of BlockSurvey",
  },
  {
    quote:
      "The code was clean, easy to understand, and exactly what I was looking for.",
    name: "Philip Imperato",
    job: "CEO of VisualBonus",
  },
  {
    quote:
      "My vision was executed perfectly. The quality and speed of the work was excellent.",
    name: "Zach Green",
    job: "Founder of Hangxiety Shrink",
  },
];
