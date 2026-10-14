# Xeoo Icon Theme — Design System Specification
**Product:** Xeoo Icon Theme  
**Publisher:** NTTBELL  
**Version:** Phase 03 Architectural Baseline  
**Design Paradigm:** Cybernetic Interface / Precision Geometry  

---

## 1. Brand Visual Principles

**Xeoo Icon Theme** is an ultra-modern, futuristic file icon theme engineered for Visual Studio Code. It bridges technical operating system telemetry with developer-focused file identification.

### Core Philosophy
* 🔬 **Precision-Engineered Geometry:** Forms are constructed along exact mathematical angles (primarily 45° chamfers, 90° junctions, and equilateral diamond nodes).
* ⚡ **Restrained Neon Accents:** Cybernetic energy is communicated through purposeful telemetry nodes and pulse lines—not through blurry, uncalibrated glow filters.
* 👁️ **16 × 16 px Silhouette Supremacy:** Every icon is designed to be instantly recognizable at micro scale in the standard VS Code file tree. Outer contours matter more than interior micro-details.
* 🌓 **Universal Contrast:** A unified design architecture engineered to remain legible across dark, soft, OLED, and light editor environments without requiring separate theme files.

---

## 2. Color Tokens & Intended Roles

The Xeoo design system utilizes a controlled, high-contrast palette calibrated against both dark slate canvases and light paper backdrops:

| Token Name | Hex Code | Visual Role & Category Application |
| :--- | :---: | :--- |
| **Neon Cyan** | `#4DEBFF` | **Primary Telemetry & Web Core:** TypeScript, React/TSX, CSS, client-side runtimes, primary active pulse lines. |
| **Primary Violet** | `#A78BFA` | **Architecture & System Logic:** Closed folder back-tabs, PHP, C#, Lua, build scripts, assembly configurations. |
| **Cyber Mint** | `#63F5B2` | **Data & Active State:** Folder open indicator nodes, Node/npm, Vue, Go, `.env` configs, database schemas. |
| **Plasma Pink** | `#FF65C3` | **Styling & Creative Templates:** SCSS, Svelte, GraphQL, Markdown accents, creative template engines. |
| **Solar Amber** | `#FFC66D` | **Security, Warnings & Critical Runtimes:** Python, Rust, Git attributes, lockfiles, security keys, Docker. |
| **Titanium** | `#C5CEDB` | **Structural Frame & Base Neutral:** Outer file chassis, folder vault perimeters, document folds, generic base geometry. |
| **Void Slate** | `#1E202E` | **Primary Body Substrate:** The dark structural fill that provides physical presence and light-mode contrast. |
| **Deep Obsidian** | `#12131C` | **Secondary Inset Chamber:** Internal cutaways, folder backings, and recessed core cavities. |

> [!NOTE]
> Do not combine all colors into a single icon. Each icon should feature **1 structural base** (Void Slate/Titanium) and **1 or 2 focused neon accents**.

---

## 3. Artboard, Margins & Geometry Rules

1. **Artboard & ViewBox:**
   * Standard artboard dimensions: `32 × 32 px`.
   * Standard viewBox: `viewBox="0 0 32 32"`.
2. **Active Canvas Margins:**
   * Keep geometry bounded within `x: 2..30` and `y: 2..30`.
   * A minimum 1px to 2px outer breathing zone prevents visual clipping at subpixel rendering boundaries.
3. **45-Degree Chamfer Grid:**
   * Avoid generic round bubble corners (`rx="10"`).
   * Apply clean 45° cutaways:
     * File top-right corner cut: `(20, 3) -> (27, 10)`
     * File bottom corner chamfers: 2px cuts (`(5, 27) -> (7, 29)`)
     * Folder tab slope: 45° step from `(12, 6)` to `(15, 9)`
     * Vault notch: 45° internal bevel `(13, 11) -> (15, 13)`
4. **Coordinate Alignment:**
   * Favor whole integer coordinates for primary perimeter points.
   * Coordinate parity ensures crisp downsampling to 16×16 px without fractional pixel smearing.

---

## 4. Stroke & Negative-Space Conventions

