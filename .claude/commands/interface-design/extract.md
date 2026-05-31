Extract design patterns from existing UI code and generate a design system.

Usage: `/interface-design:extract [path]`

If no path is provided, scan: `src/components/`, `src/pages/`, `src/views/`, `public/`, `app/`.

## Step 1: Scan Files

Read TypeScript, JavaScript, CSS, HTML files at the specified path. Parse for recurring values.

## Step 2: Analyze Patterns

**Spacing analysis**
- Collect all margin, padding, gap, width, height values
- Calculate frequency for each value
- Identify the most common base unit (likely 4px, 6px, or 8px)
- Suggest a scale: [base × 1, 2, 3, 4, 6, 8, 12, 16]

**Border radius**
- Collect all border-radius values
- Identify the top 3–5 most frequent values
- Suggest a scale (e.g., 2px, 4px, 8px, 16px, full)

**Component patterns**

*Buttons*
- Collect all button/[role="button"] heights
- Identify dominant height and padding
- Note variants if multiple distinct sizes appear

*Cards and surfaces*
- Collect padding and radius values from card-like containers
- Note border vs. shadow usage

**Depth strategy**
- Count uses of `box-shadow` vs. `border` for surface separation
- Determine dominant strategy: shadows, borders, or tonal (background-only)

**Color usage**
- Collect all hex and rgb values
- Group into approximate clusters (background, surface, text, accent, border)
- Report the top 10–15 most-used values

## Step 3: Present Findings

Show discovered patterns with frequency counts:

```
Extracted patterns from [path]
[file count] files scanned

SPACING
  Most common values: [values with counts]
  Suggested base: [value]px
  Suggested scale: [values]

RADIUS
  Most common values: [values with counts]
  Suggested scale: [values]

COMPONENTS
  Buttons: [height]px height, [padding] padding ([count] instances)
  Cards: [padding], [radius] ([count] instances)

DEPTH
  Strategy: [shadows | borders | mixed] ([shadow count] shadows, [border count] borders)

COLORS (top 15 by frequency)
  [hex] — [count] uses — [likely role]
  ...
```

## Step 4: Confirm and Save

Ask: "Save these as your design system? You can customize before saving."

If confirmed, write to `.interface-design/system.md` using the system format from `/interface-design:init`.

Mark the direction as "Extracted" and note the extraction date. Offer to run `/interface-design:init` afterward if the user wants to refine intent and direction.
