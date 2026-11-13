// Everything a fork changes first: the name, the repo, and every menu.
// It is typed, so a missing link fails the build instead of the page.

export type NavLink = { label: string; href: string; external?: boolean }
export type NavGroup = { label: string; links: NavLink[] }

const repo = 'https://github.com/theomirzakhanian/cirrus'

export const site = {
  name: 'Cirrus',
  repo,
  license: 'MIT',
  copyright: '© 2026 Cirrus contributors.',

  // The three menus in the top bar, then one plain link.
  nav: [
    {
      label: 'Features',
      links: [
        { label: 'Sections', href: '#sections' },
        { label: 'Theming', href: '#theming' },
        { label: 'site.ts', href: '#config' },
      ],
    },
    {
      label: 'Use cases',
      links: [
        { label: 'Libraries', href: '#use-cases' },
        { label: 'CLI tools', href: '#use-cases' },
        { label: 'Frameworks', href: '#use-cases' },
        { label: 'Desktop apps', href: '#use-cases' },
        { label: 'Research code', href: '#use-cases' },
      ],
    },
    {
      label: 'Resources',
      links: [
        { label: 'Quickstart', href: '#get' },
        { label: 'Page weight', href: '#weight' },
        { label: 'Source', href: repo, external: true },
        { label: 'Issues', href: `${repo}/issues`, external: true },
        { label: 'Contributing', href: `${repo}/blob/main/CONTRIBUTING.md`, external: true },
        { label: 'Discussions', href: `${repo}/discussions`, external: true },
        { label: 'Releases', href: `${repo}/releases`, external: true },
      ],
    },
  ] satisfies NavGroup[],
  navLink: { label: 'License', href: '#open' } satisfies NavLink,

  // The rows in the split button's menu.
  get: [
    { icon: 'github', label: 'GitHub', detail: 'Use this template', href: `${repo}/generate` },
    { icon: 'git', label: 'Git', detail: 'Clone the repo', href: `${repo}.git` },
    { icon: 'zip', label: 'ZIP', detail: 'main branch', href: `${repo}/archive/refs/heads/main.zip` },
    { icon: 'vercel', label: 'Vercel', detail: 'Deploy a copy', href: `https://vercel.com/new/clone?repository-url=${encodeURIComponent(repo)}` },
  ],

  footer: [
    {
      label: 'Project',
      links: [
        { label: 'About', href: '#intro' },
        { label: 'Star on GitHub', href: repo, external: true },
      ],
    },
  ] satisfies NavGroup[],
  legal: [
    { label: 'License', href: `${repo}/blob/main/LICENSE` },
    { label: 'Code of conduct', href: `${repo}/blob/main/CODE_OF_CONDUCT.md` },
    { label: 'Security', href: `${repo}/security/policy` },
  ] satisfies NavLink[],
  social: [{ icon: 'github', label: 'GitHub', href: repo }],
} as const
