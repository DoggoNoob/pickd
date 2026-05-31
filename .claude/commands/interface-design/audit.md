Audit UI code against the established design system.

Usage: `/interface-design:audit [path]`

If no path is provided, scan common UI locations: `src/components/`, `src/pages/`, `src/views/`, `public/`, `app/`.

## Step 1: Load the Design System

Read `.interface-design/system.md`. If it does not exist, output:

```
No design system found. Run /interface-design:init or /interface-design:extract first.
```

Then stop.

## Step 2: Extract Rules

Parse the system file for:
- **Spacing grid**: base unit and scale values
- **Depth strategy**: shadow definitions or border approach
- **Color palette**: all defined hex values
- **Patterns**: component specifications with dimensions

## Step 3: Scan Files

Read TypeScript, JavaScript, CSS, and HTML files at the specified path. Check for:

**Spacing violations**
- Pixel values not on the spacing scale (e.g., `padding: 17px` when base is 4px)
- Inconsistent gaps that break the grid

**Depth violations**
- Shadow usage in a borders-only system
- Shadow values not matching defined elevation levels
- Missing depth cues on surfaces that should be elevated

**Color violations**
- Hex values not in the defined palette
- Inline colors that should use design tokens
- Exception: semantic grays and transparent overlays are allowed

**Pattern violations**
- Button heights differing from the defined pattern
- Card padding outside the defined range
- Component structures inconsistent with established patterns

## Step 4: Report

Output violations in this format:

```
Audit: [path]
System: [direction name]

[count] violation(s) found

SPACING
  [file]:[line] — [value found] (grid: [expected values])
  Fix: use [closest grid value]

DEPTH
  [file]:[line] — [description of violation]
  Fix: [specific correction]

COLOR
  [file]:[line] — [hex found] not in palette
  Fix: closest match is [hex] ([token name])

PATTERNS
  [file]:[line] — [component] height [found]px (pattern: [expected]px)
  Fix: standardize to [value]
```

If no violations are found:

```
Audit: [path]
System: [direction name]

No violations found. Code is consistent with the design system.
```
