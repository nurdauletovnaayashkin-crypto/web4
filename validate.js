document.querySelectorAll("form").forEach((form) => {
  const result = form.querySelector(".result");
  const fields = [...form.querySelectorAll(".form-control, .form-select")];
  const useBootstrap = form.hasAttribute("novalidate");
  let submitted = false;
  function checkMatch() {
    const p = form.querySelector("#password"), c = form.querySelector("#confirm");
    if (p && c) c.setCustomValidity(c.value && c.value !== p.value ? "Passwords do not match" : "");
  }
  function mark(f) {
    if (!f.required && f.value === "") { f.classList.remove("is-valid", "is-invalid"); return; }
    const ok = f.checkValidity();
    f.classList.toggle("is-valid", ok);
    f.classList.toggle("is-invalid", !ok);
  }
  function checkGroups() {
    let all = true;
    form.querySelectorAll("[data-group]").forEach((g) => {
      const ok = !!g.querySelector("input:checked");
      const fb = g.querySelector(".invalid-feedback");
      if (fb) fb.style.display = ok ? "none" : "block";
      if (!ok) all = false;
    });
    return all;
  }
  if (useBootstrap) {
    fields.forEach((f) => ["input", "change"].forEach((ev) => f.addEventListener(ev, () => {
      checkMatch();
      mark(f);
      const c = form.querySelector("#confirm");
      if (c && c.value) mark(c);
    })));
    form.querySelectorAll("[data-group] input").forEach((i) =>
      i.addEventListener("change", () => submitted && checkGroups()));
  }
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (useBootstrap) {
      submitted = true;
      checkMatch();
      fields.forEach(mark);
      const groupsOk = checkGroups();
      if (!form.checkValidity() || !groupsOk) {
        if (result) result.classList.add("d-none");
        const bad = form.querySelector(".is-invalid");
        if (bad) bad.focus();
        return;
      }
    }
    if (result) {
      const first = form.querySelector("#firstName");
      result.textContent = first ? ✅ Registration successful. Welcome, ${first.value}! : "✅ Form submitted successfully!";
      result.classList.remove("d-none");
    }
  });
  form.addEventListener("reset", () => {
    submitted = false;
    fields.forEach((f) => f.classList.remove("is-valid", "is-invalid"));
    form.querySelectorAll("[data-group] .invalid-feedback").forEach((fb) => (fb.style.display = "none"));
    if (result) result.classList.add("d-none");
    setTimeout(checkMatch, 0);
  });
});