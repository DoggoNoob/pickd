# Interface Design: Craft Principles

## The Core Problem

Strong design patterns in training data produce generic output automatically. Without active resistance, you will produce: warm colors on cold structures, friendly fonts on generic layouts, "clean" interfaces that look like every other "clean" interface.

The solution is not better defaults. It is replacing the default-seeking behavior entirely.

## Intent Before Everything

Before writing a single line of code or proposing a palette, answer three questions with specificity:

**Who is this human?**
Not "users." A teacher at 7am checking submissions before class is not a developer debugging at midnight. Context changes everything: time pressure, emotional state, environment, what they just finished doing.

**What must they accomplish?**
The verb matters. "Grade these submissions" demands different affordances than "explore the analytics." "Approve or reject" is different from "discover and curate." If you cannot name the precise action, you do not understand the interface yet.

**What should this feel like?**
"Clean and modern" is not an answer—it describes nothing. "The focused calm of a library at opening time" is an answer. "The precision of a surgeon's tray" is an answer. Tie the feeling to the domain and the person.

If you cannot answer these three questions with specificity: stop. Ask the user. Do not guess. Do not default.

## Required Exploration Before Proposing Direction

Every interface project requires this before any proposal:

**Domain vocabulary**
5+ concepts and terms native to this product's world. A restaurant discovery app deals with: neighborhood, cuisine, occasion, regulars, hidden gems, price-to-quality ratio. Use this vocabulary in labels, empty states, and microcopy.

**Color world**
5+ colors found naturally in the physical equivalent of this domain. Not brand colors—the colors of the actual context. A restaurant app: the amber of low light, cream of worn menus, the green of fresh herbs, the dark wood of counters, the red of a neon sign through a rainy window.

**Signature**
One element that could exist only for this specific product. Not a logo—a design decision. A layout choice, a color relationship, an interaction pattern, a typographic treatment. Something that makes the product recognizable without the brand mark.

**Defaults to replace**
Name three obvious choices you would otherwise make. Then replace each with something specific to this product's world.

## Design Principles

### Subtle Layering

Visual hierarchy should be invisible. The viewer should feel the depth without seeing the mechanism.

Each surface elevation is a few percentage points of lightness—not dramatic shadows, not heavy borders. The layers exist in: background → surface → raised → floating.

Shadows are not decoration. When used, they should imply real elevation, not decoration. A floating dialog casts a different shadow than a raised card.

### Every Choice Requires Justification

If your answer to "why this color?" is "it's common" or "it's clean" or "it works"—you haven't chosen. You have defaulted.

Every choice must connect to: this user, this task, this domain. The spacing base unit should reflect the density appropriate for the work. The typeface should reflect the nature of the content. The radius should feel appropriate for the product's world.

"I chose 6px radius because the product is about discovery and ease—rounded but not playful. 4px felt too technical, 8px too soft" is a justification. "Rounded corners feel modern" is a default.

### Infinite Expression

The same architectural bones—sidebar + main content + cards—should never produce identical visual results across two different products.

Color carries meaning from the domain.
Typography weight creates hierarchy through the actual content, not generic heading sizes.
Spacing density is calibrated to the cognitive load of the work.
Surfaces communicate status and elevation through tonal relationships, not borders.

### Post-Build Validation

Before presenting any UI work, apply four tests:

**Swap test**: If you changed the typeface or shifted the hue 30 degrees, would it feel wrong for this specific product? If not, the choices aren't specific enough.

**Squint test**: Blur your eyes. Can you still see the hierarchy? Is there a clear focal point, or does everything compete equally?

**Signature test**: Can you identify five specific design decisions that exist only for this product? Not the logo—actual design choices.

**Token test**: If you used CSS custom properties or design tokens, do their names suggest this product's world? `--timer-amber` and `--surface-plate` are from a product. `--color-primary` and `--bg-card` are from nowhere.

Failure on any test requires iteration before presentation.

## Working Method

Work invisibly. Do not narrate modes or announce what you are about to do.

Lead with exploration and reasoning. Present one focused direction with full justification—not three options for the user to pick from. Options without expertise is not help.

After completing UI work, offer to save patterns to `.interface-design/system.md`. On subsequent sessions, read this file first and apply established patterns before introducing anything new.

Consistency is not sameness. It is the same underlying logic producing coherent results across different contexts.
