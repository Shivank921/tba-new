# Bengali Association Coimbatore — Product Requirements

## Original Problem Statement
Modernize and upgrade the Bengali Association Coimbatore website with a visually distinctive, responsive frontend; current association content; a real contact/newsletter backend; and a protected committee admin dashboard.

## Product Goals
- Present the association, Bengali culture, and Durga Puja schedule with a polished responsive experience.
- Let visitors send inquiries and join the newsletter.
- Let authenticated committee members review inquiries, mark them handled, and view subscribers.
- Give members a simple, trustworthy way to donate through the association's supplied UPI QR code.

## Core Architecture
- Frontend: React, React Router, Tailwind CSS, shadcn-compatible UI, Sonner, Axios.
- Backend: FastAPI with MongoDB through `MONGO_URL` and `DB_NAME`.
- Authentication: JWT-protected admin access.
- Public routes: `/`, `/donate`.
- Admin routes: `/admin/login`, `/admin`.

## Implemented

### Website Experience
- Cinematic homepage, responsive navigation, countdown, association overview, four pillars, 2026 Durga Puja schedule, categorized gallery, committee, contact form, and newsletter.
- User-supplied content replaces the initial placeholders.
- Duplicate heritage/four-pillars section removed.
- Third hero banner heading localized to `বাংলার মাটি, বাংলার সংস্কৃতি` with Bengali typography on 2026-08-28.

### Backend and Admin
- Contact and newsletter submissions persist in MongoDB.
- JWT-secured admin login and session persistence.
- Dashboard statistics, inquiry search/filtering, handled/reopen controls, reply mail links, and subscriber listing.

### Donation Page — 2026-08-28
- Added `/donate` with the association's supplied QR code, optimized into a clean QR crop for reliable on-screen scanning.
- Added payee name, UPI ID `thebengali2002@kotak`, UPI number `9894280001`, scan guidance, and payee-verification guidance.
- Added a prominent Donate entry on desktop/mobile navigation and in the footer.
- Added copy-UPI behavior with browser-compatible fallback and toast feedback.
- Updated cross-page navigation so homepage section links work correctly from `/donate`.
- Added responsive and testing selectors for all new critical elements and interactions.

## Validation Status
- Frontend production build: passed on 2026-08-28.
- Donation page automated frontend suite: core flow passed; one mobile contrast issue was identified and corrected.
- Post-fix mobile verification: passed at 375px with no horizontal overflow; QR, payment details, and clipboard fallback work.
- Third hero banner Bengali heading: production build and live visual verification passed on 2026-08-28.
- Existing backend suite: 26/26 tests passed before this feature; donation work did not change backend behavior.

## Prioritized Roadmap

### P0 — Current
- User review of the donation page and confirmation that the displayed UPI details are correct.

### P1 — Upcoming
- End-to-end automated coverage for the existing contact, newsletter, and complete admin user flows.

### P2 — Future
- Member photo uploads for Puja and community-service galleries.
- Admin event manager for adding and editing cultural events and schedules.
- Optional donation acknowledgement workflow if the committee later wants donor records or receipts.