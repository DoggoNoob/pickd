Display the current state of the design system for this project.

## Step 1: Locate the System File

Check for `.interface-design/system.md` in the project root.

## Step 2a: If the System File Exists

Parse and display its contents in this format:

```
Design System — [Direction name]
Last updated: [timestamp]

Foundation
  Background  [hex]
  Surface     [hex]
  Border      [hex]

Accent
  Primary     [hex]
  Hover       [hex]

Typography
  [typeface] — [reasoning summary]

Spacing
  Base: [value]  Scale: [values]

Depth
  [strategy and specifics]

Radius
  [values]

Patterns ([count] defined)
  [list each pattern with its key dimensions]
```

## Step 2b: If No System File Exists

Output:

```
No design system found for this project.

Two paths forward:

1. Build a UI component — the system will be established and offered for saving automatically.

2. Run /interface-design:extract — harvests patterns from existing code to create a system from what's already there.

Run /interface-design:init to establish a system from scratch with full intent-setting.
```

No additional commentary. Present the information directly.