* **Primary Stroke Weight:** Standard `2.0 px` for outer structural perimeters and primary rails. At 16×16 px, a 2.0px stroke resolves cleanly to exactly 1.0 device pixel.
* **Secondary / Inset Stroke Weight:** `1.75 px` for internal chamber partitions.
* **Stroke Caps & Joins:**
  * Use `stroke-linejoin="round"` on chamfered outer contours to soften sharp geometric vertices.
  * Use `stroke-linecap="round"` on telemetry indicator bars.
* **Negative-Space Hierarchy:**
  * Maintain a minimum of `3.0 px` clearance between adjacent internal lines.
  * Details separated by less than 2px will merge into an unreadable solid blob at 16×16 px.
* **Prohibited Attributes:**
  * **No filters:** `<filter>`, `feGaussianBlur`, and `feDropShadow` are prohibited due to VS Code rendering degradation.
  * **No embedded stylesheets or `<script>` tags.**
  * **No external URLs or namespaces outside standard XML.**

---

## 5. File Carrier Construction (`icons/base/file.svg`)

The generic file carrier serves as the baseline data-plate for all unmapped or generic files:

```
(5,3) ──────── (20,3)
  │              ╲
  │               ╲ (27,10)
  │                │
  │    [ ─── ]     │  <-- Primary Telemetry Rail (#4DEBFF)
  │    [ ── ] ◆    │  <-- Secondary Rail (#A78BFA) + Telemetry Node (#4DEBFF)
  │                │
(5,27)            (27,27)
  ╲              ╱
  (7,29) ────── (25,29)
```

### Exact Coordinates & Specifications
* **Outer Body:** `M 5 3 L 20 3 L 27 10 L 27 27 L 25 29 L 7 29 L 5 27 Z`
  * Fill: `#1E202E` (Void Slate)
  * Stroke: `#C5CEDB` (Titanium), `width="2"`, `stroke-linejoin="round"`
* **Chamfer Facet:** `M 20 3 L 20 10 L 27 10 Z`
  * Fill: `#12131C` (Deep Obsidian)
  * Stroke: `#C5CEDB` (Titanium), `width="2"`, `stroke-linejoin="round"`
* **Telemetry Rails:**
  * Pulse Rail: `(10, 16)` to `(22, 16)`, `#4DEBFF`, `width="2"`, `round`
  * Secondary Rail: `(10, 21)` to `(17, 21)`, `#A78BFA`, `width="2"`, `round`
  * Status Node: `points="21,19.5 22.5,21 21,22.5 19.5,21"`, fill `#4DEBFF`

---

## 6. Closed & Open Folder Construction

### Closed Folder (`icons/base/folder.svg`)
* **Back Tab Plate:**
  * Path: `M 3 6 L 12 6 L 15 9 L 27 9 L 29 11 L 29 26 L 3 26 Z`
  * Fill: `#12131C` (Deep Obsidian)
  * Stroke: `#A78BFA` (Primary Violet), `width="2"`
* **Front Vault Plate:**
  * Sits from `y = 11` to `y = 26` with an angular center notch.
  * Path: `M 3 13 L 5 11 L 13 11 L 15 13 L 17 13 L 19 11 L 27 11 L 29 13 L 29 24 L 27 26 L 5 26 L 3 24 Z`
  * Fill: `#1E202E` (Void Slate)
  * Stroke: `#C5CEDB` (Titanium), `width="2"`
* **Central Core Diamond:**
  * Centered at `(16, 19.5)`: `points="16,16.5 19.5,19.5 16,22.5 12.5,19.5"`
  * Fill: `#4DEBFF` (Neon Cyan) with central `#12131C` core dot.

### Open Folder (`icons/base/folder-open.svg`)
* **Back Tab Plate:** Identical to closed folder (`#A78BFA` stroke) to maintain family identity.
* **Exposed Inner Substrate:**
  * Rises into the open chamber: `M 7 12 L 9 10 L 23 10 L 25 12 L 25 17 L 7 17 Z`
  * Fill: `#1E202E`, Stroke: `#C5CEDB`, `width="1.75"`
  * Active Telemetry Emitter: `(10, 13.5)` to `(22, 13.5)`, `#63F5B2` (Cyber Mint)
