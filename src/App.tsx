import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type ReactNode,
} from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { motion, type Transition } from 'motion/react';
import {
  hardware,
  logos,
  navigation,
  principles,
  process,
  procurement,
  products,
  projects,
  quotes,
  resources,
  software,
  team,
  type Copy,
} from './content';

type ModalContent = { title: string; body: ReactNode } | null;
type SiteContext = {
  lang: 'en' | 'id';
  setLang: (v: 'en' | 'id') => void;
  t: (copy: Copy) => string;
  consult: (subject?: string) => void;
  show: (content: ModalContent) => void;
};
const Site = createContext<SiteContext>(null!);
const useSite = () => useContext(Site);
const asset = (name: string) => `/assets/${name}`;
const book: Copy = ['Book a Meeting', 'Jadwalkan Pertemuan'];
const learn: Copy = ['Learn more', 'Selengkapnya'];

function Img({
  file,
  alt = '',
  className = '',
  eager = false,
}: {
  file: string;
  alt?: string;
  className?: string;
  eager?: boolean;
}) {
  return (
    <img
      src={asset(file)}
      alt={alt}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}
function Arrow({ white = false, down = false }: { white?: boolean; down?: boolean }) {
  return <Img file={down ? '9c9cd.svg' : white ? '1db24.svg' : '36290.svg'} className="arrow" />;
}
function Button({
  children,
  onClick,
  to,
  href,
  variant = 'light',
  arrow = true,
  down = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  to?: string;
  href?: string;
  variant?: string;
  arrow?: boolean;
  down?: boolean;
}) {
  const content = (
    <>
      {children}
      {arrow && <Arrow white={variant === 'primary' || variant === 'outline'} down={down} />}
    </>
  );
  const cls = `button button-${variant}`;
  if (to)
    return (
      <Link className={cls} to={to}>
        {content}
      </Link>
    );
  if (href)
    return (
      <a
        className={cls}
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    );
  return (
    <button className={cls} onClick={onClick} type="button">
      {content}
    </button>
  );
}
function Header() {
  const { lang, setLang, t, consult } = useSite();
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const location = useLocation();
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setOpen(false);
    setDropdown(false);
  }, [location]);
  return (
    <header
      className="site-header"
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          setOpen(false);
          setDropdown(false);
          menuButton.current?.focus();
        }
      }}
    >
      <div className="header-inner wrap">
        <Link to="/" className="brand" aria-label="Nusensia — Home">
          <Img file="e0c92.png" eager />
          <span>Nusensia</span>
        </Link>
        <button
          className="menu-toggle"
          ref={menuButton}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={t([open ? 'Close menu' : 'Open menu', open ? 'Tutup menu' : 'Buka menu'])}
        >
          <span /> <span /> <span />
        </button>
        <div className={`nav-container ${open ? 'is-open' : ''}`} id="main-navigation">
          <nav aria-label={t(['Main navigation', 'Navigasi utama'])}>
            {navigation.map(([to, label]) =>
              to === '/solutions' ? (
                <div
                  className="nav-dropdown"
                  key={to}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget)) setDropdown(false);
                  }}
                >
                  <div className="nav-solution">
                    <NavLink to={to}>{t(label)}</NavLink>
                    <button
                      aria-label={t(['Solution categories', 'Kategori solusi'])}
                      aria-expanded={dropdown}
                      aria-controls="solutions-menu"
                      onClick={() => setDropdown(!dropdown)}
                    >
                      <Img file="91883.svg" />
                    </button>
                  </div>
                  {dropdown && (
                    <div className="dropdown-panel" id="solutions-menu">
                      <Link to="/solutions#software">
                        {t(['Software solutions', 'Solusi perangkat lunak'])}
                      </Link>
                      <Link to="/solutions#products">Widya & Ampera</Link>
                      <Link to="/solutions#hardware">
                        {t(['Hardware solutions', 'Solusi perangkat keras'])}
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink to={to} end={to === '/'} key={to}>
                  {t(label)}
                </NavLink>
              ),
            )}
          </nav>
          <div className="header-actions">
            <div className="language-switch" aria-label="Language / Bahasa">
              {(['id', 'en'] as const).map((l) => (
                <button
                  type="button"
                  aria-pressed={lang === l}
                  className={lang === l ? 'selected' : ''}
                  onClick={() => setLang(l)}
                  key={l}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <Button variant="primary" onClick={() => consult()}>
              {t(book)}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="section-label">
      <Img file="cad2f.svg" className="rule rule-top" />
      <Img file="cad2f.svg" className="rule rule-bottom" />
      <Img file="300c1.svg" className="rule-vertical rule-left" />
      <Img file="300c1.svg" className="rule-vertical rule-right" />
      <span>{children}</span>
      <span className="asterisks" aria-hidden="true">
        ***
      </span>
    </div>
  );
}

// Exact Figma keyframes: both tracks share a two-second repeating timeline.
const titleTransition: Transition = {
  opacity: {
    duration: 2,
    times: [0, 0.1374, 0.3378, 1],
    ease: ['linear', 'easeOut', 'linear'],
    repeat: Infinity,
  },
  y: {
    duration: 2,
    times: [0, 0.1374, 0.2867, 1],
    ease: ['linear', 'easeOut', 'linear'],
    repeat: Infinity,
  },
};
const subtitleTransition: Transition = {
  opacity: {
    duration: 2,
    times: [0, 0.276, 0.434, 1],
    ease: ['linear', 'easeOut', 'linear'],
    repeat: Infinity,
  },
};
const reducedMotionQuery = '(prefers-reduced-motion: reduce)';
function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(reducedMotionQuery);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}
function SectionHeading({
  title,
  description,
  centered = false,
  animated = false,
  node,
}: {
  title: Copy;
  description?: Copy;
  centered?: boolean;
  animated?: boolean;
  node?: string;
}) {
  const { t } = useSite();
  const reduced = useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => true,
  );
  const animate = animated && !reduced;
  return (
    <div className={`section-heading ${centered ? 'centered' : ''}`}>
      <motion.h2
        data-node-id={node}
        initial={animate ? { opacity: 0, y: 50 } : false}
        animate={animate ? { opacity: [0, 0, 1, 1], y: [50, 50, 0, 0] } : { opacity: 1, y: 0 }}
        transition={animate ? titleTransition : { duration: 0 }}
      >
        {t(title)}
      </motion.h2>
      {description && (
        <motion.p
          initial={animate ? { opacity: 0 } : false}
          animate={animate ? { opacity: [0, 0, 1, 1] } : { opacity: 1 }}
          transition={animate ? subtitleTransition : { duration: 0 }}
        >
          {t(description)}
        </motion.p>
      )}
    </div>
  );
}
function Hero({ page = 'home' }: { page?: 'home' | 'solutions' | 'portfolio' | 'clients' }) {
  const { t, consult } = useSite();
  const data = {
    home: {
      label: '',
      title: [
        'Infrastructure and Intelligence for Indonesia',
        'Infrastruktur dan Inteligensi untuk Indonesia',
      ],
      description: [
        'From data center solution to production AI systems — Nusensia designs, builds, and integrates the technology backbone for institutions and enterprise.',
        'Dari solusi data center hingga sistem AI produksi — Nusensia merancang, membangun, dan mengintegrasikan fondasi teknologi untuk institusi dan perusahaan.',
      ],
    },
    solutions: {
      label: ['Solutions', 'Solusi'],
      title: [
        'Software and Hardware, delivered end to end',
        'Perangkat Lunak dan Keras, terintegrasi menyeluruh',
      ],
      description: [
        'From physical infrastructure to production software, Nusensia covers the full stack institutions need—designed, built, and integrated to institutional standards.',
        'Dari infrastruktur fisik hingga perangkat lunak produksi, Nusensia menangani seluruh kebutuhan institusi—dirancang, dibangun, dan diintegrasikan sesuai standar institusi.',
      ],
    },
    portfolio: {
      label: ['Showcase', 'Portofolio'],
      title: [
        "Projects and products we've delivered",
        'Proyek dan produk yang telah kami wujudkan',
      ],
      description: [
        'A selection of engagements across government, BUMN, and enterprise.',
        'Pilihan proyek bersama pemerintah, BUMN, dan perusahaan.',
      ],
    },
    clients: {
      label: ['Clients', 'Klien'],
      title: [
        "Trusted across sectors that can't compromise",
        'Dipercaya lintas sektor yang mengutamakan keandalan',
      ],
      description: [
        'We serve organisations where reliability, security, and data control are non-negotiable — government, BUMN, and enterprise.',
        'Kami melayani organisasi yang mengutamakan keandalan, keamanan, dan kendali data — pemerintah, BUMN, dan perusahaan.',
      ],
    },
  } satisfies Record<string, { label: Copy; title: Copy; description: Copy }>;
  const d = data[page];
  return (
    <section className={`hero hero-${page}`}>
      {page === 'home' && (
        <div className="hero-art" aria-hidden="true">
          <div className="map">
            <Img file="4faef.png" eager />
          </div>
          {['20e57.svg', '39d11.svg', '07479.svg', '33643.svg'].map((f, i) => (
            <Img file={f} eager className={`glow glow-${i}`} key={f} />
          ))}
        </div>
      )}
      <div className="hero-content wrap">
        {d.label && <span className="eyebrow">{t(d.label)}</span>}
        <h1>{t(d.title)}</h1>
        <p>{t(d.description)}</p>
        <div className="hero-buttons">
          <Button onClick={() => consult()}>{t(book)}</Button>
          <Button
            to={page === 'solutions' ? '#software' : '/solutions'}
            variant="outline"
            down={page !== 'home'}
          >
            {t(['Explore Solutions', 'Jelajahi Solusi'])}
          </Button>
        </div>
      </div>
    </section>
  );
}
function Stats({ compact = false }: { compact?: boolean }) {
  const { t } = useSite();
  return (
    <div className={`stats ${compact ? 'stats-compact' : 'wrap'}`}>
      {[
        ['10+', ['Projects delivered', 'Proyek terselesaikan']],
        ['Govt · BUMN · Enterprise', ['Sectors served', 'Sektor yang dilayani']],
        ['4+', ['Years of experience', 'Tahun pengalaman']],
      ].map(([value, label]) => (
        <div key={value as string}>
          <strong>{value as string}</strong>
          <span>{t(label as Copy)}</span>
        </div>
      ))}
    </div>
  );
}
function ClientLogos({ grid = false }: { grid?: boolean }) {
  const { t } = useSite();
  return (
    <div className={grid ? 'client-grid wrap' : 'logo-strip wrap'}>
      {!grid && <span className="trusted-label">{t(['Trusted by', 'Dipercaya oleh'])}</span>}
      <div className="logos">
        {logos.map(([file, name], i) => (
          <div className={`client-logo client-logo-${i}`} key={file}>
            <Img file={file} alt={name} />
          </div>
        ))}
      </div>
    </div>
  );
}
function SolutionCards({
  kind = 'software',
  centered = false,
}: {
  kind?: 'software' | 'hardware';
  centered?: boolean;
}) {
  const { t, consult } = useSite();
  const isSoftware = kind === 'software';
  const cards = isSoftware ? software : hardware;
  return (
    <section className={`section solutions-section ${kind}`} id={kind}>
      <SectionLabel>
        {t(
          isSoftware
            ? ['Software solution', 'Solusi perangkat lunak']
            : ['Hardware solution', 'Solusi perangkat keras'],
        )}
      </SectionLabel>
      <div className="wrap section-body">
        <SectionHeading
          centered={centered}
          animated={isSoftware}
          node={isSoftware ? (centered ? '1:3855' : '1:4121') : '1:3895'}
          title={
            isSoftware
              ? [
                  'From big data to production AI systems',
                  'Dari big data menuju sistem AI produksi',
                ]
              : [
                  'Data center solutions and high performance servers',
                  'Solusi data center dan server berkinerja tinggi',
                ]
          }
          description={
            isSoftware
              ? [
                  'Four capabilities that turn infrastructure into working systems, built to institutional standards and deployed inside your environment.',
                  'Empat kapabilitas yang mengubah infrastruktur menjadi sistem yang berfungsi, dibangun sesuai standar institusi dan diterapkan di lingkungan Anda.',
                ]
              : [
                  'As a Lenovo Authorized Partner, we design and deploy the physical infrastructure institutions run on, from rack layout to GPU compute for AI workloads.',
                  'Sebagai Lenovo Authorized Partner, kami merancang dan menerapkan infrastruktur fisik institusi, dari tata letak rak hingga komputasi GPU untuk beban kerja AI.',
                ]
          }
        />
        {!centered && (
          <Button variant="primary" onClick={() => consult()}>
            {t(book)}
          </Button>
        )}
        <div className={`card-grid ${isSoftware ? 'three' : 'two'}`}>
          {cards.map((card) => (
            <article className="solution-card" key={card.image}>
              <div className="solution-image">
                <Img file={card.image} alt={t(card.title)} />
              </div>
              <div className="card-copy">
                <h3>
                  {isSoftware ? (
                    <button onClick={() => consult(t(card.title))}>{t(card.title)}</button>
                  ) : (
                    t(card.title)
                  )}
                </h3>
                <p>{t(card.description)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function Products() {
  const { t, consult, show } = useSite();
  return (
    <section className="products section" id="products">
      <SectionLabel>{t(['Our product & portfolio', 'Produk & portofolio kami'])}</SectionLabel>
      <p className="product-kicker">
        {t(['Software we build and own', 'Perangkat lunak yang kami bangun dan miliki'])}
      </p>
      {products.map((product) => (
        <article className="product-row wrap" key={product.name} id={product.name.toLowerCase()}>
          <div className="product-copy">
            <span className="kicker">{t(product.category)}</span>
            <h2>{product.name}</h2>
            <p>{t(product.description)}</p>
            <ul className="feature-list">
              {product.features.map((feature, i) => (
                <li key={i}>
                  <Img file="36949.svg" />
                  {t(feature)}
                </li>
              ))}
            </ul>
            <Button
              onClick={() =>
                show({
                  title: product.name,
                  body: (
                    <>
                      <p>{t(product.description)}</p>
                      <Img
                        file={product.image}
                        alt={`${product.name} dashboard`}
                        className="dialog-image"
                      />
                      <ul>
                        {product.features.map((f, i) => (
                          <li key={i}>{t(f)}</li>
                        ))}
                      </ul>
                      <Button variant="primary" onClick={() => consult(product.name)}>
                        {t(['Request a demo', 'Minta demo'])}
                      </Button>
                    </>
                  ),
                })
              }
            >
              {t(learn)}
            </Button>
          </div>
          <div className="product-screen">
            <Img file={product.image} alt={`${product.name} dashboard`} />
          </div>
        </article>
      ))}
    </section>
  );
}
function PortfolioProjects() {
  const { t } = useSite();
  return (
    <section className="section portfolio-projects" id="portfolio">
      <SectionLabel>{t(['Our public portfolio', 'Portofolio publik kami'])}</SectionLabel>
      <div className="wrap">
        {projects.map((project, i) => (
          <article className="project" key={project.name}>
            <div className="project-copy">
              {project.category && <span className="kicker">{t(project.category)}</span>}
              <h2>{project.name}</h2>
              <p>{t(project.description)}</p>
              <Button
                href={i === 0 ? 'https://hatespeech.csis.or.id' : 'https://lms.nusensia.com/'}
              >
                {t(learn)}
              </Button>
            </div>
            <div className="project-screen">
              <Img file={project.image} alt={project.name + ' dashboard'} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
function Delivery({ institutional = false }: { institutional?: boolean }) {
  const { t } = useSite();
  return (
    <section className="section delivery" id="delivery">
      <SectionLabel>{t(['How we deliver', 'Cara kami bekerja'])}</SectionLabel>
      <div className="wrap delivery-layout">
        <div className="delivery-intro">
          <h2>
            {t(
              institutional
                ? ['Built for public-sector procurement', 'Dirancang untuk pengadaan sektor publik']
                : ['A sequence that respects order', 'Proses yang terstruktur dan terarah'],
            )}
          </h2>
          <p>
            {t(
              institutional
                ? [
                    'We know how institutional buying works, and we structure our engagements to fit it.',
                    'Kami memahami proses pengadaan institusi dan menyesuaikan kerja sama kami dengannya.',
                  ]
                : [
                    'Every engagement follows the same disciplined path, because in infrastructure, order matters.',
                    'Setiap kerja sama mengikuti proses yang disiplin, karena dalam infrastruktur, urutan itu penting.',
                  ],
            )}
          </p>
        </div>
        <ol className={`delivery-steps ${institutional ? '' : 'connected'}`}>
          {!institutional && (
            <li className="timeline-art" aria-hidden="true">
              <Img file="46241.svg" />
            </li>
          )}
          {(institutional ? procurement : process).map((step, i) => (
            <li className="delivery-step" key={i}>
              <span className="step-block" aria-hidden="true" />
              <div>
                {!institutional && (
                  <span className="step-label">
                    {t(['STEP', 'LANGKAH'])} {i + 1}
                  </span>
                )}
                <p>
                  <strong>{t(step.title)}</strong>
                  {institutional ? <br /> : ' — '}
                  {t(step.text)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
function Testimonials() {
  const { t } = useSite();
  const [index, setIndex] = useState(0);
  const quote = quotes[index];
  const change = (delta: number) => setIndex((i) => (i + delta + quotes.length) % quotes.length);
  return (
    <section
      className="section testimonials"
      aria-roledescription="carousel"
      aria-label={t(['Client testimonials', 'Testimoni klien'])}
    >
      <SectionLabel>{t(['Testimonials', 'Testimoni'])}</SectionLabel>
      <div className="wrap">
        <h2>{t(['What Our Clients Says', 'Apa Kata Klien Kami'])}</h2>
        <div
          className="quote-row"
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') change(-1);
            if (e.key === 'ArrowRight') change(1);
          }}
        >
          <button
            className="carousel-control"
            onClick={() => change(-1)}
            aria-label={t(['Previous testimonial', 'Testimoni sebelumnya'])}
          >
            <Img file="6b1aa.svg" />
          </button>
          <div className="quote-content" aria-live="polite" aria-atomic="true">
            <blockquote>“{t(quote.text)}”</blockquote>
            <div className="quote-author">
              <Img file={quote.avatar} />
              <span>{t(quote.role)}</span>
            </div>
          </div>
          <button
            className="carousel-control"
            onClick={() => change(1)}
            aria-label={t(['Next testimonial', 'Testimoni berikutnya'])}
          >
            <Img file="818b3.svg" />
          </button>
        </div>
        <span className="sr-only">
          {index + 1} / {quotes.length}
        </span>
      </div>
    </section>
  );
}
function Cta({
  variant = 'default',
}: {
  variant?: 'default' | 'solutions' | 'portfolio' | 'about';
}) {
  const { t, consult } = useSite();
  const texts = {
    default: {
      title: ["Let's talk about your requirements", 'Mari diskusikan kebutuhan Anda'],
      desc: [
        "Whether you're scoping a tender or planning a build, we can help you get the specifications right.",
        'Baik untuk tender maupun rencana implementasi, kami membantu Anda menentukan spesifikasi yang tepat.',
      ],
    },
    solutions: {
      title: ['Not sure which tier fits?', 'Belum yakin solusi yang tepat?'],
      desc: [
        "Tell us about your workloads and constraints. We'll recommend the right combination of software and hardware.",
        'Ceritakan beban kerja dan kendala Anda. Kami akan merekomendasikan kombinasi perangkat lunak dan keras yang tepat.',
      ],
    },
    portfolio: {
      title: ['Want a reference for your sector?', 'Butuh referensi untuk sektor Anda?'],
      desc: [
        "We can share relevant delivery references under NDA. Book a call and tell us what you're evaluating.",
        'Kami dapat membagikan referensi implementasi yang relevan di bawah NDA. Jadwalkan panggilan dan ceritakan kebutuhan evaluasi Anda.',
      ],
    },
    about: {
      title: [
        'Work with a partner who owns the full stack',
        'Bekerja bersama mitra yang menangani seluruh teknologi',
      ],
      desc: [
        'From infrastructure to AI, we deliver and support the systems your institution depends on.',
        'Dari infrastruktur hingga AI, kami membangun dan mendukung sistem yang diandalkan institusi Anda.',
      ],
    },
  } satisfies Record<string, { title: Copy; desc: Copy }>;
  return (
    <section className="cta wrap" id="contact">
      <div className="cta-art" aria-hidden="true">
        <Img file="cta-background.png" />
      </div>
      <div className="cta-content">
        <h2>{t(texts[variant].title)}</h2>
        <p>{t(texts[variant].desc)}</p>
        <Button arrow={false} onClick={() => consult()}>
          {t(['Schedule a Consultation', 'Jadwalkan Konsultasi'])}
        </Button>
      </div>
    </section>
  );
}
function Footer() {
  const { t, show, consult } = useSite();
  const social = (name: string) =>
    show({
      title: name,
      body: (
        <>
          <p>
            {t([
              'For Nusensia’s current social media channels, please contact our team.',
              'Untuk kanal media sosial resmi Nusensia, silakan hubungi tim kami.',
            ])}
          </p>
          <a href="mailto:hello@nusensia.com">hello@nusensia.com</a>
        </>
      ),
    });
  return (
    <footer className="footer">
      <Img file="8edf8.svg" className="footer-art" />
      <div className="footer-grid wrap">
        <div className="footer-brand">
          <Link to="/" aria-label="Nusensia — Home">
            <Img file="86596.png" alt="Nusensia" />
          </Link>
          <p>
            {t([
              'Infrastructure and intelligence for Indonesia — data center hardware, big data and AI systems, and software products.',
              'Infrastruktur dan inteligensi untuk Indonesia — perangkat keras data center, big data, sistem AI, dan produk perangkat lunak.',
            ])}
          </p>
        </div>
        <div>
          <h3>{t(['Navigate', 'Navigasi'])}</h3>
          <nav aria-label={t(['Footer navigation', 'Navigasi footer'])}>
            {navigation.map(([to, label]) => (
              <Link to={to} key={to}>
                {t(label)}
              </Link>
            ))}
          </nav>
        </div>
        <div className="footer-contact">
          <h3>{t(['Contact', 'Kontak'])}</h3>
          <address>
            Gedung Bursa Efek Indonesia Tower 1 Level 3, Unit 304, RT.5/RW.3, Kebayoran Baru,
            Jakarta Selatan
          </address>
          <a href="mailto:hello@nusensia.com">hello@nusensia.com</a>
          <a href="tel:+622122283725">(+6221) 2228-3725</a>
        </div>
        <div>
          <h3>{t(['Follow', 'Ikuti'])}</h3>
          <div className="social-links">
            {[
              ['668e6.svg', 'Instagram'],
              ['e12f6.svg', 'LinkedIn'],
              ['97395.svg', 'WhatsApp'],
            ].map(([file, name]) => (
              <button key={name} aria-label={name} onClick={() => social(name)}>
                <Img file={file} />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="wrap">
          <span>© 2026 PT Nusantara Intelegensi Integrasi</span>
          <div>
            {['Privacy', 'Terms'].map((label) => (
              <button key={label} onClick={() => consult(`${label} information`)}>
                {t(label === 'Privacy' ? ['Privacy', 'Privasi'] : ['Terms', 'Ketentuan'])}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

const hardwareTabs: Copy[] = [
  ['Hardware & Servers', 'Perangkat Keras & Server'],
  ['Network', 'Jaringan'],
  ['Specialized & Tactical Equipment', 'Peralatan Khusus & Taktis'],
  ['Smart CCTV & Edge Analytics', 'CCTV Cerdas & Edge Analytics'],
];
function HardwareCatalog() {
  const { t, consult } = useSite();
  const [tab, setTab] = useState(0);
  const groups =
    tab === 0
      ? [
          {
            label: '',
            names: [
              'Lenovo ThinkSystem Servers',
              'Lenovo ThinkAgile Solutions',
              'Dell',
              'Hewlett Packard Enterprise',
              'Virtualization & HCI Solution',
            ],
          },
          {
            label: 'High Performance Server Products',
            names: [
              'Rack Servers',
              'Tower Servers',
              'Edge Servers',
              'Large Memory Servers',
              'Supercomputing Servers',
              'Multi-Node Servers',
              'Software-Defined Servers',
            ],
          },
        ]
      : tab === 1
        ? [
            {
              label: 'Network solutions',
              names: [
                'Unrivaled Connectivity, Uncompromised Security',
                'Adaptive Solutions for Maximum Efficiency',
              ],
            },
            { label: 'Network partners', names: ['Cisco', 'Huawei', 'Juniper', 'Ruckus'] },
          ]
        : tab === 2
          ? [{ label: t(['Discuss your requirements', 'Diskusikan kebutuhan Anda']), names: [] }]
          : [
              {
                label: '',
                names: [
                  'AI Edge Box',
                  'Bullet Camera',
                  'Dome Camera',
                  'PTZ Zoom Camera',
                  'ANPR & Speed Radar',
                  'NVR Series',
                ],
              },
            ];
  return (
    <section className="section hardware-catalog" id="hardware">
      <SectionLabel>{t(['Hardware solution', 'Solusi perangkat keras'])}</SectionLabel>
      <div className="wrap section-body">
        <SectionHeading
          title={[
            'Hardware that we integrate, not just hardware we sell',
            'Perangkat keras yang kami integrasikan, bukan sekadar kami jual',
          ]}
          description={[
            'Four categories from vendors your technical team already trusts—tailored to your workload, never sold as a one-size-fits-all package.',
            'Empat kategori dari vendor yang dipercaya tim teknis Anda—disesuaikan dengan beban kerja, bukan paket seragam untuk semua.',
          ]}
        />
        <Button variant="primary" onClick={() => consult()}>
          {t(book)}
        </Button>
        <div className="catalog-layout">
          <div
            className="catalog-tabs"
            role="tablist"
            aria-label={t(['Hardware categories', 'Kategori perangkat keras'])}
          >
            {hardwareTabs.map((label, i) => (
              <button
                key={i}
                role="tab"
                id={`hardware-tab-${i}`}
                aria-selected={tab === i}
                aria-controls={`hardware-panel-${i}`}
                tabIndex={tab === i ? 0 : -1}
                onClick={() => setTab(i)}
                onKeyDown={(e) => {
                  let next = i;
                  if (['ArrowDown', 'ArrowRight'].includes(e.key)) next = (i + 1) % 4;
                  else if (['ArrowUp', 'ArrowLeft'].includes(e.key)) next = (i + 3) % 4;
                  else if (e.key === 'Home') next = 0;
                  else if (e.key === 'End') next = 3;
                  else return;
                  e.preventDefault();
                  setTab(next);
                  document.getElementById(`hardware-tab-${next}`)?.focus();
                }}
              >
                <span aria-hidden="true" />
                {t(label)}
              </button>
            ))}
          </div>
          <div
            className="catalog-panel"
            role="tabpanel"
            id={`hardware-panel-${tab}`}
            aria-labelledby={`hardware-tab-${tab}`}
            tabIndex={0}
          >
            <p className="catalog-description">
              {t(
                tab === 0
                  ? [
                      'Rack infrastructure, virtualization, and high-performance servers sized for AI training, inference, and large-scale analytics workloads.',
                      'Infrastruktur rak, virtualisasi, dan server berkinerja tinggi untuk pelatihan AI, inferensi, dan analitik berskala besar.',
                    ]
                  : tab === 3
                    ? [
                        'An AI-powered camera ecosystem with on-device analytics across six device categories.',
                        'Ekosistem kamera berbasis AI dengan analitik pada perangkat dalam enam kategori.',
                      ]
                    : tab === 2
                      ? [
                          'Contact our team to discuss specialized and tactical equipment for your institution.',
                          'Hubungi tim kami untuk mendiskusikan peralatan khusus dan taktis bagi institusi Anda.',
                        ]
                      : [
                          'Build your company’s digital foundation with a fast, secure, and stable network infrastructure.',
                          'Bangun fondasi digital perusahaan dengan infrastruktur jaringan yang cepat, aman, dan stabil.',
                        ],
              )}
            </p>
            {groups.map((group, i) => (
              <div className="hardware-group" key={i}>
                {group.label && <h3>{group.label}</h3>}
                <div className="hardware-grid">
                  {group.names.map((name) => (
                    <button className="hardware-card" key={name} onClick={() => consult(name)}>
                      <span className="hardware-thumbnail">
                        <Img file="05d3b.png" />
                        <span />
                      </span>
                      <span>{name}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {tab === 2 && <Button onClick={() => consult(t(hardwareTabs[2]))}>{t(book)}</Button>}
          </div>
        </div>
      </div>
    </section>
  );
}
function Resources() {
  const { t, show, consult } = useSite();
  return (
    <section className="section resources" id="resources">
      <SectionLabel>{t(['Reports & insights', 'Laporan & wawasan'])}</SectionLabel>
      <div className="wrap section-body">
        <SectionHeading
          title={['Resources', 'Referensi']}
          description={[
            'Practical guidance on building infrastructure and AI systems in regulated environments.',
            'Panduan praktis membangun infrastruktur dan sistem AI di lingkungan teregulasi.',
          ]}
        />
        <div className="resource-list">
          {resources.map((resource) => (
            <article className="resource" key={resource.type}>
              <button
                className="resource-cover"
                aria-label={t(['View preview: ', 'Lihat pratinjau: ']) + t(resource.title)}
                onClick={() =>
                  show({
                    title: t(resource.title),
                    body: (
                      <>
                        <p>
                          {t([
                            'Design preview. Contact our team for the complete document.',
                            'Pratinjau desain. Hubungi tim kami untuk dokumen lengkap.',
                          ])}
                        </p>
                        <Img file="ad276.png" alt={t(resource.title)} className="dialog-image" />
                        <Button onClick={() => consult(t(resource.title))}>
                          {t(['Request document', 'Minta dokumen'])}
                        </Button>
                      </>
                    ),
                  })
                }
              >
                <Img file="ad276.png" alt={t(resource.title)} />
              </button>
              <div>
                <p className="kicker resource-meta">
                  {resource.type} <span>|</span> PDF · {resource.pages} {t(['PAGES', 'HALAMAN'])}
                </p>
                <h3>{t(resource.title)}</h3>
                <div className="resource-actions">
                  <button
                    onClick={() =>
                      show({
                        title: t(resource.title),
                        body: (
                          <>
                            <Img
                              file="ad276.png"
                              alt={t(resource.title)}
                              className="dialog-image"
                            />
                            <p>
                              {t([
                                'This is the document preview supplied in the design. Request the complete PDF from our team.',
                                'Ini adalah pratinjau dokumen dari desain. Minta PDF lengkap kepada tim kami.',
                              ])}
                            </p>
                            <Button onClick={() => consult(t(resource.title))}>
                              {t(['Request PDF', 'Minta PDF'])}
                            </Button>
                          </>
                        ),
                      })
                    }
                  >
                    {t(['View', 'Lihat'])}
                  </button>
                  <button
                    onClick={() =>
                      show({
                        title: t(resource.title),
                        body: (
                          <>
                            <p>
                              {t([
                                'The complete PDF is available on request. Contact hello@nusensia.com to request this document.',
                                'PDF lengkap tersedia melalui permintaan. Hubungi hello@nusensia.com untuk meminta dokumen ini.',
                              ])}
                            </p>
                            <Button onClick={() => consult(t(resource.title))}>
                              {t(['Request PDF', 'Minta PDF'])}
                            </Button>
                          </>
                        ),
                      })
                    }
                  >
                    {t(['Download', 'Unduh'])}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function AboutHero() {
  const { t } = useSite();
  return (
    <section className="about-hero wrap">
      <span className="eyebrow">{t(['About Us', 'Tentang Kami'])}</span>
      <div className="about-title">
        <h1>
          {t([
            'Technology infrastructure for Indonesia’s institutions',
            'Infrastruktur teknologi untuk institusi Indonesia',
          ])}
        </h1>
        <p>
          {t([
            'Nusensia provides IT infrastructure, software, data, and AI solutions for government, BUMN, and enterprise.',
            'Nusensia menyediakan solusi infrastruktur TI, perangkat lunak, data, dan AI untuk pemerintah, BUMN, dan perusahaan.',
          ])}
        </p>
      </div>
      <div className="about-photos">
        <Img
          file="b6ff1.png"
          alt={t([
            'Nusensia presenting a technology workshop',
            'Presentasi workshop teknologi Nusensia',
          ])}
          eager
        />
        <div>
          <Img
            file="b68ba.png"
            alt={t(['Team collaboration during a workshop', 'Kolaborasi tim saat workshop'])}
            eager
          />
          <Img
            file="72920.png"
            alt={t(['Institutional training session', 'Sesi pelatihan institusi'])}
            eager
          />
        </div>
      </div>
      <ClientLogos />
    </section>
  );
}
function Story() {
  const { t } = useSite();
  return (
    <section className="section story">
      <SectionLabel>{t(['Our story', 'Cerita kami'])}</SectionLabel>
      <div className="wrap story-layout">
        <Img
          file="c74ba.png"
          alt={t(['Team collaborating on technology', 'Tim berkolaborasi mengembangkan teknologi'])}
        />
        <div>
          <p>
            {t([
              "Nusensia was founded to close a gap we kept seeing across Indonesia's public and enterprise sectors: ambitious digital transformation mandates, with no single partner able to own the infrastructure underneath them.",
              'Nusensia didirikan untuk menjawab kesenjangan di sektor publik dan perusahaan Indonesia: mandat transformasi digital yang ambisius, namun belum ada satu mitra yang menangani seluruh infrastrukturnya.',
            ])}
          </p>
          <p>
            {t([
              "We work end to end — from data center racks and high-performance servers as a Lenovo-authorized partner, to big data platforms, custom software, and private AI systems deployed inside our clients' own infrastructure.",
              'Kami bekerja menyeluruh — dari rak data center dan server berkinerja tinggi sebagai mitra resmi Lenovo, hingga platform big data, perangkat lunak khusus, dan sistem AI privat di infrastruktur klien.',
            ])}
          </p>
          <p>
            {t([
              'That full-stack ownership is deliberate. Institutions handling sensitive data need a partner who takes responsibility from the hardware layer up to the applications their teams use every day, and stays with them through operations, not just deployment.',
              'Tanggung jawab menyeluruh ini merupakan pilihan kami. Institusi dengan data sensitif memerlukan mitra yang bertanggung jawab dari perangkat keras hingga aplikasi sehari-hari, serta mendampingi operasional, bukan hanya implementasi.',
            ])}
          </p>
          <Stats compact />
        </div>
      </div>
    </section>
  );
}
function SovereigntyArt() {
  return (
    <div className="sovereignty-art" aria-hidden="true">
      <Img file="f448e.svg" />
      {[
        ['024ab.svg', 17.4, 17.4],
        ['f54f9.svg', 350, 17.4],
        ['ff4c3.svg', 17.4, 203],
        ['d8214.svg', 350, 203],
        ['886ab.svg', 115.025, 36.025],
        ['92ff8.svg', 144.95, 65.95],
        ['9c63e.svg', 158, 87.25],
        ['8b642.svg', 155.6, 85.6],
        ['9c63e.svg', 158, 111.25],
        ['8b642.svg', 155.6, 109.6],
        ['9c63e.svg', 158, 135.25],
        ['8b642.svg', 155.6, 133.6],
        ['c9d71.svg', 176.45, 160.45],
      ].map(([file, left, top], i) => (
        <img
          key={i}
          src={asset(file as string)}
          alt=""
          style={{ left: `${left}px`, top: `${top}px` }}
          loading="lazy"
        />
      ))}
    </div>
  );
}
function Principles() {
  const { t } = useSite();
  return (
    <section className="section principles">
      <SectionLabel>{t(['What we stand for', 'Prinsip kami'])}</SectionLabel>
      <div className="wrap section-body">
        <SectionHeading
          title={['The principles behind every engagement', 'Prinsip di balik setiap kerja sama']}
          description={[
            'We know how institutional buying works, and we structure our engagements to fit it.',
            'Kami memahami pengadaan institusi dan menyusun kerja sama kami sesuai kebutuhannya.',
          ]}
        />
        <div className="card-grid three">
          {principles.map((p, i) => (
            <article className="principle-card" key={p.image}>
              <div className="principle-illustration">
                {i === 0 ? <SovereigntyArt /> : <Img file={p.image} />}
              </div>
              <div className="card-copy">
                <h3>{t(p.title)}</h3>
                <p>{t(p.description)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function Team() {
  const { t, show, consult } = useSite();
  return (
    <section className="section team">
      <SectionLabel>{t(['Meet our team', 'Kenali tim kami'])}</SectionLabel>
      <div className="wrap section-body">
        <h2>
          {t([
            'The People Accountable For Delivery',
            'Tim yang Bertanggung Jawab atas Implementasi',
          ])}
        </h2>
        <div className="team-grid">
          {team.map((person, i) => (
            <article key={person.name}>
              <div className={`team-photo person-${i}`}>
                <div>
                  <Img file={person.image} alt={person.name} />
                </div>
              </div>
              <h3>{person.name}</h3>
              <p className="team-role">{person.role}</p>
              <p>{t(person.description)}</p>
              <button
                className="text-button"
                onClick={() =>
                  show({
                    title: person.name,
                    body: (
                      <>
                        <p className="kicker">{person.role}</p>
                        <p>{t(person.description)}</p>
                        <p>
                          {t([
                            'Meet the team behind Nusensia. Schedule a conversation to discuss your institution’s technology needs.',
                            'Kenali tim di balik Nusensia. Jadwalkan percakapan untuk membahas kebutuhan teknologi institusi Anda.',
                          ])}
                        </p>
                        <Button onClick={() => consult(`Meet ${person.name}`)}>{t(book)}</Button>
                      </>
                    ),
                  })
                }
              >
                {t(['Read more', 'Baca selengkapnya'])}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <ClientLogos />
      <SolutionCards centered />
      <SolutionCards kind="hardware" centered />
      <Products />
      <PortfolioProjects />
      <Delivery />
      <Testimonials />
      <Cta />
    </>
  );
}
function Solutions() {
  return (
    <>
      <Hero page="solutions" />
      <SolutionCards />
      <Products />
      <HardwareCatalog />
      <Cta variant="solutions" />
    </>
  );
}
function Portfolio() {
  return (
    <>
      <Hero page="portfolio" />
      <PortfolioProjects />
      <Resources />
      <Cta variant="portfolio" />
    </>
  );
}
function Clients() {
  const { t } = useSite();
  return (
    <>
      <Hero page="clients" />
      <Stats />
      <section className="section">
        <SectionLabel>{t(['Our happy clients', 'Klien kami'])}</SectionLabel>
        <ClientLogos grid />
      </section>
      <Delivery institutional />
      <Testimonials />
      <Cta />
    </>
  );
}
function About() {
  return (
    <>
      <AboutHero />
      <Story />
      <Principles />
      <Team />
      <Testimonials />
      <Cta variant="about" />
    </>
  );
}
function NotFound() {
  const { t } = useSite();
  return (
    <section className="not-found wrap">
      <span className="kicker">404</span>
      <h1>{t(['Page not found', 'Halaman tidak ditemukan'])}</h1>
      <p>
        {t([
          'Explore our solutions or return to the homepage.',
          'Jelajahi solusi kami atau kembali ke beranda.',
        ])}
      </p>
      <Button to="/">{t(['Back to home', 'Kembali ke beranda'])}</Button>
    </section>
  );
}

function ConsultationForm({ subject }: { subject: string }) {
  const { t } = useSite();
  const [emailUrl, setEmailUrl] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const body = `Name: ${values.get('name')}\nEmail: ${values.get('email')}\nOrganization: ${values.get('organization')}\n\n${values.get('message')}`;
    setEmailUrl(
      `mailto:hello@nusensia.com?subject=${encodeURIComponent(subject || 'Consultation request — Nusensia')}&body=${encodeURIComponent(body)}`,
    );
  }
  return (
    <form className="consultation-form" onSubmit={submit}>
      <p>
        {t([
          'Tell us what you are planning. This form prepares an email for you to review and send to our team.',
          'Ceritakan rencana Anda. Formulir ini menyiapkan email untuk Anda tinjau dan kirim kepada tim kami.',
        ])}
      </p>
      <div className="form-row">
        <label>
          {t(['Full name', 'Nama lengkap'])}
          <input name="name" autoComplete="name" required maxLength={120} />
        </label>
        <label>
          {t(['Work email', 'Email kerja'])}
          <input name="email" type="email" autoComplete="email" required maxLength={200} />
        </label>
      </div>
      <label>
        {t(['Organization', 'Organisasi'])}
        <input name="organization" autoComplete="organization" required maxLength={200} />
      </label>
      <label>
        {t(['Your requirements', 'Kebutuhan Anda'])}
        <textarea name="message" rows={4} required maxLength={3000} defaultValue={subject} />
      </label>
      <button className="button button-primary" type="submit">
        {t(['Prepare email', 'Siapkan email'])}
        <Arrow white />
      </button>
      {emailUrl && (
        <div className="email-ready" role="status">
          <p>
            {t([
              'Your email draft is ready. Open your email app to review and send it. Nothing has been sent yet.',
              'Draf email siap. Buka aplikasi email untuk meninjau dan mengirimnya. Belum ada pesan yang dikirim.',
            ])}
          </p>
          <a className="button button-light" href={emailUrl}>
            {t(['Open email app', 'Buka aplikasi email'])}
          </a>
        </div>
      )}
      <a className="direct-email" href="mailto:hello@nusensia.com">
        hello@nusensia.com
      </a>
    </form>
  );
}
function Modal({ content, onClose }: { content: ModalContent; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const { t } = useSite();
  useEffect(() => {
    if (!content) return;
    const focused = document.activeElement as HTMLElement | null;
    const el = dialog.current!;
    el.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      el.close();
      document.body.style.overflow = previousOverflow;
      focused?.focus();
    };
  }, [content]);
  if (!content) return null;
  return (
    <dialog
      ref={dialog}
      className="dialog"
      aria-labelledby="dialog-title"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === dialog.current) {
          const box = dialog.current.getBoundingClientRect();
          if (
            e.clientX < box.left ||
            e.clientX > box.right ||
            e.clientY < box.top ||
            e.clientY > box.bottom
          )
            onClose();
        }
      }}
    >
      <div className="dialog-header">
        <h2 id="dialog-title">{content.title}</h2>
        <button onClick={onClose} aria-label={t(['Close dialog', 'Tutup dialog'])} autoFocus>
          ×
        </button>
      </div>
      <div className="dialog-body">{content.body}</div>
    </dialog>
  );
}
function ScrollAndTitle() {
  const location = useLocation();
  const { t, lang } = useSite();
  useEffect(() => {
    const title = navigation.find(([path]) => path === location.pathname)?.[1];
    document.title = `${title ? t(title) : '404'} — Nusensia`;
    document.documentElement.lang = lang;
    const handle = requestAnimationFrame(() => {
      if (location.hash)
        document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'instant' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
    });
    return () => cancelAnimationFrame(handle);
  }, [location, lang, t]);
  return null;
}
export default function App() {
  const [lang, setLanguage] = useState<'en' | 'id'>(() => {
    try {
      return localStorage.getItem('nusensia-language') === 'id' ? 'id' : 'en';
    } catch {
      return 'en';
    }
  });
  const [modal, setModal] = useState<ModalContent>(null);
  const t = useCallback(
    (copy: Copy) => (typeof copy === 'string' ? copy : copy[lang === 'en' ? 0 : 1]),
    [lang],
  );
  const setLang = (value: 'en' | 'id') => {
    setLanguage(value);
    try {
      localStorage.setItem('nusensia-language', value);
    } catch {
      /* Storage may be unavailable in private contexts. */
    }
  };
  const consult = (subject = '') =>
    setModal({
      title: t(['Let’s talk about your requirements', 'Mari diskusikan kebutuhan Anda']),
      body: <ConsultationForm key={subject} subject={subject} />,
    });
  return (
    <Site.Provider value={{ lang, setLang, t, consult, show: setModal }}>
      <ScrollAndTitle />
      <a className="skip-link" href="#main">
        {t(['Skip to content', 'Langsung ke konten'])}
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Modal content={modal} onClose={() => setModal(null)} />
    </Site.Provider>
  );
}
