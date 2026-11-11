import { useEffect, useRef, useState } from "react";
import { MotionConfig, motion } from "motion/react";

const ASSET_BASE = import.meta.env.BASE_URL;

/*
 * Coordonnées et liens à personnaliser.
 * Les URL sociales restent masquées tant qu'elles ne sont pas renseignées.
 */
const PROFILE = {
  firstName: "Gabriel",
  lastName: "Endam’Engone",
  roleFr: "Développeur front-end et designer UI",
  roleEn: "Front-end developer and UI designer",
  cityFr: "Casablanca, Maroc",
  cityEn: "Casablanca, Morocco",
  bioFr: "Je conçois des expériences web claires et soignées, du premier écran aux derniers détails.",
  bioEn: "I design clear, thoughtful web experiences, from the first screen to the final detail.",

  /* Numéro à appeler et numéro principal pour la fiche contact. */
  phone: "+212674346915",
  phoneDisplay: "+212 674 346 915",

  /* Même adresse dans le lien e-mail et dans le fichier vCard. */
  email: "gabrielhalimengone@gmail.com",
  emailDisplay: "gabrielhalimengone@gmail.com",

  /* Les numéros WhatsApp sont convertis en liens wa.me automatiquement. */
  whatsapp: [
    { number: "+24107119210", display: "+241 07 11 92 10", regionFr: "Gabon", regionEn: "Gabon" },
    { number: "+212674346915", display: "+212 674 346 915", regionFr: "Maroc", regionEn: "Morocco" },
  ],

  portfolio: "https://gabrielhalim-dev.com/",
  portfolioDisplay: "gabrielhalim-dev.com",
  linkedin: "",
  linkedinDisplay: "",
  instagram: "",
  instagramDisplay: "",
  tiktok: "",
  tiktokDisplay: "",

  photo: `${ASSET_BASE}img/gabriel-polo-nuit.webp`,
};

const TEXT = {
  fr: {
    title: "Gabriel Endam’Engone — Développeur front-end & designer UI",
    description: "Gabriel Endam’Engone, développeur front-end et designer UI à Casablanca, conçoit des expériences web soignées. Découvrez son portfolio et contactez-le.",
    role: PROFILE.roleFr,
    city: PROFILE.cityFr,
    bio: PROFILE.bioFr,
    workHeading: "Découvrir",
    workHint: "Portfolio & réseaux",
    contactHeading: "Me contacter",
    contactHint: "Liens directs",
    labels: {
      portfolio: "Portfolio",
      linkedin: "LinkedIn",
      instagram: "Instagram",
      tiktok: "TikTok",
      phone: "Téléphone",
      whatsapp: "WhatsApp",
      email: "E-mail",
    },
    save: "Enregistrer le contact",
    saveShort: "Enregistrer",
    share: "Partager",
    print: "Imprimer la carte",
    themeToLight: "Activer le mode clair",
    themeToDark: "Activer le mode sombre",
    saved: "Fiche contact enregistrée.",
    copied: "Lien de la carte copié.",
    shared: "Carte partagée.",
    shareText: "Voici ma carte de contact numérique.",
    shareUnavailable: "Copiez le lien de cette page pour le partager.",
    footerCity: "Casablanca · Maroc",
  },
  en: {
    title: "Gabriel Endam’Engone — Front-end developer & UI designer",
    description: "Gabriel Endam’Engone is a front-end developer and UI designer in Casablanca. Explore his portfolio and get in touch about web projects.",
    role: PROFILE.roleEn,
    city: PROFILE.cityEn,
    bio: PROFILE.bioEn,
    workHeading: "Explore",
    workHint: "Portfolio & social",
    contactHeading: "Get in touch",
    contactHint: "Direct links",
    labels: {
      portfolio: "Portfolio",
      linkedin: "LinkedIn",
      instagram: "Instagram",
      tiktok: "TikTok",
      phone: "Phone",
      whatsapp: "WhatsApp",
      email: "Email",
    },
    save: "Save contact",
    saveShort: "Save",
    share: "Share",
    print: "Print the card",
    themeToLight: "Switch to light mode",
    themeToDark: "Switch to dark mode",
    saved: "Contact card saved.",
    copied: "Card link copied.",
    shared: "Card shared.",
    shareText: "Here is my digital contact card.",
    shareUnavailable: "Copy this page link to share it.",
    footerCity: "Casablanca · Morocco",
  },
};

