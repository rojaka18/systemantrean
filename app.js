const API = 'https://script.google.com/macros/s/AKfycbypK0_uDE60tQRHjY7pKThDhQpafZfX6F4l89AV75P7lbJlRy-4jkrCJzLfPk1lFrcg/exec?page=admin';
let token = localStorage.getItem('tok') || prompt('PIN admin');
localStorage.setItem('tok', token);

// POST pakai text/plain biar gak kena preflight CORS
const call = (action, extra = {}) =>
  fetch(API, { method: 'POST', body: JSON.stringify({ action, token, ...extra }) })
    .then(r => r.json());

async function refresh() {
  const r = await call('getQueue');
  if (!r.ok) { localStorage.removeItem('tok'); return alert(r.error); }
  render(r.data);
}
setInterval(refresh, 10000); refresh();