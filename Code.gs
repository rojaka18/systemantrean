const ADMIN_TOKEN = PropertiesService.getScriptProperties().getProperty('ADMIN_TOKEN');

function doGet(e) {
  const p = e.parameter;
  if (p.action) return api_(p, null);
  return HtmlService.createHtmlOutput('OK'); // atau page lama tetap jalan
}

function doPost(e) {
  const body = JSON.parse(e.postData.contents);
  return api_(body, body);
}

function api_(p) {
  if (p.token !== ADMIN_TOKEN) return json_({ ok: false, error: 'unauthorized' });
  const routes = {
    getQueue:  () => getQueueData(),      // fungsi lama lo
    callNext:  () => callNext(p.service), // fungsi lama lo
    resetDay:  () => resetQueue()         // fungsi lama lo
  };
  if (!routes[p.action]) return json_({ ok: false, error: 'unknown action' });
  try { return json_({ ok: true, data: routes[p.action]() }); }
  catch (err) { return json_({ ok: false, error: String(err) }); }
}

const json_ = o => ContentService.createTextOutput(JSON.stringify(o))
  .setMimeType(ContentService.MimeType.JSON);