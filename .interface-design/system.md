# Design System

**Direction:** The Vault
**Established:** 2026-05-31

## Intent
- User: High-volume Whatnot Pokémon TCG seller, post-stream, reconciling sales and managing inventory as a financial portfolio
- Task: Reconcile sales, decide on holds vs. sells, log acquisitions
- Feel: Trading floor at 2am — authoritative, dense, precise. Bloomberg meets the TCG hobby.

## Foundation
- Background: #0C0C11
- Surface: #13131A
- Surface raised: #1A1A24
- Border: #22222E
- Text primary: #F0F0F5
- Text secondary: #6E6E85

## Accent
- Primary: #7C6FFF — holo foil violet, the precise color a holographic rare catches at the right angle
- Hover: #9589FF
- Gain: #2DD97F — Dragon Shield mint, healthy P&L
- Loss: #FF5757 — red-shifted, immediate loss read
- Warning: #F59E0B — PSA slab label amber

## Typography
- Display/headings: Geist — precision, neutrality, serious tool energy
- Body: Inter — universal legibility, never fights the data
- Numbers: Geist Mono — all prices, P&L, ROI %, grades, quantities; monospaced for vertical alignment; terminal feel
- Scale: 11/12/13/14/16/18/20/24/28/32/40/48/56/64px

## Spacing
- Base unit: 4px
- Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96px
- Density: Calibrated for 40+ inventory rows visible at once

## Depth
- Strategy: Tonal shifts for surfaces, shadows for floating only
- Surface elevation: 5-7 lightness points in OKLCH between layers
- Floating shadow: 0 8px 32px rgba(0,0,0,0.6)
- No decorative shadows on cards or panels

## Radius
- 4px — data rows, inline badges, price tags, inputs
- 6px — cards, panels, widgets, table containers
- 8px — dialogs, modals, drawers
- 12px — hero containers, large feature cards
- 9999px — pill badges (grade indicators, status tags)

## Signature Element
Grade indicator bands: PSA grades as small luminous colored inline bars
- Grade 10: #2DD97F (teal-mint)
- Grade 9: #7C6FFF (holo violet)
- Grade 8: #F59E0B (amber)
- Grade 7: #6E6E85 (muted)
- Raw: #3A3A4A (neutral gray)

## CSS Tokens
--vault-bg: #0C0C11;
--vault-surface: #13131A;
--vault-raised: #1A1A24;
--vault-border: #22222E;
--vault-text: #F0F0F5;
--vault-muted: #6E6E85;
--vault-accent: #7C6FFF;
--vault-accent-hover: #9589FF;
--vault-gain: #2DD97F;
--vault-loss: #FF5757;
--vault-warn: #F59E0B;

## Patterns
[to be populated as components are built]
