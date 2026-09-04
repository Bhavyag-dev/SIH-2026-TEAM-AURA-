import React, { useEffect } from 'react';
import Lenis from 'lenis';
import CardNav from '../components/CardNav/CardNav';
import './landing.css';

const HTML_CONTENT = `<!-- ==========================================================================
       INTRO LOADER CURTAIN
       ========================================================================== -->
  <div id="intro-loader" aria-hidden="false">
    <div class="loader-wordmark" id="loader-wordmark">
      <svg class="header-brand-mark" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 10a6 6 0 0 0-6-6H3v2a6 6 0 0 0 6 6h3"/>
        <path d="M12 14a6 6 0 0 1 6-6h3v2a6 6 0 0 1-6 6h-3"/>
        <line x1="12" y1="22" x2="12" y2="10"/>
      </svg>
      <span>KrishiRoute</span>
    </div>
    <div class="loader-progress-track">
      <div class="loader-progress-fill" id="loader-fill"></div>
    </div>
  </div>

  <!-- ==========================================================================
       FULLSCREEN MENU OVERLAY
       ========================================================================== -->
  <div id="menu-overlay" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Site Navigation">
    <div class="menu-backdrop" id="menu-backdrop"></div>
    <div class="menu-panel">
      <div class="menu-top-row">
        <div class="menu-brand">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="9"/>
            <path d="M4.8 5.6A9 9 0 0 0 4.8 18.4"/>
            <path d="M19.2 5.6a9 9 0 0 1 0 12.8"/>
          </svg>
          <span>KrishiRoute</span>
        </div>
        <button type="button" class="menu-close-btn" id="menu-close-btn" aria-label="Close menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 6l12 12M18 6L6 18"/>
          </svg>
        </button>
      </div>
      <nav class="menu-nav-center">
        <a href="/farmer/home" class="menu-link" style="transition-delay: 100ms;">👨‍🌾 Farmer Portal</a>
        <a href="/user/home" class="menu-link" style="transition-delay: 160ms;">🏪 Buyer Marketplace</a>
        <a href="/admin/dashboard" class="menu-link" style="transition-delay: 220ms;">🛡️ Admin Tower</a>
        <a href="#programs" class="menu-link" style="transition-delay: 280ms;">Platform Modules</a>
        <a href="#facilities" class="menu-link" style="transition-delay: 340ms;">Cold-Chain Network</a>
        <a href="#stats-section" class="menu-link" style="transition-delay: 400ms;">Corridor Impact</a>
      </nav>
      <div class="menu-bottom-row">
        <button type="button" class="pill-btn pill-btn-light btn-open-modal">
          <span>Select Portal</span>
          <svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6"/>
          </svg>
        </button>
        <div class="menu-social-nav">
          <a href="#instagram">Instagram</a>
          <a href="#x">X</a>
          <a href="#youtube">YouTube</a>
          <a href="#linkedin">LinkedIn</a>
        </div>
      </div>
    </div>
  </div>

  <!-- ==========================================================================
       CONTACT MODAL
       ========================================================================== -->
  <div id="contact-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <div class="modal-backdrop" id="modal-backdrop"></div>
    <div class="modal-panel">
      <div class="modal-header">
        <div>
          <div class="eyebrow eyebrow-dark">
            <span class="eyebrow-dot"></span>
            <span>Choose your portal</span>
          </div>
          <h2 id="modal-title" class="modal-heading-text">
            <span class="clip-box"><span class="clip-line" style="transition: transform 800ms cubic-bezier(0.16, 1, 0.3, 1), opacity 800ms;">Enter</span></span><br>
            <span class="clip-box"><span class="clip-line" style="transition: transform 800ms cubic-bezier(0.16, 1, 0.3, 1) 90ms, opacity 800ms 90ms;">the portal</span></span>
          </h2>
        </div>
        <button type="button" class="modal-close-btn" id="modal-close-btn" aria-label="Close modal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 6l12 12M18 6L6 18"/>
          </svg>
        </button>
      </div>

      <div class="modal-portals-quick" style="display: flex; gap: 0.5rem; margin-top: 1.25rem; margin-bottom: 1.25rem;">
          <a href="/farmer/home" class="pill-btn pill-btn-solid" style="flex: 1; text-align: center; justify-content: center; font-size: 0.75rem; padding: 0.75rem 0.25rem;">👨‍🌾 Farmer</a>
          <a href="/user/home" class="pill-btn pill-btn-solid" style="flex: 1; text-align: center; justify-content: center; font-size: 0.75rem; padding: 0.75rem 0.25rem;">🏪 Buyer</a>
          <a href="/admin/dashboard" class="pill-btn pill-btn-solid" style="flex: 1; text-align: center; justify-content: center; font-size: 0.75rem; padding: 0.75rem 0.25rem;">🛡️ Admin</a>
        </div>
      <form class="contact-form" id="contact-form" novalidate>
        <div class="form-group">
          <label for="contact-name" class="form-label">Full name</label>
          <input type="text" id="contact-name" name="name" class="form-input" placeholder="Alex Rivera" required>
        </div>
        <div class="form-group">
          <label for="contact-email" class="form-label">Email</label>
          <input type="email" id="contact-email" name="email" class="form-input" placeholder="you@email.com" required>
        </div>
        <div class="form-group">
          <label for="contact-note" class="form-label">Agricultural Requirement / Note</label>
          <textarea id="contact-note" name="note" class="form-textarea" rows="3" placeholder="I want to sell 20 tonnes of Nashik tomatoes / buy Sharbati wheat…"></textarea>
        </div>
        <button type="submit" class="form-submit-btn" id="modal-submit-btn">Submit Inquiry</button>
      </form>

      <div class="success-panel" id="modal-success">
        <div class="success-check-circle">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <div class="success-title">Request received</div>
        <p class="success-subtext" id="success-message">Thanks, Alex — our team will be in touch to lock in your visit.</p>
        <button type="button" class="pill-btn pill-btn-solid" id="modal-done-btn" style="margin-top: 0.5rem;">
          <span>Done</span>
        </button>
      </div>
    </div>
  </div>

  <!-- ==========================================================================
       MAIN VIEWPORT CONTAINER
       ========================================================================== -->
  <main id="main-content">

    <!-- ========================================================================
         1) HERO SECTION
         ======================================================================== -->
    <section id="hero-section" aria-label="Baseline Hero">
      <!-- Parallax Video Plate -->
      <div class="hero-bg-plate">
        <div class="hero-bg-inner" id="hero-plate">
          <video
            class="hero-video-bg"
            src="/bgvid.mp4"
            autoplay
            loop
            muted
            playsinline
            preload="auto"
            poster="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2000&auto=format&fit=crop"
          ></video>
        </div>
        <div class="hero-bg-overlay"></div>
      </div>

      <!-- Bottom Row -->
      <div class="hero-bottom-row">
        <!-- Left Side Bottom Title Block -->
        <div class="hero-bottom-brand-block">
          <h1 id="hero-title" class="hero-bottom-brand-title">
            <span class="hero-brand-line">
              <span class="clip-box"><span class="clip-word hero-word" style="transition: transform 1100ms cubic-bezier(0.16, 1, 0.3, 1), opacity 1100ms;">KrishiRoute</span></span>
            </span>
            <span class="hero-sub-line">
              <span class="clip-box"><span class="clip-word hero-word" style="transition: transform 1100ms cubic-bezier(0.16, 1, 0.3, 1) 180ms, opacity 1100ms 180ms;">Direct Farm To Fork</span></span>
            </span>
          </h1>
          <p class="hero-sub-tagline">
            <span class="clip-box"><span class="clip-line tagline-line" style="transition: transform 900ms cubic-bezier(0.16, 1, 0.3, 1) 360ms, opacity 900ms 360ms;">Smart Cold-Chain Logistics &amp; Direct Farmer Marketplace</span></span>
          </p>
        </div>

        <!-- Right Cluster -->
        <div class="hero-right-cluster">
          <!-- Collection Slider -->
          <div class="collection-slider-wrap inview-node" id="hero-collection-wrap" style="transform: translateY(28px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease;">
            <div class="collection-card-frame">
              <!-- Slide 1 -->
              <div class="collection-slide slide-active" data-collection-slide="0">
                <img src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=600&auto=format&fit=crop" alt="Player driving a backhand on a hard court" class="collection-thumb" loading="lazy">
                <div class="collection-info">
                  <span class="collection-brand">Shree Krishi FPO</span>
                  <span class="collection-title">Grade-A Tomatoes</span>
                  <a href="/user/home" class="collection-cta">Procure Lot &rarr;</a>
                </div>
              </div>
              <!-- Slide 2 -->
              <div class="collection-slide slide-hidden" data-collection-slide="1">
                <img src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=600&auto=format&fit=crop" alt="Player stretching for a forehand on clay" class="collection-thumb" loading="lazy">
                <div class="collection-info">
                  <span class="collection-brand">Malwa Kisan Org</span>
                  <span class="collection-title">Sharbati Wheat</span>
                  <a href="/user/home" class="collection-cta">Procure Lot &rarr;</a>
                </div>
              </div>
              <!-- Slide 3 -->
              <div class="collection-slide slide-hidden" data-collection-slide="2">
                <img src="https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?q=80&w=600&auto=format&fit=crop" alt="Player set in a ready stance on clay" class="collection-thumb" loading="lazy">
                <div class="collection-info">
                  <span class="collection-brand">Nashik Cluster</span>
                  <span class="collection-title">Export Red Onions</span>
                  <a href="/user/home" class="collection-cta">Procure Lot &rarr;</a>
                </div>
              </div>
            </div>
            <!-- Slider dots -->
            <div class="carousel-dots dots-light" id="hero-slider-dots">
              <button type="button" class="dot-btn is-active" aria-label="Go to slide 1" aria-current="true" data-slider-dot="0"><span class="dot-pill"></span></button>
              <button type="button" class="dot-btn" aria-label="Go to slide 2" data-slider-dot="1"><span class="dot-pill"></span></button>
              <button type="button" class="dot-btn" aria-label="Go to slide 3" data-slider-dot="2"><span class="dot-pill"></span></button>
            </div>
          </div>

          <!-- Membership Card -->
          <article class="membership-card inview-node" id="hero-membership-card" style="transform: translateY(28px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease;">
            <div class="membership-left">
              <div class="membership-value">1.2K+</div>
              <div class="membership-avatars">
                <div class="avatar-dot" style="background: #5790e6;"></div>
                <div class="avatar-dot" style="background: #c2e029;"></div>
                <div class="avatar-dot" style="background: #0b6e97;"></div>
                <div class="avatar-dot" style="background: #ffffff;"></div>
              </div>
              <div class="membership-caption">Farmers on corridor</div>
            </div>
            <div class="membership-right">
              <img src="https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=600&auto=format&fit=crop" alt="Player waiting to return on a clay court" loading="lazy">
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ========================================================================
         2) TRUST SECTION ("Trusted by serious players")
         ======================================================================== -->
    <section id="trust-section" aria-label="Trusted by serious players">
      <!-- Top Badges Row -->
      <div class="trust-badges-row">
        <!-- Percentage Badge -->
        <div class="trust-percent-badge inview-node" id="trust-percent-badge" style="transform: scale(0.9); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease;">
          <div class="trust-percent-val">100%</div>
          <div class="trust-percent-caption">Fair farmgate price with zero cuts</div>
        </div>

        <!-- Badge Card -->
        <article class="trust-badge-card inview-node" id="trust-badge-card" style="transform: translateY(24px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 120ms, opacity 0.6s ease 120ms;">
          <div class="trust-card-top">
            <span class="trust-chip">#01</span>
            <h3 class="trust-card-title">Trusted by 1,200+ Farmers &amp; Buyers</h3>
          </div>
          <p class="trust-card-body">
            From smallholder farmer clusters to national food buyers, supply chains operate here because fair prices show up at settlement.
          </p>
        </article>
      </div>

      <!-- Center Coach Card -->
      <div class="coach-card-container">
        <figure class="coach-card-fig inview-node" id="trust-coach-card" style="transform: translateY(60px) scale(0.92) rotate(6deg); transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.7s ease;">
          <div class="coach-photo-wrap">
            <img src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?q=80&w=800&auto=format&fit=crop" alt="Ramesh Patel - FPO President" class="coach-photo photo-active" data-coach-photo="0" loading="lazy">
            <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=800&auto=format&fit=crop" alt="Gurpreet Singh - Fleet Ops Head" class="coach-photo photo-hidden" data-coach-photo="1" loading="lazy">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" alt="Dr. Ananya Roy - Quality Analyst" class="coach-photo photo-hidden" data-coach-photo="2" loading="lazy">
          </div>
          <figcaption class="coach-glass-caption">
            <div class="coach-name" id="coach-caption-name">Ramesh Patel</div>
            <div class="coach-role" id="coach-caption-role">President, Nashik FPO</div>
          </figcaption>
        </figure>
      </div>

      <!-- Oversized Ghost Heading -->
      <div class="trust-ghost-wrap">
        <h2 id="trust-title">
          <div class="ghost-row">
            <span class="clip-box-ghost"><span class="clip-word ghost-word ghost-tone-ghost" id="ghost-w1" style="transition: transform 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 700ms;">Fair</span></span>
            <span class="clip-box-ghost"><span class="clip-word ghost-word ghost-tone-ghost" id="ghost-w2" style="transition: transform 700ms cubic-bezier(0.16, 1, 0.3, 1) 70ms, opacity 700ms 70ms;">Direct</span></span>
          </div>
          <div class="ghost-row">
            <span class="clip-box-ghost"><span class="clip-word ghost-word ghost-tone-ink" id="ghost-w3" style="transition: transform 700ms cubic-bezier(0.16, 1, 0.3, 1) 140ms, opacity 700ms 140ms;">Driven</span></span>
            <span class="clip-box-ghost"><span class="clip-word ghost-word ghost-tone-ghost" id="ghost-w4" style="transition: transform 700ms cubic-bezier(0.16, 1, 0.3, 1) 210ms, opacity 700ms 210ms;">Network</span></span>
          </div>
        </h2>
      </div>

      <!-- Carousel Controls Row -->
      <div class="trust-controls-row">
        <button type="button" class="arrow-btn arrow-btn-outline arrow-btn-prev" id="trust-prev-btn" aria-label="Previous coach slide">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6"/>
          </svg>
        </button>
        <div class="carousel-dots dots-dark" id="trust-dots">
          <button type="button" class="dot-btn is-active" aria-label="Go to coach 1" aria-current="true" data-coach-dot="0"><span class="dot-pill"></span></button>
          <button type="button" class="dot-btn" aria-label="Go to coach 2" data-coach-dot="1"><span class="dot-pill"></span></button>
          <button type="button" class="dot-btn" aria-label="Go to coach 3" data-coach-dot="2"><span class="dot-pill"></span></button>
        </div>
        <button type="button" class="arrow-btn arrow-btn-solid arrow-btn-next" id="trust-next-btn" aria-label="Next coach slide">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6"/>
          </svg>
        </button>
      </div>
    </section>

    <!-- ========================================================================
         3) PROGRAMS SECTION
         ======================================================================== -->
    <section id="programs" aria-label="Training programs">
      <!-- Eyebrow -->
      <div class="eyebrow eyebrow-dark">
        <span class="eyebrow-dot"></span>
        <span>Smart Fulfilment</span>
      </div>

      <!-- Heading -->
      <h2 id="programs-title">
        <span class="clip-box"><span class="clip-line programs-header-line" style="transition: transform 950ms cubic-bezier(0.16, 1, 0.3, 1), opacity 950ms;">Built for</span></span><br>
        <span class="clip-box"><span class="clip-line programs-header-line" style="transition: transform 950ms cubic-bezier(0.16, 1, 0.3, 1) 120ms, opacity 950ms 120ms;">every tier</span></span>
      </h2>

      <!-- Program Rows -->
      <ul class="programs-list">
        <li class="inview-node program-row-node" style="transform: translateY(26px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0ms, opacity 0.6s ease 0ms;">
          <a href="/farmer/prices" class="program-row-link">
            <div class="program-row-inner">
              <span class="program-index">01</span>
              <div class="program-content">
                <span class="program-name">Live Mandi Intelligence</span>
                <span class="program-desc">Real-time APMC price tracking and MSP arbitrage to prevent distress sales.</span>
              </div>
              <div class="program-arrow-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </div>
            </div>
          </a>
        </li>
        <li class="inview-node program-row-node" style="transform: translateY(26px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 90ms, opacity 0.6s ease 90ms;">
          <a href="/user/pools" class="program-row-link">
            <div class="program-row-inner">
              <span class="program-index">02</span>
              <div class="program-content">
                <span class="program-name">Collective Buyer Pooling</span>
                <span class="program-desc">Hyperlocal grocers combine orders to unlock bulk farmgate pricing.</span>
              </div>
              <div class="program-arrow-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </div>
            </div>
          </a>
        </li>
        <li class="inview-node program-row-node" style="transform: translateY(26px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 180ms, opacity 0.6s ease 180ms;">
          <a href="/admin/optimizer" class="program-row-link">
            <div class="program-row-inner">
              <span class="program-index">03</span>
              <div class="program-content">
                <span class="program-name">AI Multi-Depot Optimizer</span>
                <span class="program-desc">Constraint satisfaction algorithm matches fragmented supply to urban demand.</span>
              </div>
              <div class="program-arrow-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </div>
            </div>
          </a>
        </li>
        <li class="inview-node program-row-node" style="transform: translateY(26px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 270ms, opacity 0.6s ease 270ms;">
          <a href="/admin/logistics" class="program-row-link">
            <div class="program-row-inner">
              <span class="program-index">04</span>
              <div class="program-content">
                <span class="program-name">IoT Cold-Chain Telemetry</span>
                <span class="program-desc">Live temperature logging and GPS reefer dispatch to eliminate transit rot.</span>
              </div>
              <div class="program-arrow-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </section>

    <!-- ========================================================================
         4) FACILITIES SECTION
         ======================================================================== -->
    <section id="facilities" aria-label="Tour Our World-Class Courts">
      <div class="facilities-grid">
        <!-- Intro Column -->
        <div class="facilities-intro-col">
          <img src="https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?q=80&w=400&auto=format&fit=crop" alt="Organic sprout leaf icon" class="facilities-icon-img inview-node" id="facilities-icon" style="transform: scale(0.85); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease;" loading="lazy">
          
          <h2 id="facilities-title">
            <span class="clip-box"><span class="clip-line fac-line" style="transition: transform 950ms cubic-bezier(0.16, 1, 0.3, 1), opacity 950ms;">Tour Our</span></span><br>
            <span class="clip-box"><span class="clip-line fac-line" style="transition: transform 950ms cubic-bezier(0.16, 1, 0.3, 1) 120ms, opacity 950ms 120ms;">Smart Agri</span></span><br>
            <span class="clip-box"><span class="clip-line fac-line" style="transition: transform 950ms cubic-bezier(0.16, 1, 0.3, 1) 240ms, opacity 950ms 240ms;">Hubs</span></span>
          </h2>

          <p class="facilities-body-p" id="facilities-body-text">
            <!-- Words revealed with easeOutQuart fade+rise -->
          </p>
        </div>

        <!-- Court Cards -->
        <div class="court-cards-group">
          <!-- Court 1 (Clay) -->
          <figure class="court-card-tile inview-node" id="court-card-1" style="transform: translateY(48px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease;">
            <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop" alt="Player on the baseline of an outdoor clay court" loading="lazy">
            <figcaption class="court-caption caption-clay">
              <div class="court-name">Solar Aggregation Hubs</div>
              <div class="court-desc">Decentralized cold storage situated within 15km of primary harvest clusters.</div>
            </figcaption>
          </figure>

          <!-- Court 2 (Blue Hard Court) -->
          <figure class="court-card-tile court-card-tile-2 inview-node" id="court-card-2" style="transform: translateY(48px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 140ms, opacity 0.6s ease 140ms;">
            <img src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1000&auto=format&fit=crop" alt="Player following through on a blue hard court" loading="lazy">
            <figcaption class="court-caption caption-blue">
              <div class="court-name">GPS Telemetry Reefer Fleets</div>
              <div class="court-desc">Multi-temperature controlled vehicles with 24/7 automated telemetry & route tracking.</div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- ========================================================================
         5) STATS SECTION
         ======================================================================== -->
    <section id="stats-section" aria-label="A club that keeps score">
      <!-- Eyebrow -->
      <div class="eyebrow eyebrow-light">
        <span class="eyebrow-dot"></span>
        <span>By the numbers</span>
      </div>

      <!-- Heading -->
      <h2 id="stats-title">
        <span class="clip-box"><span class="clip-line stats-line" style="transition: transform 950ms cubic-bezier(0.16, 1, 0.3, 1), opacity 950ms;">A platform that</span></span><br>
        <span class="clip-box"><span class="clip-line stats-line" style="transition: transform 950ms cubic-bezier(0.16, 1, 0.3, 1) 120ms, opacity 950ms 120ms;">delivers value</span></span>
      </h2>

      <!-- Stats dl -->
      <dl class="stats-grid">
        <div class="stat-cell inview-node" style="transform: translateY(30px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0ms, opacity 0.6s ease 0ms;">
          <dt class="sr-only">Certified coaches</dt>
          <dd>
            <div class="stat-val" data-target="48" data-prefix="₹" data-suffix="Cr">₹48Cr</div>
            <div class="stat-label">Trade Volume Settled</div>
          </dd>
        </div>
        <div class="stat-cell inview-node" style="transform: translateY(30px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 110ms, opacity 0.6s ease 110ms;">
          <dt class="sr-only">Championship courts</dt>
          <dd>
            <div class="stat-val" data-target="1247" data-prefix="" data-suffix="+" data-format="comma">1,247+</div>
            <div class="stat-label">Farmers Onboarded</div>
          </dd>
        </div>
        <div class="stat-cell inview-node" style="transform: translateY(30px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 220ms, opacity 0.6s ease 220ms;">
          <dt class="sr-only">Members training</dt>
          <dd>
            <div class="stat-val" data-target="32" data-prefix="" data-suffix="%">32%</div>
            <div class="stat-label">Transit Spoilage Saved</div>
          </dd>
        </div>
        <div class="stat-cell inview-node" style="transform: translateY(30px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 330ms, opacity 0.6s ease 330ms;">
          <dt class="sr-only">Years on the baseline</dt>
          <dd>
            <div class="stat-val" data-target="84" data-prefix="" data-suffix="T">84T</div>
            <div class="stat-label">CO₂ Emissions Offset</div>
          </dd>
        </div>
      </dl>
    </section>

    <!-- ========================================================================
         6) TESTIMONIALS SECTION
         ======================================================================== -->
    <section id="testimonials" aria-label="Loved by the locker room">
      <!-- Eyebrow -->
      <div class="eyebrow eyebrow-dark">
        <span class="eyebrow-dot"></span>
        <span>Corridor voices</span>
      </div>

      <!-- Heading -->
      <h2 id="testimonials-title">
        <span class="clip-box"><span class="clip-line test-line" style="transition: transform 950ms cubic-bezier(0.16, 1, 0.3, 1), opacity 950ms;">Loved by</span></span><br>
        <span class="clip-box"><span class="clip-line test-line" style="transition: transform 950ms cubic-bezier(0.16, 1, 0.3, 1) 120ms, opacity 950ms 120ms;">the entire chain</span></span>
      </h2>

      <!-- Testimonials Grid -->
      <ul class="testimonials-grid">
        <li class="inview-node testimonial-node" style="transform: translateY(40px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0ms, opacity 0.6s ease 0ms;">
          <article class="testimonial-card">
            <div>
              <div class="quote-glyph">&ldquo;</div>
              <blockquote class="quote-text">
                We used to sell tomatoes at ₹6/kg during glut periods. KrishiRoute matched our 30-tonne harvest directly with Ahmedabad retail pools at ₹14/kg.
              </blockquote>
            </div>
            <figcaption class="testimonial-author">
              <div class="author-name">Santosh Bhangale</div>
              <div class="author-role">Collective Buyer Pooling</div>
            </figcaption>
          </article>
        </li>
        <li class="inview-node testimonial-node" style="transform: translateY(40px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 120ms, opacity 0.6s ease 120ms;">
          <article class="testimonial-card">
            <div>
              <div class="quote-glyph">&ldquo;</div>
              <blockquote class="quote-text">
                Real-time cold chain telemetry and digital quality grading cut our procurement rejection rates to zero.
              </blockquote>
            </div>
            <figcaption class="testimonial-author">
              <div class="author-name">Neha Singhania</div>
              <div class="author-role">AI Multi-Depot Optimizer</div>
            </figcaption>
          </article>
        </li>
        <li class="inview-node testimonial-node" style="transform: translateY(40px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 240ms, opacity 0.6s ease 240ms;">
          <article class="testimonial-card">
            <div>
              <div class="quote-glyph">&ldquo;</div>
              <blockquote class="quote-text">
                18 neighborhood stores in our union pooled together to buy a truckload of Himachal apples at mandi gate prices.
              </blockquote>
            </div>
            <figcaption class="testimonial-author">
              <div class="author-name">Rajeev Nair</div>
              <div class="author-role">Retail Merchant Union, Pune</div>
            </figcaption>
          </article>
        </li>
      </ul>
    </section>

    <!-- ========================================================================
         7) FOOTER
         ======================================================================== -->
    <footer id="contact" aria-label="Baseline Footer">
      <!-- CTA Band -->
      <div class="footer-cta-band">
        <div>
          <div class="eyebrow eyebrow-light">
            <span class="eyebrow-dot"></span>
            <span>Get started</span>
          </div>
          <p class="footer-cta-heading">
            <span class="clip-box"><span class="clip-line cta-line" style="transition: transform 950ms cubic-bezier(0.16, 1, 0.3, 1), opacity 950ms;">Ready to</span></span><br>
            <span class="clip-box"><span class="clip-line cta-line" style="transition: transform 950ms cubic-bezier(0.16, 1, 0.3, 1) 120ms, opacity 950ms 120ms;">connect?</span></span>
          </p>
        </div>
        <button type="button" class="pill-btn pill-btn-light btn-open-modal inview-node" id="footer-cta-btn" style="transform: translateY(20px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 150ms, opacity 0.6s ease 150ms;">
          <span>Select Portal</span>
          <svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6"/>
          </svg>
        </button>
      </div>

      <!-- Columns Grid -->
      <div class="footer-cols-grid">
        <!-- Brand Column -->
        <div class="footer-brand-col">
          <div class="footer-brand-title">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="9"/>
              <path d="M4.8 5.6A9 9 0 0 0 4.8 18.4"/>
              <path d="M19.2 5.6a9 9 0 0 1 0 12.8"/>
            </svg>
            <span>KrishiRoute</span>
          </div>
          <p class="footer-blurb">
            Intelligent Agricultural Transaction &amp; Fulfilment Coordination Platform (SIH 2026 PS 26033).
          </p>
          <address class="footer-address">
            <a href="mailto:contact@krishiroute.gov.in">contact@krishiroute.gov.in</a>
            <a href="tel:+12125550148">+91 1800-KRISHI-ROUTE</a>
            <span class="footer-addr-line">National Agriculture Corridor, India</span>
          </address>
        </div>

        <!-- Programs Nav -->
        <nav class="footer-nav-col" aria-label="Programs">
          <h3>Programs</h3>
          <ul>
            <li><a href="/farmer/prices">Live Mandi Intelligence</a></li>
            <li><a href="/user/pools">Collective Buyer Pooling</a></li>
            <li><a href="/admin/optimizer">AI Multi-Depot Optimizer</a></li>
            <li><a href="/admin/logistics">IoT Cold-Chain Telemetry</a></li>
          </ul>
        </nav>

        <!-- Club Nav -->
        <nav class="footer-nav-col" aria-label="Club">
          <h3>Club</h3>
          <ul>
            <li><a href="#membership">Membership</a></li>
            <li><a href="#facilities">Facilities</a></li>
            <li><a href="#club">Events</a></li>
            <li><a href="#shop">Pro Shop</a></li>
          </ul>
        </nav>

        <!-- Company Nav -->
        <nav class="footer-nav-col" aria-label="Company">
          <h3>Company</h3>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#programs">Coaches</a></li>
            <li><a href="#careers">Careers</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom-bar">
        <div>&copy; 2026 KrishiRoute Platform • SIH 2026 Team AURA. All rights reserved.</div>
        <nav class="footer-social-nav" aria-label="Social links">
          <a href="#instagram">Instagram</a>
          <a href="#x">X</a>
          <a href="#youtube">YouTube</a>
          <a href="#linkedin">LinkedIn</a>
        </nav>
        <nav class="footer-legal-nav" aria-label="Legal links">
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
        </nav>
      </div>
    </footer>

  </main>

  <!-- ==========================================================================
       ES MODULE SCRIPT: LENIS, SPRING PHYSICS, REVEALS, PARALLAX, CAROUSELS
       ========================================================================== -->`;

