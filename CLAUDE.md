# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for TRON Energy rental services, built with HTML, CSS (Tailwind), and JavaScript. The site provides a user interface for purchasing TRON blockchain energy with detailed pricing, guides, and customer support information.

## Architecture

### Single-Page Application Structure
- **index.html**: Main and only HTML file containing the complete application
- **Inline JavaScript**: All functionality embedded within the HTML file
- **Tailwind CSS**: Styling via CDN with custom configuration
- **Font Awesome**: Icons via CDN

### Key Components
- Navigation header with mobile menu toggle
- Hero section with pricing and payment address
- Feature sections explaining service benefits
- Purchase guide with step-by-step instructions  
- Example pricing tiers
- Trust/guarantee sections
- Customer support contact information
- Footer with links and disclaimers

### JavaScript Functionality
- Mobile menu toggle (`menuToggle` event listener)
- Smooth scrolling navigation (`index.html:448-464`)
- Dynamic header styling on scroll (`index.html:467-478`) 
- Address copying functionality (`index.html:481-498`)
- Toast notifications for copy success

## Deployment

The repository uses GitHub Pages for hosting with automatic deployment:

### GitHub Actions Workflow
- **File**: `.github/workflows/static.yml`
- **Trigger**: Pushes to `main` branch or manual dispatch
- **Process**: Uploads entire repository and deploys to GitHub Pages
- **Live URL**: https://kgfeee16.github.io/tron-energy/

### Site Structure
- **Domain**: GitHub Pages subdomain
- **Sitemap**: Available at `/sitemap.xml` with single page entry
- **SEO**: Google verification meta tag included

## Development

This is a static site with no build process or dependencies. Development involves:

1. Edit `index.html` directly
2. Test locally by opening file in browser
3. Commit and push to `main` branch for automatic deployment

### File Locations
- Main application: `/index.html`
- Sitemap: `/sitemap.xml` and `/sitemap.md`
- Google verification: `/google851d79d65b491a6b.html`

### Key Business Logic
- Energy pricing: 2 TRX = 65,000 energy units (proportional scaling)
- Payment address: `TQStUfgXGgHMbu9TGW2zxk6ujsEDuCTJ8a`
- Customer support: Telegram @Kevinlifeau