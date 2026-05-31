Read the skill file at `$CLAUDE_PROJECT_DIR/.claude/skills/interface-design/SKILL.md` before proceeding.

You are initializing a design system for this project. Follow the Interface Design methodology: intent first, then craft.

## Step 1: Establish Intent

Answer these three questions with specificity before proposing any direction:

1. **Who is this person?** Not abstract "users"—describe context: time of day, emotional state, what they just finished doing before opening this.
2. **What action must they complete?** Use a verb: grade, debug, approve, compare. Not "use the dashboard."
3. **How should this feel?** Concrete sensory or emotional descriptors tied to the work itself. Reject "clean" and "modern" as non-answers.

If you cannot answer these with specifics from the project context, stop and ask.

## Step 2: Domain Exploration

Before proposing a direction, produce:

- **Domain:** 5+ concepts and vocabulary native to this product's world
- **Color world:** 5+ colors found naturally in the physical equivalent of this domain
- **Signature:** One element that could exist only for this specific product
- **Defaults to replace:** Name three obvious/generic choices and propose alternatives

## Step 3: Propose a Direction

Present one focused direction (not three options). Include:

- Direction name (e.g., "Precision & Density", "Warmth & Flow")
- Foundation: background + surface + border colors with hex values
- Accent: primary action color with reasoning tied to domain
- Typography: typeface choice justified by the work
- Spacing: base unit (4px, 6px, 8px) with scale
- Depth strategy: shadows, borders, or tonal shifts

State the reasoning. Every choice must connect to the user, task, and domain—not "it's common."

## Step 4: Save to System

After the user confirms the direction, write the design decisions to `.interface-design/system.md` using this format:

```markdown
# Design System

**Direction:** [name]
**Established:** [date]

## Foundation
- Background: [hex]
- Surface: [hex]
- Border: [hex]
- Text primary: [hex]
- Text secondary: [hex]

## Accent
- Primary: [hex] — [reasoning]
- Hover: [hex]

## Typography
- Typeface: [name] — [reasoning]
- Scale: [values]

## Spacing
- Base unit: [value]
- Scale: [values]

## Depth
- Strategy: [shadows | borders | tonal]
- [specifics]

## Radius
- [values]

## Patterns
[component specifications as they are built]
```

Create `.interface-design/` directory if it does not exist. Confirm save with the user.
