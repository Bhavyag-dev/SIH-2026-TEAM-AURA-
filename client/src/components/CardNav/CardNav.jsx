import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './CardNav.css';

function ArrowIcon({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.25 15.5a.75.75 0 0 1-.75-.75V7.56L7.28 17.78a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L16.44 6.5H9.25a.75.75 0 0 1 0-1.5h9a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75Z" />
    </svg>
  );
}

const defaultItems = [
  {
    label: 'Portals',
    bgColor: '#132a13',
    textColor: '#ecf39e',
    links: [
      { label: '👨‍🌾 Farmer Portal', href: '/farmer/home', ariaLabel: 'Farmer Portal' },
      { label: '🏪 Buyer Market', href: '/user/home', ariaLabel: 'Buyer Marketplace' },
      { label: '🛡️ Admin Tower', href: '/admin/dashboard', ariaLabel: 'Admin Tower' }
    ]
  },
  {
    label: 'Corridors',
    bgColor: '#31572c',
    textColor: '#f4f6f2',
    links: [
      { label: 'Live Rates', href: '#produce', ariaLabel: 'Produce Rates' },
      { label: 'Cold Hubs', href: '#facilities', ariaLabel: 'Cold Facilities' },
      { label: 'Fleet Routes', href: '#programs', ariaLabel: 'Corridor Routes' }
    ]
  },
  {
    label: 'Connect',
    bgColor: '#4f772d',
    textColor: '#ffffff',
    links: [
      { label: 'Book Hub Visit', href: '#contact-modal', ariaLabel: 'Book Hub Visit' },
      { label: 'FPO Network', href: '#coaches', ariaLabel: 'FPO Network' },
      { label: 'Impact Data', href: '#stats', ariaLabel: 'Impact Data' }
    ]
  }
];

const CardNav = ({
  logo,
  logoAlt = 'KrishiRoute',
  title = 'KrishiRoute',
  items = defaultItems,
  className = '',
  ease = 'power3.out',
  baseColor = 'rgba(244, 246, 242, 0.95)',
  menuColor = '#132a13',
  buttonBgColor = '#132a13',
  buttonTextColor = '#ecf39e',
  ctaText = 'Select Portal',
  onCtaClick
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content');
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';

        // trigger reflow
        void contentEl.offsetHeight;

        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease
    });

    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = i => el => {
    if (el) cardsRef.current[i] = el;
  };

  const handleLinkClick = (e, href) => {
    if (href === '#contact-modal') {
      e.preventDefault();
      const modal = document.getElementById('contact-modal');
      if (modal) {
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
      }
    } else if (href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // If open, close menu smoothly
    if (isExpanded) {
      toggleMenu();
    }
  };

  const handleCta = (e) => {
    if (onCtaClick) {
      onCtaClick(e);
      return;
    }
    const modal = document.getElementById('contact-modal');
    if (modal) {
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
    }
  };

  return (
    <div className={`card-nav-container ${className}`}>
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? 'open' : ''}`}
        style={{ backgroundColor: baseColor }}
      >
        <div className="card-nav-top">
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
              }
            }}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            aria-expanded={isExpanded}
            tabIndex={0}
            style={{ color: menuColor }}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>

          <a href="#hero-section" className="logo-container" aria-label="KrishiRoute Home">
            {logo ? (
              <img src={logo} alt={logoAlt} className="logo" />
            ) : (
              <span className="logo-symbol">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12A10 10 0 0 1 12 2Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>
            )}
            <span className="logo-title">{title}</span>
          </a>

          <button
            type="button"
            className="card-nav-cta-button"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
            onClick={handleCta}
          >
            {ctaText}
          </button>
        </div>

        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links?.map((lnk, linkIdx) => (
                  <a
                    key={`${lnk.label}-${linkIdx}`}
                    className="nav-card-link"
                    href={lnk.href}
                    aria-label={lnk.ariaLabel}
                    onClick={(e) => handleLinkClick(e, lnk.href)}
                  >
                    <ArrowIcon className="nav-card-link-icon" />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
