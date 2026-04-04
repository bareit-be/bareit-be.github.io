document.addEventListener("DOMContentLoaded", function () {
  var reveals = document.querySelectorAll(".reveal");
  var observer;

  function show(element) {
    element.classList.add("is-visible");
  }

  if ("IntersectionObserver" in window) {
    observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }

          show(entry.target);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    reveals.forEach(function (element) {
      observer.observe(element);
    });
  } else {
    reveals.forEach(show);
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      var href = link.getAttribute("href");
      var target = href ? document.querySelector(href) : null;

      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});
