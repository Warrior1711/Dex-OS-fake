:root{
  --bg:#0b1220;
  --card:#0f1724;
  --accent:#4f9cff;
  --text:#e6eef8;
}
*{box-sizing:border-box}
html,body{height:100%;margin:0;font-family:Inter,system-ui,Arial;color:var(--text);}
.screen{height:100vh;width:100vw;display:flex;align-items:center;justify-content:center;position:relative;}
.hidden{display:none}

#login-screen{background:linear-gradient(135deg,#071021 0%, #0b1b2a 100%);}
.login-card{background:rgba(255,255,255,0.03);padding:32px;border-radius:12px;backdrop-filter:blur(6px);width:320px;text-align:center}
.login-card h1{margin:0 0 12px;font-size:28px}
.login-card input{width:100%;padding:10px;margin:8px 0;border-radius:8px;border:1px solid rgba(255,255,255,0.06);background:transparent;color:var(--text)}
.login-card button{width:100%;padding:10px;margin-top:8px;background:var(--accent);border:none;color:white;border-radius:8px;cursor:pointer}

#desktop{overflow:hidden}
#wallpaper{position:absolute;inset:0;background:linear-gradient(120deg,#0b2540 0%, #071021 60%);background-size:cover}
#icons{position:absolute;left:20px;top:20px;display:flex;flex-direction:column;gap:18px}
.icon{width:92px;text-align:center;color:var(--text);cursor:pointer;user-select:none}
.icon img{width:64px;height:64px;display:block;margin:0 auto}
#taskbar{position:absolute;left:0;right:0;bottom:0;height:48px;background:rgba(2,6,23,0.6);display:flex;align-items:center;padding:0 8px;backdrop-filter:blur(6px)}
#start{padding:6px 12px;background:transparent;color:var(--text);border-radius:6px;cursor:pointer;margin-right:8px}
#task-list{flex:1;display:flex;gap:6px;align-items:center}
#task-right{display:flex;gap:8px;align-items:center}
#task-right button{background:transparent;color:var(--text);border:1px solid rgba(255,255,255,0.04);padding:6px;border-radius:6px;cursor:pointer}

/* Windows */
.window{position:absolute;width:420px;height:260px;background:linear-gradient(180deg,#0b1220,#07101a);border-radius:8px;border:1px solid rgba(255,255,255,0.04);box-shadow:0 8px 30px rgba(0,0,0,0.6);overflow:hidden;display:flex;flex-direction:column}
.window .titlebar{height:34px;background:rgba(255,255,255,0.02);display:flex;align-items:center;padding:0 8px;gap:8px;cursor:grab}
.window .title{flex:1;color:var(--text)}
.window .controls button{background:transparent;border:none;color:var(--text);cursor:pointer;padding:6px;margin-left:6px}
.window .content{flex:1;padding:12px;color:var(--text);font-size:14px;overflow:auto}
