const editor = document.getElementById('editor');

/* ===== Formatting ===== */
function wrapText(symbol){
  const s = editor.selectionStart;
  const e = editor.selectionEnd;
  if(s === e) return;
  const t = editor.value;
  editor.value = t.slice(0,s) + symbol + t.slice(s,e) + symbol + t.slice(e);
  editor.focus();
}

function makeList(){
  const s = editor.selectionStart;
  const e = editor.selectionEnd;
  const t = editor.value.substring(s,e) || '';
  const list = t.split('\n').map(l => '• ' + l).join('\n');
  editor.setRangeText(list, s, e, 'end');
  editor.focus();
}

function clearText(){
  if(confirm('Clear message?')) editor.value = '';
}

/* ===== Templates ===== */
function insertTemplate(type){
  let msg = '';
  if(type === 'pay'){
    msg = "*Payment Reminder*\nInvoice: _INV-001_\nAmount Due: *₹5,000*\n\nPlease complete payment. Thank you 🙏";
  }
  if(type === 'balance'){
    msg = "*Account Summary*\nTotal: *₹12,000*\nPaid: _₹7,000_\n*Balance: ₹5,000*";
  }
  editor.value += (editor.value ? "\n\n" : "") + msg;
  editor.focus();
}

/* ===== Emoji ===== */
document.querySelectorAll('.emoji').forEach(e=>{
  e.onclick = ()=>{
    const s = editor.selectionStart;
    const e2 = editor.selectionEnd;
    editor.setRangeText(e.innerText, s, e2, 'end');
    editor.focus();
  };
});

/* ===== Clipboard ===== */
async function copyToClipboard(){
  if(!editor.value) return;
  await navigator.clipboard.writeText(editor.value);
  alert("Copied! Paste into WhatsApp.");
}

function copyWidget(){
  const code = `<iframe src="${location.href}" width="100%" height="600" style="border:0;border-radius:12px"></iframe>`;
  navigator.clipboard.writeText(code);
  alert("Widget code copied!");
}