export default function LandingPage() {
  useEffect(() => {
    // 1) Adaptive rem scale-up for viewports > 1920px
    const FONT_BASE = 16;
    const BASE_W = 1920;
    const COEF = 0.6666;

    function updateRemScale() {
      const reduction = ((BASE_W - window.innerWidth) / BASE_W) * 100 * COEF;
      const size = FONT_BASE - (FONT_BASE * reduction) / 100;
      if (size > FONT_BASE) {
        document.documentElement.style.fontSize = size + "px";
      } else {
        document.documentElement.style.removeProperty("font-size");
      }
    }
    window.addEventListener("resize", updateRemScale);
    updateRemScale();

    window.scrollTo(0, 0);

    // 2) Lenis Smooth Scroll Setup & Scroll Lock
    const lenis = new Lenis({
      smoothWheel: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    let isScrollLocked = false;
    function lockScroll() {
      if (isScrollLocked) return;
      isScrollLocked = true;
      lenis.stop();
      document.documentElement.classList.add("scroll-locked");
    }
    function unlockScroll() {
      if (!isScrollLocked) return;
      isScrollLocked = false;
      lenis.start();
      document.documentElement.classList.remove("scroll-locked");
    }

    // Anchor smooth scrolling
    const anchorHandlers = [];
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      const handler = (e) => {
        const href = anchor.getAttribute("href");
        if (!href || href === "#") return;
        const targetEl = document.querySelector(href);
        if (targetEl) {
          e.preventDefault();
          closeMenuOverlay();
          closeContactModal();
          lenis.scrollTo(targetEl, { offset: -24 });
        }
      };
      anchor.addEventListener("click", handler);
      anchorHandlers.push({ el: anchor, handler });
    });

    lockScroll();

    // 3) Physics Spring Helper
    const activeSprings = new Set();

    class Spring {
      constructor({ tension = 170, friction = 26, from = 0, to = 0, onUpdate = () => {}, onRest = () => {} }) {
        this.tension = tension;
        this.friction = friction;
        this.current = from;
        this.target = to;
        this.velocity = 0;
        this.onUpdate = onUpdate;
        this.onRest = onRest;
        this.active = false;
        if (from !== to) {
          this.active = true;
          activeSprings.add(this);
        }
      }
      setTarget(to) {
        this.target = to;
        this.active = true;
        activeSprings.add(this);
      }
      setCurrent(val) {
        this.current = val;
        this.velocity = 0;
        this.onUpdate(this.current);
      }
      step(dt) {
        if (!this.active) return;
        const subSteps = 4;
        const sdt = dt / subSteps;
        for (let i = 0; i < subSteps; i++) {
          const force = -this.tension * (this.current - this.target);
          const damping = -this.friction * this.velocity;
          const acceleration = force + damping;
          this.velocity += acceleration * sdt;
          this.current += this.velocity * sdt;
        }
        this.onUpdate(this.current);

        if (Math.abs(this.velocity) < 0.0008 && Math.abs(this.current - this.target) < 0.0008) {
          this.current = this.target;
          this.velocity = 0;
          this.active = false;
          activeSprings.delete(this);
          this.onUpdate(this.current);
          this.onRest();
        }
      }
    }

    let lastFrameTime = performance.now();
    let rafId;
    function raf(t) {
      lenis.raf(t);

      const dt = Math.min((t - lastFrameTime) / 1000, 0.064);
      lastFrameTime = t;
      for (const spring of activeSprings) {
        spring.step(dt);
      }

      updateParallax();
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // 4) Parallax Manager
    const heroSection = document.getElementById("hero-section");
    const heroPlate = document.getElementById("hero-plate");
    const trustSection = document.getElementById("trust-section");
    const ghostW1 = document.getElementById("ghost-w1");
    const ghostW2 = document.getElementById("ghost-w2");
    const ghostW3 = document.getElementById("ghost-w3");
    const ghostW4 = document.getElementById("ghost-w4");

    function getProgress(elem) {
      if (!elem) return 0;
      const rect = elem.getBoundingClientRect();
      const winH = window.innerHeight;
      const totalDist = rect.height + winH;
      const currentDist = winH - rect.top;
      return Math.max(0, Math.min(1, currentDist / totalDist));
    }

    function updateParallax() {
      if (heroSection && heroPlate) {
        const heroProg = getProgress(heroSection);
        const heroY = heroProg * 12;
        heroPlate.style.transform = `translateY(${heroY.toFixed(2)}%)`;
      }

      if (trustSection && ghostW1 && ghostW2 && ghostW3 && ghostW4) {
        const trustProg = getProgress(trustSection);
        const p1 = -3 + trustProg * 6;
        const p2 = 3 - trustProg * 6;
        const p3 = -2 + trustProg * 6;
        const p4 = 4 - trustProg * 7;

        ghostW1.style.transform = `translateX(${p1.toFixed(2)}%)`;
        ghostW2.style.transform = `translateX(${p2.toFixed(2)}%)`;
        ghostW3.style.transform = `translateX(${p3.toFixed(2)}%)`;
        ghostW4.style.transform = `translateX(${p4.toFixed(2)}%)`;
      }
    }

    // 5) Facilities Body Word-by-Word Reveal
    const facilitiesBody = document.getElementById("facilities-body-text");
    const bodySentence = "Decentralized solar-powered micro-warehouses and GPS-monitored refrigerated fleets ensure farm fresh produce reaches urban retail hubs with zero degradation.";
    if (facilitiesBody) {
      const bodyWords = bodySentence.split(" ");
      facilitiesBody.innerHTML = bodyWords.map((word, i) => {
        const delay = 250 + i * 28;
        return `<span class="word-fade" style="transition-delay: ${delay}ms;">${word}&nbsp;</span>`;
      }).join("");
    }

    // 6) InView Triggering (IntersectionObserver)
    function animateCounter(el, delay = 0) {
      const target = parseFloat(el.getAttribute("data-target"));
      if (isNaN(target)) return;
      const prefix = el.getAttribute("data-prefix") || "";
      const suffix = el.getAttribute("data-suffix") || "";
      const isComma = el.getAttribute("data-format") === "comma";
      const duration = 1600;

      setTimeout(() => {
        const startTime = performance.now();
        function update(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // smooth easeOutExpo
          const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const currentVal = Math.round(ease * target);
          const formatted = isComma ? currentVal.toLocaleString("en-IN") : currentVal;
          el.textContent = `${prefix}${formatted}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            const finalFormatted = isComma ? target.toLocaleString("en-IN") : target;
            el.textContent = `${prefix}${finalFormatted}${suffix}`;
          }
        }
        requestAnimationFrame(update);
      }, delay);
    }

    // Initialize stats to zero before scroll triggers
    const statValNodes = document.querySelectorAll(".stat-val");
    statValNodes.forEach((el) => {
      const prefix = el.getAttribute("data-prefix") || "";
      const suffix = el.getAttribute("data-suffix") || "";
      el.textContent = `${prefix}0${suffix}`;
    });

    const inviewObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const node = entry.target;
          node.classList.add("inview-active");

          node.querySelectorAll(".clip-line").forEach((line) => {
            line.classList.add("clip-revealed");
          });

          if (node.id === "facilities" || node.contains(facilitiesBody)) {
            facilitiesBody?.querySelectorAll(".word-fade").forEach((wf) => {
              wf.classList.add("word-fade-active");
            });
          }

          if (node.id === "stats-section" || node.classList?.contains("stats-grid") || node.classList?.contains("stat-cell")) {
            const statsSection = document.getElementById("stats-section");
            if (statsSection && !statsSection.dataset.counted) {
              statsSection.dataset.counted = "true";
              const statVals = statsSection.querySelectorAll(".stat-val");
              statVals.forEach((valEl, idx) => {
                animateCounter(valEl, idx * 130);
              });
            }
          }

          observer.unobserve(node);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll(".inview-node").forEach((node) => {
      inviewObserver.observe(node);
    });
    document.querySelectorAll("#programs, #facilities, #stats-section, #testimonials, #contact").forEach((sec) => {
      inviewObserver.observe(sec);
    });

    // 7) INTRO LOADER LIFECYCLE
    const introLoader = document.getElementById("intro-loader");
    const loaderWordmark = document.getElementById("loader-wordmark");
    const loaderFill = document.getElementById("loader-fill");

    const t1 = setTimeout(() => {
      loaderWordmark?.classList.add("wordmark-in");
      loaderFill?.classList.add("fill-active");
    }, 120);

    const t2 = setTimeout(() => {
      introLoader?.classList.add("loader-exit");
      unlockScroll();
      triggerHeroReveals();
    }, 1450);

    // 8) HERO ENTRANCE REVEAL
    let collectionTimer = null;
    function triggerHeroReveals() {
      const bgVid = document.querySelector(".hero-video-bg");
      if (bgVid) {
        bgVid.play().catch(() => {});
      }

      const heroWords = document.querySelectorAll(".hero-word");
      heroWords.forEach((w) => w.classList.add("clip-revealed"));

      const taglineLines = document.querySelectorAll(".tagline-line");
      taglineLines.forEach((l) => l.classList.add("clip-revealed"));

      const heroCollectionWrap = document.getElementById("hero-collection-wrap");
      const heroMembershipCard = document.getElementById("hero-membership-card");

      setTimeout(() => {
        heroCollectionWrap?.classList.add("inview-active");
      }, 500);
      setTimeout(() => {
        heroMembershipCard?.classList.add("inview-active");
      }, 650);

      startCollectionAutoplay();
    }

    // 9) HERO COLLECTION SLIDER
    let currentCollectionIdx = 0;
    const collectionSlides = document.querySelectorAll("[data-collection-slide]");
    const collectionDots = document.querySelectorAll("[data-slider-dot]");

    function setCollectionSlide(newIdx) {
      collectionSlides.forEach((slide, idx) => {
        if (idx === newIdx) {
          slide.classList.remove("slide-hidden");
          slide.classList.add("slide-active");
        } else {
          slide.classList.add("slide-hidden");
          slide.classList.remove("slide-active");
        }
      });

      collectionDots.forEach((dot, idx) => {
        if (idx === newIdx) {
          dot.classList.add("is-active");
          dot.setAttribute("aria-current", "true");
        } else {
          dot.classList.remove("is-active");
          dot.removeAttribute("aria-current");
        }
      });
      currentCollectionIdx = newIdx;
    }

    function startCollectionAutoplay() {
      if (collectionTimer) clearInterval(collectionTimer);
      collectionTimer = setInterval(() => {
        const next = (currentCollectionIdx + 1) % (collectionSlides.length || 1);
        setCollectionSlide(next);
      }, 3800);
    }

    collectionDots.forEach((btn, idx) => {
      btn.addEventListener("click", () => {
        setCollectionSlide(idx);
        startCollectionAutoplay();
      });
    });

    // 10) TRUST COACH CAROUSEL
    const coachData = [
      {
        name: "Ramesh Patel",
        role: "President, Nashik FPO",
        headline: ["Fair", "Direct", "Driven", "Network"]
      },
      {
        name: "Gurpreet Singh",
        role: "Cold-Chain Fleet Head",
        headline: ["Zero", "Spoilage", "Smart", "Reefer"]
      },
      {
        name: "Dr. Ananya Roy",
        role: "Quality Grading Analyst",
        headline: ["Digital", "Quality", "Faster", "Pay"]
      }
    ];

    let currentCoachIdx = 0;
    const coachPhotos = document.querySelectorAll("[data-coach-photo]");
    const coachDots = document.querySelectorAll("[data-coach-dot]");
    const coachNameEl = document.getElementById("coach-caption-name");
    const coachRoleEl = document.getElementById("coach-caption-role");

    function setCoachSlide(newIdx) {
      currentCoachIdx = (newIdx + coachData.length) % coachData.length;
      const data = coachData[currentCoachIdx];

      coachPhotos.forEach((img, idx) => {
        if (idx === currentCoachIdx) {
          img.classList.remove("photo-hidden");
          img.classList.add("photo-active");
        } else {
          img.classList.add("photo-hidden");
          img.classList.remove("photo-active");
        }
      });

      if (coachNameEl) coachNameEl.textContent = data.name;
      if (coachRoleEl) coachRoleEl.textContent = data.role;

      coachDots.forEach((dot, idx) => {
        if (idx === currentCoachIdx) {
          dot.classList.add("is-active");
          dot.setAttribute("aria-current", "true");
        } else {
          dot.classList.remove("is-active");
          dot.removeAttribute("aria-current");
        }
      });

      const words = [ghostW1, ghostW2, ghostW3, ghostW4];
      words.forEach((w) => w?.classList.remove("clip-revealed"));

      setTimeout(() => {
        if (ghostW1) ghostW1.textContent = data.headline[0];
        if (ghostW2) ghostW2.textContent = data.headline[1];
        if (ghostW3) ghostW3.textContent = data.headline[2];
        if (ghostW4) ghostW4.textContent = data.headline[3];

        words.forEach((w) => w?.classList.add("clip-revealed"));
      }, 80);
    }

    const prevBtn = document.getElementById("trust-prev-btn");
    const nextBtn = document.getElementById("trust-next-btn");
    const handlePrevCoach = () => setCoachSlide(currentCoachIdx - 1);
    const handleNextCoach = () => setCoachSlide(currentCoachIdx + 1);

    prevBtn?.addEventListener("click", handlePrevCoach);
    nextBtn?.addEventListener("click", handleNextCoach);

    coachDots.forEach((dot, idx) => {
      dot.addEventListener("click", () => setCoachSlide(idx));
    });

    const trustTitleObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          [ghostW1, ghostW2, ghostW3, ghostW4].forEach((w) => {
            w?.classList.add("clip-revealed");
          });
          trustTitleObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    if (trustSection) trustTitleObserver.observe(trustSection);

    // 11) CONTACT / PORTAL MODAL
    const contactModal = document.getElementById("contact-modal");
    const modalBackdrop = document.getElementById("modal-backdrop");
    const modalCloseBtn = document.getElementById("modal-close-btn");
    const contactForm = document.getElementById("contact-form");
    const modalSubmitBtn = document.getElementById("modal-submit-btn");
    const modalSuccess = document.getElementById("modal-success");
    const modalDoneBtn = document.getElementById("modal-done-btn");
    const contactNameInput = document.getElementById("contact-name");
    const successMessage = document.getElementById("success-message");

    function openContactModal() {
      closeMenuOverlay();
      contactModal?.classList.add("is-open");
      contactModal?.setAttribute("aria-hidden", "false");
      lockScroll();

      contactModal?.querySelectorAll(".clip-line").forEach((l) => {
        l.classList.add("clip-revealed");
      });

      setTimeout(() => {
        contactNameInput?.focus();
      }, 120);
    }

    function closeContactModal() {
      if (!contactModal?.classList.contains("is-open")) return;
      contactModal.classList.remove("is-open");
      contactModal.setAttribute("aria-hidden", "true");
      unlockScroll();

      setTimeout(() => {
        if (contactForm) {
          contactForm.reset();
          contactForm.style.display = "flex";
        }
        modalSuccess?.classList.remove("is-shown");
        if (modalSubmitBtn) {
          modalSubmitBtn.disabled = false;
          modalSubmitBtn.textContent = "Submit Inquiry";
        }
      }, 350);
    }

    document.querySelectorAll(".btn-open-modal").forEach((btn) => {
      btn.addEventListener("click", openContactModal);
    });
    modalBackdrop?.addEventListener("click", closeContactModal);
    modalCloseBtn?.addEventListener("click", closeContactModal);
    modalDoneBtn?.addEventListener("click", closeContactModal);

    const handleFormSubmit = (e) => {
      e.preventDefault();
      const nameVal = contactNameInput?.value.trim() || "";
      const firstName = nameVal ? nameVal.split(" ")[0] : "there";

      if (modalSubmitBtn) {
        modalSubmitBtn.disabled = true;
        modalSubmitBtn.textContent = "Sending…";
      }

      setTimeout(() => {
        if (contactForm) contactForm.style.display = "none";
        if (successMessage) successMessage.textContent = `Thanks, ${firstName} — our KrishiRoute corridor team will be in touch shortly.`;
        modalSuccess?.classList.add("is-shown");
      }, 500);
    };
    contactForm?.addEventListener("submit", handleFormSubmit);

    // 12) FULLSCREEN MENU OVERLAY
    const menuOverlay = document.getElementById("menu-overlay");
    const burgerBtn = document.getElementById("burger-btn");
    const menuCloseBtn = document.getElementById("menu-close-btn");
    const menuBackdrop = document.getElementById("menu-backdrop");

    function openMenuOverlay() {
      menuOverlay?.classList.add("is-open");
      menuOverlay?.setAttribute("aria-hidden", "false");
      lockScroll();
    }
    function closeMenuOverlay() {
      if (!menuOverlay?.classList.contains("is-open")) return;
      menuOverlay.classList.remove("is-open");
      menuOverlay.setAttribute("aria-hidden", "true");
      unlockScroll();
    }

    burgerBtn?.addEventListener("click", openMenuOverlay);
    menuCloseBtn?.addEventListener("click", closeMenuOverlay);
    menuBackdrop?.addEventListener("click", closeMenuOverlay);

    const handleKeydown = (e) => {
      if (e.key === "Escape") {
        if (contactModal?.classList.contains("is-open")) {
          closeContactModal();
        } else if (menuOverlay?.classList.contains("is-open")) {
          closeMenuOverlay();
        }
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("resize", updateRemScale);
      window.removeEventListener("keydown", handleKeydown);
      clearTimeout(t1);
      clearTimeout(t2);
      if (collectionTimer) clearInterval(collectionTimer);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      inviewObserver.disconnect();
      trustTitleObserver.disconnect();
      document.documentElement.classList.remove("scroll-locked");
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}>
      <CardNav
        title="KrishiRoute"
        ctaText="Select Portal"
        onCtaClick={() => {
          const modal = document.getElementById('contact-modal');
          if (modal) {
            modal.classList.add('is-open');
            modal.setAttribute('aria-hidden', 'false');
            document.documentElement.classList.add('scroll-locked');
          }
        }}
      />
      <div dangerouslySetInnerHTML={{ __html: HTML_CONTENT }} />
    </div>
  );
}
