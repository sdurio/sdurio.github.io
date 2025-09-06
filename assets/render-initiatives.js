
(async function(){
  try{
    const res = await fetch('/data/initiatives.json');
    const items = await res.json();
    const grid = document.querySelector('.card-grid, #initiatives .card-grid');
    if(!grid) return;
    // Clear placeholder content only if grid is empty
    if(grid.children.length === 0) {
      items.forEach(it => {
        const art = document.createElement('article');
        art.className = 'card';
        art.setAttribute('role','listitem');
        art.innerHTML = `<h3><a href="${it.link}">${it.title}</a></h3>
          <p>${it.summary}</p>
          <p class="outcome">${it.outcome}</p>`;
        grid.appendChild(art);
      });
    }
  }catch(e){ console.warn('Failed to render initiatives:', e); }
})();
