(function () {
  const bg = document.createElement("div");
  bg.id = "bg";
  document.body.prepend(bg);
  const rnd = (a, b) => Math.random() * (b - a) + a;
  const make = (cls, symbol, count, minS, maxS) => {
    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.className = cls;
      el.textContent = symbol[i % symbol.length];
      el.style.cssText = left:${rnd(0, 100)}%;font-size:${rnd(minS, maxS)}px; +
        animation-duration:${rnd(12, 26)}s;animation-delay:${rnd(-26, 0)}s; +
        --dx:${rnd(-120, 120)}px;--rot:${rnd(-360, 360)}deg;
      bg.appendChild(el);
    }
  };
  make("flower", ["🌹", "🌷", "🌸", "🥀", "🌺"], 16, 20, 40);
  make("star", ["⭐", "✨", "🌟", "💫"], 22, 14, 32);
})();