# webpage
-All work was done on VS code so my commits are not here sadly, but I will write a report here in this document on the challenges I had during this. 
I will note that I was unable to deply onto my github as the instructions were not clear on how to deploy on pages. 

## Project Overview
Single-page website buitl with HTML, CSS, JAvascript, and bootstrap.

### Features

- **Responsive Design**: FUlly responsive layout that works on desktop
- **Smooth Animations**: Scroll-triggered animations and hover effects
- **Interactive Components**: Bootstrap accordion (skills) and carousel (projects)
- **Form Validation**: Client-side form validation with real-time feedback
- **API Integration**: GitHub Zen API integration for dynamic content (pages wasnt configured on github)
- **Accessibility**: Semantic HTML and ARIA labels for screen readers

---

## Technologies Used
| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic markup structure |
| CSS3 | Custom styling with CSS variables, flexbox, grid |
| JavaScript | Interactivity, form validation, animations |
| Bootstrap 5.3.2 | UI framework for responsive grid and components |
| Bootstrap Icons 1.11.1 | Icon library |
| Google Fonts | Playfair Display and Source Sans 3 typography |

## Project Structure

```
webpage/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Custom stylesheet
├── js/
│   └── main.js         # JavaScript functionality
├── images/
│   └── test.jpg        # test image first used
|   └── heaafshot-small.jpg # Actual headshot used
└── README.md           # Project documentation
```

---

## How to Run the Code

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A code editor (VS Code)

### Method 1: Direct Download
1. Download the project files as a ZIP
2. Extract the ZIP to a folder on your computer
3. Open the `index.html` file in your web browser
4. The website should load and be fully functional

### Method 2: Clone from GitHub
1. Open your terminal/command prompt
2. Clone the repository:
   ```bash
   git clone https://github.com/angelkamysz/angelkamysz.github.io.git
   ```
3. Navigate to the project directory:
   ```bash
   cd angelkamysz.github.io
   ```
4. Open `index.html` in your browser:
   ```bash
   # On Mac (I googled how to do it)
   open index.html
   
   # On Windows
   start index.html
   
   # On Linux
   xdg-open index.html
   ```

## Website Sections

| Section | Description |
|---------|-------------|
| **Hero** | Introduction with animated text and call-to-action buttons |
| **About** | Personal bio, profile photo, and skills accordion |
| **Experience** | Timeline of work history and education |
| **Projects** | Carousel showcasing featured projects |
| **Contact** | Contact form with validation and contact information |

---

### Bootstrap Components (Not Covered in this Class) #even though this was not covered, I have made websites before
- **Accordion Component**: Used in the About section to organize technical skills into collapsible categories
- **Carousel Component**: Used in the Projects section with custom navigation controls

### Advanced CSS Features
- **CSS Custom Properties (Variables)**: Used throughout for consistent theming and easy color management
- **Scroll Behavior**: Native smooth scrolling with `scroll-behavior: smooth`
- **Complex Animations**: Keyframe animations with staggered delays for hero section
- **Object-fit Property**: Used for responsive image containment

### JavaScript Features
- **Intersection Observer API**: For efficient scroll-triggered animations
- **Form Validation**: Real-time validation with visual feedback
- **API Integration**: Fetching data from GitHub Zen API
- **Notification System**: Custom toast notifications

---

### Challenge 1: Profile Image Overflow

**Problem:** My profile image was too large and was overflowing outside its container, going through other text and elements on the page.

