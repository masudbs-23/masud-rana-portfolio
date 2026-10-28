const icon = (slug: string, variant = 'default') =>
  `https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/${slug}/${variant}.svg`

export const profile = {
  name: 'Masud Rana',
  role: 'Full Stack Developer',
  location: 'Dhaka, Bangladesh',
  email: 'hello@masudrana.dev',
  image: '/profile.png',
  socials: [
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'X / Twitter', href: 'https://x.com' },
    { label: 'Dribbble', href: 'https://dribbble.com' },
  ],
}

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export const stats = [
  { value: 5, suffix: '+', label: 'Years building' },
  { value: 40, suffix: '+', label: 'Projects shipped' },
  { value: 25, suffix: '+', label: 'Happy clients' },
  { value: 99, suffix: '%', label: 'Lighthouse avg.' },
]

export type Skill = {
  name: string
  logo: string
  invert?: boolean
  level: number
  blurb: string
  tags: string[]
}

export const coreSkills: Skill[] = [
  {
    name: 'React',
    logo: icon('react'),
    level: 96,
    blurb: 'Component systems, hooks, state machines and buttery-smooth UIs.',
    tags: ['Hooks', 'Zustand', 'Framer Motion'],
  },
  {
    name: 'Next.js',
    logo: icon('nextdotjs', 'mono'),
    invert: true,
    level: 94,
    blurb: 'App Router, Server Components, streaming and edge-ready APIs.',
    tags: ['RSC', 'SSR / ISR', 'Edge'],
  },
  {
    name: 'React Native',
    logo: icon('expo', 'mono'),
    invert: true,
    level: 88,
    blurb: 'Cross-platform iOS and Android apps that feel truly native.',
    tags: ['Expo', 'Reanimated', 'Push'],
  },
  {
    name: 'Node.js',
    logo: icon('nodedotjs'),
    level: 92,
    blurb: 'Scalable REST and GraphQL services, queues and realtime sockets.',
    tags: ['Express', 'NestJS', 'Socket.io'],
  },
  {
    name: 'PostgreSQL',
    logo: icon('postgresql'),
    level: 89,
    blurb: 'Relational modeling, indexing, migrations and query tuning.',
    tags: ['Prisma', 'Drizzle', 'Indexing'],
  },
  {
    name: 'MongoDB',
    logo: icon('mongodb'),
    level: 90,
    blurb: 'Document schemas, aggregation pipelines and Atlas search.',
    tags: ['Mongoose', 'Aggregation', 'Atlas'],
  },
]

export const marqueeTech = [
  { name: 'React', logo: icon('react', 'mono') },
  { name: 'Next.js', logo: icon('nextdotjs', 'mono') },
  { name: 'TypeScript', logo: icon('typescript', 'mono') },
  { name: 'Node.js', logo: icon('nodedotjs', 'mono') },
  { name: 'Expo', logo: icon('expo', 'mono') },
  { name: 'PostgreSQL', logo: icon('postgresql', 'mono') },
  { name: 'MongoDB', logo: icon('mongodb', 'mono') },
  { name: 'GraphQL', logo: icon('graphql', 'mono') },
  { name: 'Redis', logo: icon('redis', 'mono') },
  { name: 'Prisma', logo: icon('prisma', 'mono') },
  { name: 'Docker', logo: icon('docker', 'mono') },
  { name: 'Express', logo: icon('express', 'mono') },
  { name: 'Vercel', logo: icon('vercel', 'mono') },
  { name: 'Git', logo: icon('git', 'mono') },
  { name: 'Figma', logo: icon('figma', 'mono') },
]

export type Project = {
  title: string
  category: string
  year: string
  description: string
  image: string
  stack: string[]
  metric: string
  live: string
  code: string
}

export const projects: Project[] = [
  {
    title: 'Nova Commerce',
    category: 'E-commerce Platform',
    year: '2026',
    description:
      'A headless commerce platform with instant search, real-time inventory and a blazing checkout flow that converts.',
    image: '/projects/commerce.png',
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'],
    metric: '+38% conversion',
    live: '#',
    code: '#',
  },
  {
    title: 'Pulse Fitness',
    category: 'Mobile App',
    year: '2025',
    description:
      'Cross-platform fitness tracker with live workout sessions, streak gamification and wearable sync.',
    image: '/projects/fitness.png',
    stack: ['React Native', 'Expo', 'Node.js', 'MongoDB'],
    metric: '50k+ downloads',
    live: '#',
    code: '#',
  },
  {
    title: 'Orbit Analytics',
    category: 'SaaS Dashboard',
    year: '2025',
    description:
      'Real-time product analytics with event streaming, custom funnels and beautifully dense data views.',
    image: '/projects/analytics.png',
    stack: ['React', 'Next.js', 'PostgreSQL', 'Redis'],
    metric: '1B+ events / mo',
    live: '#',
    code: '#',
  },
  {
    title: 'Echo Chat',
    category: 'Realtime Collaboration',
    year: '2024',
    description:
      'Team messaging with threads, presence, file sharing and end-to-end encrypted channels across web and mobile.',
    image: '/projects/chat.png',
    stack: ['React', 'React Native', 'Socket.io', 'MongoDB'],
    metric: '<80ms latency',
    live: '#',
    code: '#',
  },
]

export const experience = [
  {
    period: '2024 — Present',
    role: 'Senior Full Stack Developer',
    company: 'Nebula Labs',
    description:
      'Leading a team of 6 building a multi-tenant SaaS platform. Cut page load times by 60% with RSC and edge caching.',
  },
  {
    period: '2022 — 2024',
    role: 'Full Stack Developer',
    company: 'Brightwave Studio',
    description:
      'Shipped 15+ client products across web and mobile, from MVP to scale, owning both API design and UI.',
  },
  {
    period: '2021 — 2022',
    role: 'Mobile Developer',
    company: 'AppForge',
    description:
      'Built React Native apps with offline-first sync, payments and push notifications for 100k+ users.',
  },
  {
    period: '2020 — 2021',
    role: 'Frontend Developer',
    company: 'Freelance',
    description:
      'Crafted pixel-perfect, animated marketing sites and dashboards for startups worldwide.',
  },
]