* **2.5D Open Perspective Vault Flap:**
  * Flares outward from `x = 2` to `x = 30` and drops to `y = 28`.
  * Path: `M 2 16 L 30 16 L 27 28 L 5 28 Z`
  * Fill: `#1E202E`, Stroke: `#C5CEDB`, `width="2"`
* **Active Status Diamond:**
  * `points="16,19 19.5,22 16,25 12.5,22"`, fill `#63F5B2` (Cyber Mint).

---

## 7. Small-Size (16 × 16 px) Legibility Requirements

In the VS Code File Explorer, icons are scaled to 16×16 px:
1. **Silhouette Primacy:** The eye perceives the bounding geometry first. The folder's top-left tab and the file's top-right cutaway must remain sharply contrasted.
2. **Open vs. Closed Distinction:** Closed folders present a compact `y: 6..26` rectangular vault. Open folders project a flared `y: 16..28` flap and an illuminated upper substrate, making them distinguishable even in grayscale.
3. **No Subpixel Thinning:** By utilizing `2.0 px` strokes and coordinates divisible by 2 or 1, strokes resolve to crisp 1.0px screen lines rather than anti-aliased gray haze.

---

## 8. Light & Dark Background Compatibility

The system achieves universal contrast without duplicating themes:

* **On Dark / OLED Backdrops (`#0A0A0F`, `#1E1E1E`, `#181824`):**
  * The `#C5CEDB` Titanium stroke has a **12.5:1** contrast ratio against `#1E1E1E`, creating crisp outer definition.
  * The neon accents (`#4DEBFF`, `#63F5B2`, `#A78BFA`) provide vibrant, high-luminance telemetry indicators.
  * The `#1E202E` Void Slate body provides solid grounding.
* **On Light Backdrops (`#F5F5F5`, `#FFFFFF`):**
  * The `#1E202E` Void Slate body has a **13.6:1** contrast ratio against `#F5F5F5`, acting as a sharp dark silhouette.
  * The bright neon accents (`#4DEBFF`, `#63F5B2`) and `#C5CEDB` Titanium details illuminate against the dark body interior.

---

## 9. Rules for Future Category-Specific Glyphs (Phases 04 & 05)

When adding language, framework, or folder icons:
1. **Base Carrier Inheritance:**
   * Files should either utilize the standard chamfered data-plate chassis or a bespoke geometric glyph bounded by the 32×32 safe area (`2..30`).
   * Specialized folders (e.g. `src`, `components`, `tests`) inherit the vault carrier and replace the generic diamond with a category-specific cybernetic motif (e.g. gear for config, atom for components, crosshair for tests).
2. **Abstracted Technology Glyphs:**
   * Do not copy third-party logos verbatim. Re-engineer them into cybernetic geometric vectors using 45° angles and token colors.
3. **Token Alignment:**
   * JavaScript / Python / Rust / Config: `#FFC66D` (Solar Amber)
   * TypeScript / CSS / React / Web: `#4DEBFF` (Neon Cyan)
   * PHP / C# / Architecture: `#A78BFA` (Primary Violet)
   * Vue / Go / Data / `.env`: `#63F5B2` (Cyber Mint)
   * Svelte / SCSS / Creative: `#FF65C3` (Plasma Pink)

---

## 10. Common Visual Mistakes to Avoid

* ❌ **Tiny Text Labels:** Never put words like "JSON", "ENV", or "CONFIG" inside a 32×32 icon. They become unreadable at 16×16.
* ❌ **Decorative Micro-Circuits:** Avoid 0.5px traces and dense PCB circuit patterns. They degrade into muddy pixel noise.
* ❌ **Blur Filters & Raster Elements:** Never use `<filter id="glow">` with Gaussian blur. VS Code strips or degrades them, and they hurt tree-view rendering performance.
* ❌ **Color-Only Differentiation:** Never make the closed and open folder identical except for color. The physical silhouette must change.
* ❌ **Unbalanced Optical Weight:** Do not make one icon a heavy solid square and the next a thin wireframe. Maintain consistent visual density across the family.