**What I Tried:**
- Setting `height: auto` on the image (didn't work - image stayed at natural size)
- Setting `max-width: 100%` (didn't constrain the height)

**Solution:** Used a combination of fixed container height and `object-fit: cover`:

```css
/* The container needs a fixed height */
.about-image-frame {
  overflow: hidden;      /* Clips anything outside the box */
  height: 500px;         /* Fixed height constraint */
}

/* The image fills the container and crops excess */
.about-image {
  width: 100%;
  height: 100%;          /* Changed from 'auto' to '100%' */
  object-fit: cover;     /* Scales and crops to fit */
  object-position: center top;  /* Focuses on face/top of image */
}
```

**Key Learning:** The CSS Box Model - understanding that `overflow: hidden` on a parent with fixed dimensions will clip child content, and `object-fit: cover` allows images to scale while maintaining aspect ratio.

---

### Challenge 2: Timeline Not Displaying Correctly

**Problem:** My experience/education timeline wasn't showing the vertical line or proper spacing. The timeline items were just stacking without any visual connection.

**What I Tried:**
- Checking CSS styles (they were correct)
- Looking at spacing and margins

**Solution:** I was missing the parent `<div class="timeline">` wrapper around my timeline items.
**Key Learning:** The `.timeline` class has a `::before` pseudo-element that creates the vertical line. Without the parent wrapper, this line doesn't exist. Always check that HTML structure matches what CSS expects.

### Challenge 3: Understanding the CSS Box Model

**Problem:** Needed to understand how to properly space and contain elements for the timeline and project sections.

**Solution:** Learned about the CSS Box Model components:

**Applied in Timeline:**
```css
.timeline-content {
  padding: 25px 30px;    /* Space inside the box */
  margin-bottom: 12px;   /* Space outside/below the box */
  border-radius: 8px;    /* Rounded corners on border */
}
```

---

### Challenge 4: Project Tech Tags Not Matching Content

**Problem:** The technology tags on my projects (Adaptive Technologies, Bereavement Project) were showing web development technologies (Vue.js, React) instead of the actual technologies used (3D Printing, CAD Design).

**Solution:** Updated the HTML to reflect the actual technologies:

## Outside Libraries, Frameworks & Resources Used
### CSS Framework
- **Bootstrap 5.3.2**
  - Website: https://getbootstrap.com/
  - CDN Used: `https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css`
  - Purpose: Responsive grid system, pre-built components (navbar, accordion, carousel, forms, buttons)
  - Documentation Referenced: 
    - [Grid System](https://getbootstrap.com/docs/5.3/layout/grid/)
    - [Accordion](https://getbootstrap.com/docs/5.3/components/accordion/)
    - [Carousel](https://getbootstrap.com/docs/5.3/components/carousel/)
    - [Forms](https://getbootstrap.com/docs/5.3/forms/overview/)

### JavaScript Library
- **Bootstrap Bundle 5.3.2** (includes Popper.js)
  - CDN Used: `https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js`
  - Purpose: JavaScript functionality for Bootstrap components (accordion toggling, carousel navigation, navbar collapse)

### Icon Library
- **Bootstrap Icons 1.11.1**
  - Website: https://icons.getbootstrap.com/
  - CDN Used: `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css`
  - Purpose: Icons for social links, navigation, buttons, and contact information
  - Icons Used: `bi-github`, `bi-linkedin`, `bi-envelope`, `bi-code-slash`, `bi-server`, `bi-tools`, `bi-download`, `bi-arrow-left`, `bi-arrow-right`, `bi-arrow-up`, `bi-check-circle`, `bi-geo-alt`, `bi-clock`, `bi-twitter-x`, `bi-box-arrow-up-right`

### Typography (Google Fonts)
- **Playfair Display** - Display/heading font
  - Website: https://fonts.google.com/specimen/Playfair+Display
  - Weights Used: 400, 500, 600, 700
- **Source Sans 3** - Body text font
  - Website: https://fonts.google.com/specimen/Source+Sans+3
  - Weights Used: 300, 400, 500, 600

### Images
- **Unsplash** - Free stock photography
  - Website: https://unsplash.com/
  - Purpose: Placeholder images for project screenshots
  - Used two images

## 🎯 JavaScript Functionality (30+ lines)

The JavaScript file (`js/main.js`) includes the following functionality:

1. **Navbar scroll effects** - Dynamic navbar styling based on scroll position
2. **Scroll animations** - Elements animate when entering viewport using Intersection Observer
3. **Form validation** - Real-time validation with error messages
4. **Form submission** - Simulated form submission with loading states
5. **Back to top button** - Appears on scroll, smooth scrolls to top
6. **Active navigation** - Updates nav links based on current section
7. **API integration** - Fetches data from GitHub Zen API
8. **Notification system** - Shows toast notifications

---
