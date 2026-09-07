/**
 * main.js
 * Site-wide interactions: sticky nav state, mobile menu, scroll-in
 * animations, and animated stat counters.
 */
(function () {
  "use strict";

  function initNav() {
    var nav = document.querySelector(".site-nav");
    if (!nav) return;

    var toggle = nav.querySelector(".nav-toggle");
    var panel = document.querySelector(".nav-mobile-panel");

    function setScrolled() {
      nav.classList.toggle("is-scrolled", window.scrollY > 12);
    }
    setScrolled();
    window.addEventListener("scroll", setScrolled, { passive: true });

    if (toggle && panel) {
      toggle.addEventListener("click", function () {
        var expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!expanded));
        panel.classList.toggle("is-open", !expanded);
        document.body.style.overflow = !expanded ? "hidden" : "";
      });

      panel.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          toggle.setAttribute("aria-expanded", "false");
          panel.classList.remove("is-open");
          document.body.style.overflow = "";
        });
      });
    }
  }

  function initScrollAnimations() {
    var targets = document.querySelectorAll("[data-animate], [data-animate-group]");
    if (!targets.length) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  function animateCount(el) {
    var raw = el.getAttribute("data-count") || el.textContent;
    var match = raw.match(/([\d,.]+)/);
    if (!match) return;

    var numStr = match[1];
    var target = parseFloat(numStr.replace(/,/g, ""));
    if (isNaN(target)) return;

    var prefix = raw.slice(0, match.index);
    var suffix = raw.slice(match.index + numStr.length);
    var hasDecimal = numStr.indexOf(".") !== -1;
    var decimals = hasDecimal ? numStr.split(".")[1].length : 0;
    var duration = 1400;
    var start = null;

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function step(timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = easeOutCubic(progress);
      var current = target * eased;
      var formatted = decimals
        ? current.toFixed(decimals)
        : Math.round(current).toLocaleString("en-US");
      el.textContent = prefix + formatted + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = prefix + numStr + suffix;
      }
    }

    window.requestAnimationFrame(step);
  }

  function initStatCounters() {
    var stats = document.querySelectorAll(".stat-number");
    if (!stats.length) return;

    if (!("IntersectionObserver" in window)) {
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    stats.forEach(function (el) {
      observer.observe(el);
    });
  }

  function initSmoothScroll() {
    document.addEventListener("click", function (e) {
      var link = e.target.closest('a[href*="#"]');
      if (!link) return;

      var url = new URL(link.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;

      var target = document.querySelector(url.hash);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", url.hash);
    });
  }

  function initNotifyForm() {
    var form = document.getElementById("notify-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = form.querySelector('input[type="email"]').value;
      var success = document.getElementById("notify-success");
      window.location.href =
        "mailto:sdurio5652@gmail.com?subject=Notify%20me%20when%20EA%20Resources%20launch&body=Please%20notify%20me%20at%20" +
        encodeURIComponent(email) + "%20when%20the%20EA%20Resources%20launch.";
      if (success) {
        success.classList.add("is-visible");
      }
    });
  }

  function init() {
    initNav();
    initScrollAnimations();
    initStatCounters();
    initSmoothScroll();
    initNotifyForm();
  }

  document.addEventListener("components:ready", init);
})();
