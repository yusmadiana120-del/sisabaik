:root {
  --color-primary: #550b14;        /* Maroon Utama */
  --color-primary-dark: #1c010c;   /* Maroon Sangat Gelap */
  --color-primary-soft: #f4e8e1;   /* Rose Water Lembut untuk Badge/Step */
  --color-accent: #f2b84b;         /* Aksen Kuning Emas */
  --color-text: #1c010c;           /* Teks Utama Terdalam */
  --color-muted: #550b14;          /* Teks Muted/Sekunder */
  --color-surface: #ffffff;        /* Putih Bersih (Latar Kartu & Header) */
  --color-background: #550b14;     /* Latar Belakang Maroon #550b14 */
  --color-border: #e6d3c3;         /* Warna Garis Tepi Lembut */
  --color-danger: #a52a2a;
  --shadow-card: 0 0.5rem 1.5rem rgb(28 1 12 / 8%);
  --radius-small: 0.5rem;
  --radius-medium: 0.9rem;
  --radius-large: 1.4rem;
  --content-width: 72rem;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--color-background);
  color: var(--color-text);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
}

h1,
h2,
h3,
p {
  margin-block-start: 0;
}

h1,
h2,
h3 {
  line-height: 1.2;
}

h1 {
  max-width: 18ch;
  margin-block-end: 1rem;
  font-size: clamp(2rem, 7vw, 3.75rem);
  color: var(--color-primary-dark);
}

h2 {
  margin-block-end: 1rem;
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  color: var(--color-primary-dark);
}

h3 {
  margin-block-end: 0.6rem;
  font-size: 1.2rem;
  color: var(--color-primary-dark);
}

a {
  color: var(--color-primary);
  text-underline-offset: 0.2em;
}

a:hover {
  text-decoration-thickness: 0.18em;
}

:focus-visible {
  outline: 0.2rem solid var(--color-accent);
  outline-offset: 0.2rem;
}

.skip-link {
  position: absolute;
  inset-block-start: 0.5rem;
  inset-inline-start: 0.5rem;
  z-index: 100;
  padding: 0.7rem 1rem;
  border-radius: var(--radius-small);
  background: var(--color-text);
  color: var(--color-surface);
  transform: translateY(-180%);
}

.skip-link:focus {
  transform: translateY(0);
}

.container {
  width: min(100% - 2rem, var(--content-width));
  margin-inline: auto;
}

.site-header {
  background: var(--color-surface);
  border-block-end: 0.0625rem solid var(--color-border);
}

.header-layout {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-block: 1rem;
}

.brand {
  margin: 0;
  color: var(--color-primary-dark);
  font-size: 1.4rem;
  font-weight: 700;
}

.nav-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.nav-list a {
  display: inline-block;
  padding-block: 0.35rem;
  font-weight: 700;
}

.nav-list a[aria-current="page"] {
  color: var(--color-primary);
  text-decoration-thickness: 0.2em;
}

.hero {
  padding-block: clamp(4rem, 12vw, 8rem);
  background:
    linear-gradient(180deg, rgba(28, 1, 12, 0.5) 0%, rgba(28, 1, 12, 0.7) 100%),
    url(roti.jpg) center/cover no-repeat;
  color: #ffffff;
}

/* Teks di dalam hero agar kontras di atas gambar gelap */
.hero h1,
.hero .eyebrow,
.hero .lead {
  color: #ffffff;
}

.hero-layout {
  display: grid;
  gap: 2rem;
  align-items: center;
}

.eyebrow {
  margin-block-end: 0.5rem;
  color: var(--color-primary);
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.lead {
  max-width: 62ch;
  color: var(--color-muted);
  font-size: 1.1rem;
}

.hero-panel {
  padding: 1.5rem;
  border: 0.0625rem solid var(--color-border);
  border-radius: var(--radius-large);
  background: var(--color-surface);
  color: var(--color-text);
  box-shadow: 0 0.8rem 2rem rgba(0, 0, 0, 0.25);
}

.hero-panel strong {
  display: block;
  color: var(--color-primary-dark);
  font-size: 2rem;
}