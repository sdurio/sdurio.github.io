/**
 * components.js
 * Injects the shared navigation bar and footer into every page.
 * Update markup here once and it propagates to all pages that include this file.
 */
(function () {
  "use strict";

  function resolvePath(path) {
    // Pages live at the site root or one level deep (e.g. /case-studies/).
    var depth = (window.SITE_ROOT_DEPTH || 0);
    return depth > 0 ? "../".repeat(depth) + path : path;
  }

  function buildNav() {
    // Built as a fragment containing <nav> and the mobile panel as siblings
    // (not nested) because .site-nav uses backdrop-filter, which would
    // otherwise become the containing block for a position:fixed descendant
    // and collapse its top/bottom offsets to the nav bar's own box.
    var home = resolvePath("index.html");
    var products = resolvePath("products.html");
    var resume = resolvePath("resume/sparkle-durio-resume-2026.pdf");

    var wrapper = document.createElement("div");
    wrapper.innerHTML =
      '<nav class="site-nav" aria-label="Primary">' +
        '<div class="container nav-inner">' +
          '<a href="' + home + '" class="nav-logo">Sparkle Durio</a>' +
          '<ul class="nav-links">' +
            '<li><a href="' + home + '#about">About</a></li>' +
            '<li><a href="' + home + '#experience">Experience</a></li>' +
          "</ul>" +
          '<div class="nav-actions">' +
            '<a href="' + products + '" class="btn btn-outline-sm">EA Resources</a>' +
            '<a href="' + resume + '" class="btn btn-solid-sm" download>Download Resume</a>' +
          "</div>" +
          '<button type="button" class="nav-toggle" aria-expanded="false" aria-controls="mobile-menu" aria-label="Toggle menu">' +
            "<span></span><span></span><span></span>" +
          "</button>" +
        "</div>" +
      "</nav>" +
      '<div class="nav-mobile-panel" id="mobile-menu">' +
        '<a href="' + home + '#about">About</a>' +
        '<a href="' + home + '#experience">Experience</a>' +
        '<a href="' + products + '">EA Resources</a>' +
        '<div class="nav-mobile-actions">' +
          '<a href="' + resume + '" class="btn btn-primary btn-block" download>Download Resume</a>' +
        "</div>" +
      "</div>";

    var fragment = document.createDocumentFragment();
    while (wrapper.firstChild) {
      fragment.appendChild(wrapper.firstChild);
    }
    return fragment;
  }

  function buildFooter() {
    var year = new Date().getFullYear();
    var footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.innerHTML =
      '<div class="container footer-inner">' +
        '<div class="footer-logo">Sparkle Durio</div>' +
        '<div class="footer-links">' +
          '<a href="https://www.linkedin.com/in/sparkledurio" target="_blank" rel="noopener noreferrer" aria-label="Sparkle Durio on LinkedIn">' +
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.15 1.45-2.15 2.94v5.66H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>' +
            "<span>LinkedIn</span>" +
          "</a>" +
          '<a href="mailto:sdurio5652@gmail.com" aria-label="Email Sparkle Durio">' +
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm17.4 2.3L12 12.6 3.6 7.3 3 8.2l9 5.7 9-5.7-.6-.9z"/></svg>' +
            "<span>Email</span>" +
          "</a>" +
        "</div>" +
        '<div class="footer-divider"></div>' +
        '<p class="footer-tagline">Crafting operational excellence for visionary leaders.</p>' +
        '<p class="footer-copyright">&copy; ' + year + " Sparkle Durio. All rights reserved.</p>" +
      "</div>";

    return footer;
  }

  function injectComponents() {
    var navHost = document.getElementById("site-nav");
    var footerHost = document.getElementById("site-footer");

    if (navHost) {
      navHost.replaceWith(buildNav());
    }
    if (footerHost) {
      footerHost.replaceWith(buildFooter());
    }

    document.dispatchEvent(new CustomEvent("components:ready"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectComponents);
  } else {
    injectComponents();
  }
})();
