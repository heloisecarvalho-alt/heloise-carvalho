const header = document.querySelector('header');
if (header) {
  const updateOffset = () => {
    const sticky = getComputedStyle(header).position === 'sticky';
    document.documentElement.style.setProperty('--header-offset', `${sticky ? Math.ceil(header.getBoundingClientRect().height) + 16 : 24}px`);
  };
  const alignInitialAnchor = () => {
    updateOffset();
    const id = decodeURIComponent(location.hash.slice(1));
    const target = id && document.getElementById(id);
    if (target) { const behavior = document.documentElement.style.scrollBehavior; document.documentElement.style.scrollBehavior = 'auto'; target.scrollIntoView(); document.documentElement.style.scrollBehavior = behavior; }
  };
  if ('ResizeObserver' in window) new ResizeObserver(updateOffset).observe(header);
  window.addEventListener('resize', updateOffset, {passive:true});
  updateOffset();
  if (document.fonts) document.fonts.ready.then(alignInitialAnchor);
  else window.addEventListener('load', alignInitialAnchor, {once:true});
}
