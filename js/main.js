/* EVAS DESIGNS — site interactions */
(function () {
  "use strict";

  /* Footer year */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Sticky header state */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile nav */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  /* FAQ accordion */
  document.querySelectorAll(".faq-q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq-item");
      var answer = item.querySelector(".faq-a");
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (other) {
        if (other !== item) {
          other.classList.remove("open");
          other.querySelector(".faq-a").style.maxHeight = null;
          other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
        }
      });
      item.classList.toggle("open", !isOpen);
      btn.setAttribute("aria-expanded", !isOpen ? "true" : "false");
      answer.style.maxHeight = !isOpen ? answer.scrollHeight + "px" : null;
    });
  });

  /* Scroll reveal with stagger */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var groups = new Map();
    revealEls.forEach(function (el) {
      var key = el.parentElement;
      if (!groups.has(key)) groups.set(key, 0);
      var i = groups.get(key);
      el.style.setProperty("--reveal-delay", Math.min(i * 90, 450) + "ms");
      groups.set(key, i + 1);
    });
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* Hero headline line reveal */
  document.querySelectorAll("[data-lines]").forEach(function (el) {
    el.classList.add("in");
  });

  /* Subtle parallax on hero image */
  var heroImg = document.querySelector(".hero-media img");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (heroImg && !reduceMotion) {
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = Math.min(window.scrollY * 0.08, 60);
        heroImg.style.translate = "0 " + y + "px";
        ticking = false;
      });
    }, { passive: true });
  }

  /* Contact / consultation forms: front-end validation + WhatsApp handoff */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var data = new FormData(form);
      var labels = {
        "lead-topic": "Requirement",
        "phone": "Phone",
        "project-type": "Project type",
        "location": "Location",
        "plot-size": "Plot / property size",
        "timeline": "Timeline",
        "budget": "Budget range",
        "message": "Details"
      };
      var name = data.get("name") || "there";
      var lines = ["Hello Evas Designs, I'm " + name + "."];
      Object.keys(labels).forEach(function (key) {
        var value = data.get(key);
        if (value) lines.push(labels[key] + ": " + value);
      });
      window.open("https://wa.me/918447512475?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener");
      var note = document.getElementById("form-note");
      if (note) note.textContent = "Opening WhatsApp with your message — press send there and we'll take it from here.";
    });
  }
})();
