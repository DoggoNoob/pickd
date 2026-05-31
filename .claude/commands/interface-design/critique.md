Read the skill file at `$CLAUDE_PROJECT_DIR/.claude/skills/interface-design/SKILL.md` before proceeding.

Apply a craft-level critique to the specified UI. This is not a bug check—it is a judgment of intentionality.

Usage: `/interface-design:critique [path or component]`

If no path is given, ask what to critique.

## The Four Dimensions

**1. Composition**

Examine the layout for rhythm and hierarchy.

Ask:
- Does the page have a clear focal point, or is attention evenly distributed across everything?
- Are proportions intentional? Same-size cards, same gaps throughout = no hierarchy.
- Where does breathing room exist? Dense areas should contrast with open areas.
- Do proportions communicate priority? Primary content should feel primary.

Flag: Monotone layouts. Grid-locked designs with no variation. Everything the same visual weight.

**2. Craft**

Examine pixel-level decisions.

Ask:
- Is padding density appropriate for the work being done? (Tight = workbench; loose = brochure)
- Does typography use weight and opacity beyond just size? (Hierarchy requires multiple variables)
- Are surfaces differentiated through tonal shifts, not only borders?
- Do interactive elements have response states? (No hover/active state = photograph of software)
- Is there a signature element—something that exists only for this specific product?

Flag: Default border-radius values. System font without justification. All-the-same-opacity text hierarchy. Buttons with no states.

**3. Content**

Examine whether the interface tells a coherent story.

Ask:
- Does content across sections feel like it came from the same product?
- Are labels and microcopy consistent in voice?
- Does any section feel like it was built separately and inserted?

Flag: Mixed tones. Data that looks like placeholder text. Labels that don't match the domain vocabulary.

**4. Structure**

Examine the underlying CSS/HTML for honesty.

Ask:
- Are negative margins, `calc()` workarounds, or `position: absolute` hiding layout problems?
- Does the grid solve problems cleanly, or does each component fight the layout?
- Could the spacing be expressed as simple multiples of a base unit?

Flag: Magic numbers. Fixed heights on dynamic content. Absolute positioning used for alignment.

## Output Format

```
Critique: [component or path]

COMPOSITION
  [observation] — [specific element]
  Rebuild: [concrete direction]

CRAFT
  [observation] — [specific element]
  Rebuild: [concrete direction]

CONTENT
  [observation]
  Rebuild: [concrete direction]

STRUCTURE
  [observation] — [file:line if applicable]
  Rebuild: [concrete direction]

---
[1–2 sentence summary of the dominant gap between correct and crafted]
```

Be direct. Name the defaults. Point to the specific element. Offer a concrete rebuild direction, not general advice.

Do not narrate the process. Do not soften findings with qualifications. The critique serves the work.