const ICON_BY_KEY = {
  portfolio: "portfolio",
  linkedin: "linkedin",
  instagram: "instagram",
  tiktok: "tiktok",
  phone: "phone",
  whatsapp: "whatsapp",
  email: "mail",
};

function readPreference(key, fallback) {
  try {
    return window.localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

function escapeVCard(value) {
  return String(value || "")
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function IconLibrary() {
  return (
    <svg className="icon-library" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
      <symbol id="icon-portfolio" viewBox="0 0 24 24">
        <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
        <path d="M8 8h8M8 12h5M8 16h3" />
      </symbol>
      <symbol id="icon-linkedin" viewBox="0 0 24 24">
        <path d="M5 9v10M5 5.5v.1M10 19v-6a4 4 0 0 1 8 0v6M10 10v9" />
        <circle cx="5" cy="5.5" r="1" className="icon-fill" />
      </symbol>
      <symbol id="icon-instagram" viewBox="0 0 24 24">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.8" r=".8" className="icon-fill" />
      </symbol>
      <symbol id="icon-tiktok" viewBox="0 0 24 24">
        <path d="M14 4v10.3a3.8 3.8 0 1 1-3.1-3.7M14 4c.5 2.8 2.4 4.6 5 4.9" />
      </symbol>
      <symbol id="icon-phone" viewBox="0 0 24 24">
        <path d="M7 3.8 9.8 8l-1.7 1.8a14 14 0 0 0 6.1 6.1l1.8-1.7 4.2 2.8-.6 3.1a2 2 0 0 1-2.2 1.6C9.6 20.8 3.2 14.4 2.3 6.6A2 2 0 0 1 3.9 4.4L7 3.8Z" />
      </symbol>
      <symbol id="icon-whatsapp" viewBox="0 0 24 24">
        <path d="M20.2 11.7a8.2 8.2 0 0 1-12.1 7.2L3 20l1.2-4.8a8.2 8.2 0 1 1 16-3.5Z" />
        <path d="M8.4 8.2c.4 2.4 2.3 4.6 5.1 5.7l1.5-1 2 1.1-.2 1.5c-.1.7-.8 1.2-1.5 1.1-4.2-.7-7.6-4-8.3-8.1-.1-.7.4-1.4 1.1-1.6l1.4-.3 1.2 2-1 1.6" />
      </symbol>
      <symbol id="icon-mail" viewBox="0 0 24 24">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </symbol>
      <symbol id="icon-pin" viewBox="0 0 24 24">
        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="10" r="2.2" />
      </symbol>
      <symbol id="icon-arrow" viewBox="0 0 24 24">
        <path d="M7 17 17 7M8 7h9v9" />
      </symbol>
      <symbol id="icon-download" viewBox="0 0 24 24">
        <path d="M12 3v11m0 0 4-4m-4 4-4-4M4 17v3h16v-3" />
      </symbol>
      <symbol id="icon-share" viewBox="0 0 24 24">
        <circle cx="18" cy="5" r="2.5" />
        <circle cx="6" cy="12" r="2.5" />
        <circle cx="18" cy="19" r="2.5" />
        <path d="m8.2 10.8 7.5-4.4m-7.5 6.8 7.5 4.4" />
      </symbol>
      <symbol id="icon-sun" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </symbol>
      <symbol id="icon-moon" viewBox="0 0 24 24">
        <path d="M20.2 15.3A8.6 8.6 0 0 1 8.7 3.8 8.7 8.7 0 1 0 20.2 15.3Z" />
      </symbol>
      <symbol id="icon-print" viewBox="0 0 24 24">
        <path d="M7 8V4h10v4M7 16H5a2 2 0 0 1-2-2v-3a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v3a2 2 0 0 1-2 2h-2" />
        <path d="M7 13h10v7H7z" />
      </symbol>
    </svg>
  );
}

function Icon({ name, className = "" }) {
  return (
    <svg className={`icon ${className}`} aria-hidden="true">
      <use href={`#icon-${name}`} />
    </svg>
  );
}

function ContactLink({ item, index, labels }) {
  const opensNewTab = /^https?:/i.test(item.href);
  const label = item.label || labels[item.key];

  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.48,
        delay: 0.16 + Math.min(index, 7) * 0.055,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.a
        className="contact-link"
        href={item.href}
        aria-label={`${label} — ${item.display}`}
        target={opensNewTab ? "_blank" : undefined}
        rel={opensNewTab ? "noopener noreferrer" : undefined}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.995 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="link-icon-wrap">
          <Icon name={ICON_BY_KEY[item.key]} />
        </span>
        <span className="link-copy">
          <span className="link-label">{label}</span>
          <span className="link-detail">{item.display}</span>
        </span>
        <Icon name="arrow" className="link-arrow" />
      </motion.a>
    </motion.li>
  );
}

function LinkList({ items, labels }) {
  return (
    <ul className="link-list">
      {items
        .filter((item) => item.href && item.display)
        .map((item, index) => (
          <ContactLink
            key={`${item.key}-${index}`}
            item={item}
            index={index}
            labels={labels}
          />
        ))}
    </ul>
  );
}

export default function App() {
  const [language, setLanguage] = useState(() => {
    const saved = readPreference("contact-card-language", "");
    const browserLanguage = (navigator.language || "fr").slice(0, 2);
    return saved === "en" || (!saved && browserLanguage === "en") ? "en" : "fr";
  });
  const [theme, setTheme] = useState(() => {
    return readPreference("contact-card-theme", "dark") === "light" ? "light" : "dark";
  });
  const [toast, setToast] = useState("");
  const toastTimer = useRef(null);
  const t = TEXT[language];
  const fullName = `${PROFILE.firstName} ${PROFILE.lastName}`;

  useEffect(() => {
    try {
      window.localStorage.setItem("contact-card-language", language);
      window.localStorage.setItem("contact-card-theme", theme);
    } catch {
      /* La carte reste utilisable si le navigateur bloque le stockage local. */
    }

    document.documentElement.lang = language;
    document.documentElement.dataset.theme = theme;
    document.title = t.title;
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      "content",
      theme === "dark" ? "#08111d" : "#f4f1e9",
    );
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", t.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", t.description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", t.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", t.description);
  }, [language, theme, t.description, t.title]);

  useEffect(() => {
    return () => window.clearTimeout(toastTimer.current);
  }, []);

  function showToast(message) {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), 2400);
  }

  function downloadContact() {
    const phoneNumbers = [PROFILE.phone, ...PROFILE.whatsapp.map((contact) => contact.number)];
    const uniqueNumbers = [...new Set(phoneNumbers.map((number) => number.replace(/\D/g, "")))];
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:${escapeVCard(PROFILE.lastName)};${escapeVCard(PROFILE.firstName)};;;`,
      `FN:${escapeVCard(fullName)}`,
      `TITLE:${escapeVCard(t.role)}`,
      ...uniqueNumbers.map((number) => `TEL;TYPE=CELL,VOICE:+${number}`),
      `EMAIL;TYPE=INTERNET:${escapeVCard(PROFILE.email)}`,
      `URL:${escapeVCard(PROFILE.portfolio)}`,
      "ADR;TYPE=WORK:;;Casablanca;;;Maroc",
      "END:VCARD",
    ].join("\r\n");

    const url = URL.createObjectURL(new Blob([vcard], { type: "text/vcard;charset=utf-8" }));
    const download = document.createElement("a");
    download.href = url;
    download.download = "Gabriel-Endam-Engone.vcf";
    document.body.appendChild(download);
    download.click();
    download.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast(t.saved);
  }

  async function shareCard() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: fullName, text: t.shareText, url });
        showToast(t.shared);
        return;
      } catch (error) {
        if (error?.name === "AbortError") return;
      }
    }

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
        showToast(t.copied);
        return;
      }
    } catch {
      /* Continuer vers la copie manuelle si le presse-papiers est indisponible. */
    }

    window.prompt(t.shareUnavailable, url);
  }

  const hasSocialLinks = Boolean(PROFILE.linkedin || PROFILE.instagram || PROFILE.tiktok);
  const workItems = [
    { key: "portfolio", href: PROFILE.portfolio, display: PROFILE.portfolioDisplay },
    { key: "linkedin", href: PROFILE.linkedin, display: PROFILE.linkedinDisplay },
    { key: "instagram", href: PROFILE.instagram, display: PROFILE.instagramDisplay },
    { key: "tiktok", href: PROFILE.tiktok, display: PROFILE.tiktokDisplay },
  ];
  const contactItems = [
    { key: "phone", href: `tel:${PROFILE.phone}`, display: PROFILE.phoneDisplay },
    ...PROFILE.whatsapp.map((contact) => ({
      key: "whatsapp",
      label: `${t.labels.whatsapp} · ${language === "fr" ? contact.regionFr : contact.regionEn}`,
      href: `https://wa.me/${contact.number.replace(/\D/g, "")}`,
      display: contact.display,
    })),
    { key: "email", href: `mailto:${PROFILE.email}`, display: PROFILE.emailDisplay },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <IconLibrary />
      <main className="page-shell">
        <motion.article
          className="contact-card"
          aria-labelledby="profile-name"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <header>
            <nav className="utility-bar" aria-label={language === "fr" ? "Préférences de la carte" : "Card preferences"}>
              <a
                className="brand-lockup"
                href={PROFILE.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={language === "fr" ? "Portfolio de Gabriel Halim" : "Gabriel Halim’s portfolio"}
              >
                <svg className="brand-mark" viewBox="0 0 512 512" role="img" aria-label="Logo Élan">
                  <g transform="translate(36 40)">
                    <path className="brand-shape" d="M70 314V106h66v142Z" />
                    <path className="brand-shape" d="M164 314V164h66v84Z" />
                    <path className="brand-accent" d="M258 314V70h112v66h-46v112Z" />
                  </g>
                </svg>
                <span className="brand-copy" aria-hidden="true">
                  <strong>GABRIEL HALIM</strong>
                  <span>Solutions digitales</span>
                </span>
              </a>

              <div className="utility-actions">
                <div className="languages" role="group" aria-label={language === "fr" ? "Choisir la langue" : "Choose language"}>
                  <button
                    type="button"
                    aria-label="Français"
                    aria-pressed={language === "fr"}
                    onClick={() => setLanguage("fr")}
                  >
                    FR
                  </button>
                  <button
                    type="button"
                    aria-label="English"
                    aria-pressed={language === "en"}
                    onClick={() => setLanguage("en")}
                  >
                    EN
                  </button>
                </div>
                <button
                  className="theme-toggle"
                  type="button"
                  aria-label={theme === "dark" ? t.themeToLight : t.themeToDark}
                  title={theme === "dark" ? t.themeToLight : t.themeToDark}
                  onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
                >
                  <Icon name={theme === "dark" ? "sun" : "moon"} />
                </button>
              </div>
            </nav>

            <div className="profile">
              <div className="profile-main">
                <div className="portrait-frame">
                  <img
                    src={PROFILE.photo}
                    alt={fullName}
                    className="avatar"
                    width="1738"
                    height="905"
                    fetchPriority="high"
                  />
                </div>
                <div className="profile-copy">
                  <h1 id="profile-name">
                    <span>{PROFILE.firstName}</span>
                    <span>{PROFILE.lastName}</span>
                  </h1>
                  <p className="role">{t.role}</p>
                  <p className="city">
                    <Icon name="pin" />
                    <span>{t.city}</span>
                  </p>
                </div>
              </div>
              <p className="bio">{t.bio}</p>
            </div>
          </header>

          <div className="card-links">
            <section className="link-section" aria-labelledby="work-heading">
              <h2 className="section-heading" id="work-heading">
                {t.workHeading}
                <span>{hasSocialLinks ? t.workHint : ""}</span>
              </h2>
              <LinkList items={workItems} labels={t.labels} />
            </section>

            <section className="link-section" aria-labelledby="contact-heading">
              <h2 className="section-heading" id="contact-heading">
                {t.contactHeading}
                <span>{t.contactHint}</span>
              </h2>
              <LinkList items={contactItems} labels={t.labels} />
            </section>
          </div>

          <footer className="card-footer">
            <span>{fullName}</span>
            <span>{t.footerCity}</span>
          </footer>
        </motion.article>
      </main>

      <div className="action-dock" role="group" aria-label={language === "fr" ? "Actions de la carte" : "Card actions"}>
        <div className="action-dock-inner">
          <button className="action-button primary" id="save-contact" type="button" onClick={downloadContact}>
            <Icon name="download" />
            <span className="save-label-full">{t.save}</span>
            <span className="save-label-compact" aria-hidden="true">{t.saveShort}</span>
          </button>
          <button className="action-button" id="share-card" type="button" onClick={shareCard}>
            <Icon name="share" />
            <span>{t.share}</span>
          </button>
          <button
            className="print-button"
            id="print-card"
            type="button"
            aria-label={t.print}
            title={t.print}
            onClick={() => window.print()}
          >
            <Icon name="print" />
            <span className="sr-only">{t.print}</span>
          </button>
        </div>
      </div>

      <div className="toast" role="status" aria-live="polite" aria-atomic="true">
        {toast}
      </div>
    </MotionConfig>
  );
}
