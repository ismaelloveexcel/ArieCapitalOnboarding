# Arie Capital Onboarding Journey - Design Guidelines

## Design Approach
**Reference-Based**: Drawing inspiration from modern fintech onboarding experiences (Stripe, Plaid) combined with Linear's clean interface patterns and Notion's card-based interactions. The design emphasizes a cinematic, guided journey over traditional form interfaces.

## Brand Identity & Colors
**Specified Palette:**
- Navy: `#002b5c` (primary, backgrounds, headers)
- Cyan: `#00a0df` (accents, progress indicators, verified states)
- Silver: `#b3c0c9` (secondary text, borders, subtle elements)

**Application:**
- Primary actions and verified states use cyan
- Navy for headers, primary text, and card backgrounds
- Silver for muted text, dividers, and inactive states
- White backgrounds for main content areas with navy overlays for depth

## Typography
**Font Stack:**
- Primary: Inter (Google Fonts) - clean, professional, corporate-appropriate
- Headings: 600-700 weight
- Body: 400 weight
- UI labels: 500 weight

**Hierarchy:**
- Journey title: text-3xl to text-4xl, font-semibold
- Stage headers: text-xl, font-semibold
- Section labels: text-sm, font-medium, uppercase tracking-wide
- Body text: text-base
- Status chips: text-xs, font-medium

## Layout System
**Spacing Units:** Consistent use of Tailwind spacing - primarily `4, 6, 8, 12, 16, 20` units
- Card padding: `p-8`
- Section spacing: `space-y-6` to `space-y-8`
- Button padding: `px-6 py-3`
- Tight spacing for inline elements: `gap-2`

**Container Structure:**
- Main journey card: max-width `max-w-6xl`, centered with `mx-auto`
- Three-column stage layout on desktop: `grid grid-cols-3 gap-6`
- Responsive: Stack to single column on mobile

## Core Components

### Journey Card
- Large centered card with subtle shadow and navy background gradient
- Horizontal three-stage layout with connecting progress line
- Each stage is a self-contained card with rounded corners
- Hover states with subtle scale transform
- Active stage highlighted with cyan border glow

### Progress Bar
- Top of journey card spanning full width
- Animated fill with "merging water droplet" effect using Framer Motion
- Segments for each stage with smooth transitions
- Cyan fill color with subtle shimmer animation
- Percentage indicator on right side

### Upload Zones
- Dashed border rectangles with hover state (solid cyan border)
- Large upload icon (cloud with arrow) centered
- Drag-and-drop active state with background color change
- File preview thumbnails with small close button
- Status chips positioned top-right of preview

### Status Chips
- Small rounded pills with icon + text
- ✅ Verified: cyan background, white text
- ⚠ Check: amber background, navy text
- ❌ Invalid: red background, white text
- Pulsing animation on state change

### Buttons
- Primary: cyan background, white text, medium rounded (`rounded-lg`)
- Secondary: navy outline, navy text
- Hover states: subtle brightness increase
- When on images/overlays: backdrop blur background (`backdrop-blur-md bg-white/20`)
- Padding: `px-6 py-3`

### Input Fields
- Clean white backgrounds with silver borders
- Focus state: cyan border with subtle glow
- Labels above inputs with small margin
- Validation states with inline icons
- Consistent height: `h-12`

## Animations (Framer Motion)

### Stage Transitions
- Cards flip in on activation (rotateY: -90 to 0)
- Fade + slide up on content reveal
- Exit with scale down and fade

### Progress Bar
- Smooth width transitions (duration: 0.6s, ease-out)
- Ripple effect on segment completion
- Shimmer gradient animation running continuously

### Upload Feedback
- Scale bounce on successful upload
- Shake animation on validation error
- Checkmark draw-in animation for verified status

### Journey Complete
- Confetti particle explosion (using canvas or library)
- Card scale-in with spring animation
- Download button pulse effect

## Page-Specific Layouts

### Main Journey Interface
- Clean header with logo left, progress indicator right
- Centered journey card occupying 80% viewport height
- Footer with tagline "Every Entity Has a Journey" in silver text
- Minimal navigation - focus on the journey flow

### Admin Dashboard
- Sidebar navigation (navy background) with entity stats
- Main content area with data table and filter controls
- Risk score visualization using gauge charts (cyan/amber/red)
- Export button prominently placed top-right
- Cards for metrics: Total Entities, Verified %, Pending Reviews

### Journey Complete Screen
- Full-screen celebration overlay
- Centered success card with checkmark icon
- Download button (primary cyan) and QR code side-by-side
- Confetti animation backdrop
- Option to start new journey (secondary button)

## Images
**No hero images required** - this is a functional application, not a marketing site. The journey card IS the hero visual element. Focus on:
- Document/ID card icons in upload zones
- Company/user placeholder avatars
- Risk score gauge visualizations
- Success checkmark illustrations

## Accessibility
- WCAG AA compliant color contrast
- Keyboard navigation through journey stages
- Screen reader labels for all interactive elements
- Focus visible states with cyan outline
- Status communicated via text + icons