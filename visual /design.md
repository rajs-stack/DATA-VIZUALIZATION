# Editorial Design Notes

## Purpose
Create an editorial-style layout from the existing `index.html` content with a clean typographic hierarchy, subtle color palette, and responsive layout.

## Structure
- `page-shell`: centers content and provides generous page padding.
- `article`: adds a soft white canvas with an accent border and subtle shadow.
- `hero`: introduces the story with an eyebrow label, bold headline, and a brief lede.
- `media-grid`: places the graphic and video side by side for a magazine-style composition.
- `feature-image`: highlights the main image with a caption and rounded card treatment.
- `touchpoints`: provides an accent section for visual details.

## Typography
- Main text uses a serif system font for an editorial feel.
- Headings are large and spaced for strong visual hierarchy.
- Paragraphs use a readable line-height with a restrained color tone.

## Colors
- Background: warm off-white gradient for a paper-like atmosphere.
- Accent: deep red (#af2626) to mirror the existing SVG brand color.
- Text: charcoal for strong readability with softer captions.

## Reset and Tag Styling
- Reset margins, padding, and box-sizing for all elements.
- Ensure images, iframes, SVGs, and videos are responsive.
- Add base styles for common tags: `h1`–`h6`, `p`, `figure`, `blockquote`, `ul`, `ol`, `code`, and `pre`.

## Responsive Behavior
- The grid shifts from two columns to one on narrower screens.
- The layout and type scale adjust for comfortable reading on mobile.

## Notes
This design preserves the original content while giving it a modern, editorial presentation that works well for featured storytelling and multimedia content.