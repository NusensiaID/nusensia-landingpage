export type Copy = string | readonly [string, string];
export const navigation = [
  ['/', ['Home', 'Beranda']],
  ['/solutions', ['Solutions', 'Solusi']],
  ['/portfolio', ['Portfolio', 'Portofolio']],
  ['/clients', ['Clients', 'Klien']],
  ['/about', ['About Us', 'Tentang Kami']],
] as const;
export const logos = [
  ['565aa.webp', 'Universitas Gadjah Mada'],
  ['736d6.webp', 'Bluebird Group'],
  ['ba3e4.png', 'Centre for Strategic and International Studies'],
  ['32051.webp', 'Bank Mandiri'],
  ['99e5e.webp', 'Microsoft'],
  ['0f7de.webp', 'PELNI'],
  ['ec670.png', 'Pegadaian'],
  ['abbaf.png', 'Kredivo'],
  ['3e25f.webp', 'Smartfren'],
  ['69daa.png', 'Lingkaran'],
  ['f4940.png', 'Zenius'],
  ['0ad07.webp', 'Purwadhika'],
];
export const software = [
  {
    image: '3157e.webp',
    title: 'Agentic BI',
    description: [
      'Ask your data anything. AI agents analyze, alert, and report in real time.',
      'Tanyakan apa saja pada data Anda. Agen AI menganalisis, memberi peringatan, dan melaporkan secara real-time.',
    ],
  },
  {
    image: '459b6.webp',
    title: 'Agentic ERP',
    description: [
      'Intelligent agents that keep procurement, inventory, and assets running on time.',
      'Agen cerdas yang menjaga pengadaan, inventaris, dan aset berjalan tepat waktu.',
    ],
  },
  {
    image: '4bf1a.webp',
    title: 'AI-Powered Software Engineering',
    description: [
      'Build faster with AI, and ship with confidence through automated security and code quality checks.',
      'Bangun lebih cepat dengan AI, didukung pemeriksaan keamanan dan kualitas kode otomatis.',
    ],
  },
] satisfies { image: string; title: Copy; description: Copy }[];
export const hardware = [
  {
    image: '05d3b.webp',
    title: ['Data Center Solutions', 'Solusi Data Center'],
    description: [
      'Rack and infrastructure design, power, cooling, and structured deployment for on-premise and hybrid environments.',
      'Desain rak dan infrastruktur, daya, pendinginan, serta implementasi terstruktur untuk lingkungan on-premise dan hybrid.',
    ],
  },
  {
    image: 'bbedf.webp',
    title: 'Enterprise AI',
    description: [
      'Use-case discovery, model development, LLM integration, and MLOps for secure, production-ready AI across on-premise, private, and cloud environments.',
      'Identifikasi use case, pengembangan model, integrasi LLM, dan MLOps untuk AI yang aman dan siap produksi di lingkungan on-premise, privat, dan cloud.',
    ],
  },
] satisfies { image: string; title: Copy; description: Copy }[];
export const products = [
  {
    name: 'Widya',
    category: ['Learning & Development platform', 'Platform Pembelajaran & Pengembangan'],
    image: '69af0.webp',
    description: [
      'WIDYA helps organizations manage learning at scale, from assigning training to tracking competency development across teams.',
      'WIDYA membantu organisasi mengelola pembelajaran dalam skala besar, dari penugasan pelatihan hingga pemantauan pengembangan kompetensi tim.',
    ],
    features: [
      [
        'Build courses and structured learning paths',
        'Bangun kursus dan jalur pembelajaran terstruktur',
      ],
      [
        'Assign training by role, unit, or development needs',
        'Tetapkan pelatihan berdasarkan peran, unit, atau kebutuhan pengembangan',
      ],
      [
        'Track progress, assessments, and certifications',
        'Pantau progres, penilaian, dan sertifikasi',
      ],
      [
        'Identify competency gaps and monitor learning outcomes',
        'Identifikasi kesenjangan kompetensi dan pantau hasil pembelajaran',
      ],
    ],
  },
  {
    name: 'Ampera',
    category: ['Asset Management Platform', 'Platform Manajemen Aset'],
    image: '83ff2.webp',
    description: [
      'Ampera is an enterprise asset management platform for managing the work around physical assets. It brings together asset records, inspections, maintenance, approvals, and audit history, while working alongside the systems your organization already uses.',
      'Ampera adalah platform manajemen aset perusahaan yang menyatukan catatan aset, inspeksi, pemeliharaan, persetujuan, dan riwayat audit, serta bekerja bersama sistem yang sudah digunakan organisasi Anda.',
    ],
    features: [
      [
        'Keep asset records, locations, custodians, and documents organized',
        'Kelola catatan, lokasi, penanggung jawab, dan dokumen aset',
      ],
      [
        'Track asset condition through inspections and field updates',
        'Pantau kondisi aset melalui inspeksi dan pembaruan lapangan',
      ],
      ['Support QR/barcode-based asset checks', 'Dukung pemeriksaan aset berbasis QR/barcode'],
      [
        'Work with existing ERP and accounting systems',
        'Terintegrasi dengan sistem ERP dan akuntansi yang ada',
      ],
      [
        'Deploy on-premise, in private cloud, or in another approved environment',
        'Implementasikan secara on-premise, di private cloud, atau lingkungan yang disetujui',
      ],
    ],
  },
] satisfies { name: string; category: Copy; image: string; description: Copy; features: Copy[] }[];
export const projects = [
  {
    name: 'CSIS Hate-speech Dashboard',
    category: ['Social Listening Dashboard', 'Dashboard Social Listening'],
    image: 'e944d.webp',
    description: [
      'The CSIS Hate-speech Dashboard tracks online hate speech trends in Indonesia. It uses a bespoke machine learning algorithm to collect Indonesian tweets on Twitter and identify whether they contain hate speech targeting one of five vulnerable minorities: Ahmadiyyas, Shi’as, Chinese Indonesian, Christians, and ethnic Papuans.',
      'CSIS Hate-speech Dashboard memantau tren ujaran kebencian daring di Indonesia. Algoritma machine learning khusus mengumpulkan tweet berbahasa Indonesia dan mengidentifikasi ujaran kebencian terhadap lima kelompok minoritas rentan: Ahmadiyah, Syiah, Tionghoa Indonesia, Kristen, dan etnis Papua.',
    ],
  },
  {
    name: 'LMS Intelijen',
    category: '',
    image: 'e32cd.webp',
    description: [
      'Home, News, Programs, Projects. Mentoring, My Learning, My Certifications',
      'Beranda, Berita, Program, Proyek. Mentoring, Pembelajaran Saya, Sertifikasi Saya',
    ],
  },
] satisfies { name: string; category: Copy; image: string; description: Copy }[];
export const process = [
  {
    title: ['Assess', 'Asesmen'],
    text: [
      'We map the current environment, constraints, and objectives with your technical and procurement teams.',
      'Kami memetakan lingkungan, kendala, dan tujuan bersama tim teknis dan pengadaan Anda.',
    ],
  },
  {
    title: ['Design', 'Desain'],
    text: [
      'We produce an architecture and delivery plan sized to your workloads, compliance, and budget.',
      'Kami menyusun arsitektur dan rencana implementasi sesuai beban kerja, kepatuhan, dan anggaran Anda.',
    ],
  },
  {
    title: ['Build & Integrate', 'Bangun & Integrasikan'],
    text: [
      'We deploy hardware, develop software, and integrate systems with minimal disruption to operations.',
      'Kami menerapkan perangkat keras, mengembangkan perangkat lunak, dan mengintegrasikan sistem dengan gangguan operasional minimal.',
    ],
  },
  {
    title: ['Operate & Support', 'Operasikan & Dukung'],
    text: [
      'We provide monitoring, lifecycle support, and iteration so systems keep performing after handover.',
      'Kami menyediakan pemantauan, dukungan siklus hidup, dan iterasi agar sistem terus berkinerja setelah serah terima.',
    ],
  },
] satisfies { title: Copy; text: Copy }[];
export const procurement = [
  {
    title: ['Procurement-ready documentation', 'Dokumentasi siap pengadaan'],
    text: [
      'We provide the technical specifications, compliance evidence, and pricing structures public-sector tenders require.',
      'Kami menyediakan spesifikasi teknis, bukti kepatuhan, dan struktur harga yang diperlukan tender sektor publik.',
    ],
  },
  {
    title: ['Direct engagement with technical teams', 'Kolaborasi langsung dengan tim teknis'],
    text: [
      'We work alongside your IT and operations teams from assessment through operation, not just at sign-off.',
      'Kami bekerja bersama tim TI dan operasi Anda dari asesmen hingga operasional, bukan hanya saat persetujuan akhir.',
    ],
  },
  {
    title: ['Data sovereignty by default', 'Kedaulatan data sebagai standar'],
    text: [
      'Every deployment keeps institutional data inside institutional boundaries, meeting residency requirements.',
      'Setiap implementasi menjaga data institusi di dalam batas institusi, sesuai persyaratan residensi data.',
    ],
  },
] satisfies { title: Copy; text: Copy }[];
export const quotes = [
  {
    text: [
      'We came to Nusensia with a tight deadline tied to our fiscal year. Their team was mobilized within days, gave us clear weekly progress updates, and delivered ahead of schedule without cutting corners.',
      'Kami datang ke Nusensia dengan tenggat ketat mengikuti tahun fiskal. Tim mereka bergerak dalam hitungan hari, memberikan pembaruan mingguan yang jelas, dan menyelesaikan pekerjaan lebih cepat tanpa mengurangi kualitas.',
    ],
    role: ['Head of IT, State-Owned Enterprise', 'Kepala TI, Badan Usaha Milik Negara'],
    avatar: '7c0bc.png',
  },
  {
    text: [
      'Before writing a single line of code, Nusensia mapped our entire approval process and BPMN in a detailed manner, making requirement gathering and problem discovery easier.',
      'Sebelum menulis satu baris kode pun, Nusensia memetakan seluruh proses persetujuan dan BPMN kami secara terperinci, sehingga pengumpulan kebutuhan dan identifikasi masalah menjadi lebih mudah.',
    ],
    role: ['HR Manager, State-Owned Enterprise', 'Manajer SDM, Badan Usaha Milik Negara'],
    avatar: 'e08c4.png',
  },
  {
    text: [
      'We could request the delivery 2 weeks earlier than estimated date of arrival. Thanks Nusensia.',
      'Kami dapat meminta pengiriman 2 minggu lebih awal dari perkiraan kedatangan. Terima kasih Nusensia.',
    ],
    role: [
      'Procurement Manager, State-Owned Enterprise',
      'Manajer Pengadaan, Badan Usaha Milik Negara',
    ],
    avatar: '9b0ba.png',
  },
  {
    text: [
      'Our data could not leave our network, and Nusensia built around that from day one. The on-premise AI solution passed our security review on the first submission, and our analysts now use it every day.',
      'Data kami tidak boleh keluar dari jaringan, dan Nusensia memahami hal itu sejak awal. Solusi AI on-premise lolos tinjauan keamanan pada pengajuan pertama dan kini digunakan analis kami setiap hari.',
    ],
    role: ['VP Data and AI, State-Owned Enterprise', 'VP Data dan AI, Badan Usaha Milik Negara'],
    avatar: '43ad4.png',
  },
  {
    text: [
      'What sets Nusensia apart is what happens after go-live. User training was practical and easy to follow, and their support team responds quickly whenever we need them. It feels like a partnership, not a handover.',
      'Yang membedakan Nusensia adalah dukungan setelah go-live. Pelatihan pengguna praktis dan mudah diikuti, dan tim dukungan mereka merespons cepat. Terasa seperti kemitraan, bukan sekadar serah terima.',
    ],
    role: [
      'Learning & Development Manager, BUMN Subsidiary',
      'Manajer Pembelajaran & Pengembangan, Anak Perusahaan BUMN',
    ],
    avatar: '2ff82.png',
  },
] satisfies { text: Copy; role: Copy; avatar: string }[];
export const resources = [
  {
    type: 'GUIDE',
    pages: 12,
    title: [
      'A procurement guide to enterprise AI systems',
      'Panduan pengadaan sistem AI perusahaan',
    ],
  },
  {
    type: 'BRIEF',
    pages: 9,
    title: [
      'Data residency and sovereignty for Indonesian institutions',
      'Residensi dan kedaulatan data untuk institusi Indonesia',
    ],
  },
  {
    type: 'WHITEPAPER',
    pages: 18,
    title: [
      'Building on-premise AI infrastructure in the public sector',
      'Membangun infrastruktur AI on-premise di sektor publik',
    ],
  },
] satisfies { type: string; pages: number; title: Copy }[];
export const principles = [
  {
    image: 'f448e.svg',
    title: ['Data sovereignty first', 'Kedaulatan data utama'],
    description: [
      'Your data stays within your infrastructure, never outsourced, never offshore.',
      'Data Anda tetap di dalam infrastruktur Anda, tanpa alih daya atau penyimpanan di luar negeri.',
    ],
  },
  {
    image: 'ed924.svg',
    title: ['End-to-end delivery', 'Implementasi menyeluruh'],
    description: [
      'From hardware racks to production software, we own the full stack of delivery.',
      'Dari rak perangkat keras hingga perangkat lunak produksi, kami menangani seluruh proses implementasi.',
    ],
  },
  {
    image: '5d39e.svg',
    title: ['Built to operate', 'Dirancang untuk beroperasi'],
    description: [
      'We design for the long term, systems that keep running long after handover.',
      'Kami merancang untuk jangka panjang, dengan sistem yang terus berjalan setelah serah terima.',
    ],
  },
] satisfies { image: string; title: Copy; description: Copy }[];
export const team = [
  {
    name: 'Rahadian Rizki',
    role: 'Chief Executive Officer',
    image: 'e25c8.webp',
    description: [
      '8 years experience in data and technology field.',
      '8 tahun pengalaman dalam bidang data dan teknologi.',
    ],
  },
  {
    name: 'Georgius Bagas',
    role: 'Chief Marketing Officer',
    image: '4b1d2.webp',
    description: [
      '2 years experience in natural commodities trading and marketing.',
      '2 tahun pengalaman dalam perdagangan dan pemasaran komoditas alam.',
    ],
  },
] satisfies { name: string; role: string; image: string; description: Copy }[];
