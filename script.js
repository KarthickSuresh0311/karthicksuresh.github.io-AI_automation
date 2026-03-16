const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const setPageReady = () => {
  document.body.classList.remove("is-loading");
  document.body.classList.add("page-ready");
};

if (prefersReducedMotion.matches) {
  setPageReady();
} else {
  window.addEventListener(
    "load",
    () => {
      window.setTimeout(setPageReady, 320);
    },
    { once: true }
  );
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealItems.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -5% 0px" }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

if (!prefersReducedMotion.matches) {
  const parallaxItems = document.querySelectorAll("[data-parallax]");
  const orbs = document.querySelectorAll(".ambient-orb");
  let ticking = false;

  const updateMotion = () => {
    const scrollY = window.scrollY;

    parallaxItems.forEach((item) => {
      const speed = Number(item.getAttribute("data-parallax")) || 0;
      item.style.setProperty("--parallax-offset", `${scrollY * speed * -1}px`);
    });

    ticking = false;
  };

  const requestMotionUpdate = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateMotion);
      ticking = true;
    }
  };

  window.addEventListener("scroll", requestMotionUpdate, { passive: true });
  requestMotionUpdate();

  window.addEventListener("mousemove", (event) => {
    const xRatio = event.clientX / window.innerWidth - 0.5;
    const yRatio = event.clientY / window.innerHeight - 0.5;

    orbs.forEach((orb, index) => {
      const depth = index === 0 ? 26 : 18;
      const x = xRatio * depth;
      const y = yRatio * depth;
      orb.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
  });
}

const form = document.getElementById("contactForm");
if (form) {
  const formStatus = document.getElementById("formStatus");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = document.getElementById("name")?.value.trim() || "";
    const email = document.getElementById("email")?.value.trim() || "";
    const business = document.getElementById("business")?.value.trim() || "";
    const need = document.getElementById("need")?.value.trim() || "";
    const tools = document.getElementById("tools")?.value.trim() || "";
    const team = document.getElementById("team")?.value.trim() || "";
    const priority = document.getElementById("priority")?.value || "";
    const budget = document.getElementById("budget")?.value || "";
    formData.set("_subject", `Workflow Plan Request - ${business || name || "New Lead"}`);
    formData.set("_replyto", email);
    formData.set(
      "submission_summary",
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Business / Role: ${business}`,
        `Current Tools: ${tools || "Not provided"}`,
        `Team Context: ${team || "Not provided"}`,
        `Primary Priority: ${priority || "Not provided"}`,
        `Budget Range: ${budget || "Not provided"}`,
        "",
        "Automation Need:",
        need,
      ].join("\n")
    );

    if (formStatus) {
      formStatus.textContent = "Sending your workflow request...";
    }

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Form submission failed.");
      }

      form.reset();
      if (formStatus) {
        formStatus.textContent = "Request sent. Check your inbox for the FormSubmit activation email if this is the first submission.";
      }
    } catch (error) {
      if (formStatus) {
        formStatus.textContent = "Form submit failed. You can retry in a moment or email karthicksuresh0311@gmail.com directly.";
      }
    }
  });
}
