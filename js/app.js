// Minimal DEX os shell
document.addEventListener('DOMContentLoaded', () => {
  const loginScreen = document.getElementById('login-screen');
  const desktop = document.getElementById('desktop');
  const loginForm = document.getElementById('login-form');
  const logoutBtn = document.getElementById('logout-btn');
  const icons = document.querySelectorAll('.icon');
  const taskList = document.getElementById('task-list');
  const clockEl = document.getElementById('clock');

  // show/hide
  function showDesktop(user){
    loginScreen.classList.add('hidden');
    desktop.classList.remove('hidden');
    desktop.setAttribute('aria-hidden','false');
    startClock();
  }
  function showLogin(){
    localStorage.removeItem('dex_user');
    loginScreen.classList.remove('hidden');
    desktop.classList.add('hidden');
    desktop.setAttribute('aria-hidden','true');
  }

  // Check stored session
  if(localStorage.getItem('dex_user')){
    showDesktop(localStorage.getItem('dex_user'));
  }

  loginForm?.addEventListener('submit', e=>{
    e.preventDefault();
    const user = document.getElementById('username').value || 'Guest';
    // Fake auth: accept any creds
    localStorage.setItem('dex_user', user);
    showDesktop(user);
  });

  logoutBtn?.addEventListener('click', () => {
    showLogin();
  });

  // open apps from icons
  icons.forEach(ic => {
    ic.addEventListener('dblclick', () => openApp(ic.dataset.app));
    ic.addEventListener('click', () => { /* could single-click to select */ });
  });

  // simple apps
  function openApp(name){
    if(name==='files') createWindow('Files','This is a fake file explorer.');
    if(name==='terminal') createWindow('Terminal','> echo "Welcome to DEX os"\nWelcome');
    if(name==='settings') createWindow('Settings','Preferences go here.');
  }

  // window management
  let z = 10;
  function createWindow(title, content){
    const w = document.createElement('div');
    w.className = 'window';
    w.style.left = (80 + Math.random()*100) + 'px';
    w.style.top = (60 + Math.random()*80) + 'px';
    w.style.zIndex = ++z;
    w.innerHTML = `
      <div class="titlebar"><div class="title">${title}</div><div class="controls"><button class="min">—</button><button class="close">✕</button></div></div>
      <div class="content"><pre>${content}</pre></div>
    `;
    document.body.appendChild(w);
    makeDraggable(w);
    const closeBtn = w.querySelector('.close');
    closeBtn.addEventListener('click', ()=> {
      w.remove();
      updateTaskList();
    });
    w.addEventListener('mousedown', ()=> w.style.zIndex = ++z);
    addToTaskList(title, w);
  }

  // task list simple entry
  function addToTaskList(title, win){
    const btn = document.createElement('button');
    btn.textContent = title;
    btn.title = title;
    btn.addEventListener('click', ()=> {
      // focus or toggle
      if(document.body.contains(win)){
        const isVisible = win.style.display !== 'none';
        win.style.display = isVisible ? 'none' : 'block';
        if(!isVisible) win.style.zIndex = ++z;
      }
    });
    taskList.appendChild(btn);
    updateTaskList();
  }
  function updateTaskList(){ /* could prune closed windows */ }

  // draggable
  function makeDraggable(el){
    const header = el.querySelector('.titlebar');
    let offsetX=0, offsetY=0, dragging=false;
    header.addEventListener('pointerdown', (e)=>{
      dragging = true;
      el.style.zIndex = ++z;
      offsetX = e.clientX - el.offsetLeft;
      offsetY = e.clientY - el.offsetTop;
      header.setPointerCapture(e.pointerId);
    });
    header.addEventListener('pointermove', (e)=>{
      if(!dragging) return;
      el.style.left = (e.clientX - offsetX) + 'px';
      el.style.top  = (e.clientY - offsetY) + 'px';
    });
    header.addEventListener('pointerup', (e)=>{
      dragging = false;
      try{ header.releasePointerCapture(e.pointerId);}catch(e){}
    });
  }

  // clock
  function startClock(){
    function update(){
      const d = new Date();
      clockEl.textContent = d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
    }
    update();
    setInterval(update, 60*1000);
  }
});
