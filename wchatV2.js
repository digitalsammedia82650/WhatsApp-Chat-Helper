const editor = document.getElementById('editor');
const preview = document.getElementById('preview');

/* ================= PREVIEW ================= */
editor.addEventListener('input', updatePreview);

function updatePreview(){
  let text = editor.value;
  if(!text){
    preview.innerHTML = "<span style='color:#555'>Preview will appear here…</span>";
    return;
  }

  let formatted = text
    .replace(/```([\s\S]*?)```/g,'<code>$1</code>')
    .replace(/\*(.*?)\*/g,'<b>$1</b>')
    .replace(/_(.*?)_/g,'<i>$1</i>')
    .replace(/~(.*?)~/g,'<del>$1</del>')
    .replace(/\n/g,'<br>');

  preview.innerHTML = formatted;
}

/* ================= FORMATTERS ================= */
function wrapText(symbol){
  const s = editor.selectionStart;
  const e = editor.selectionEnd;
  if(s === e) return;
  editor.setRangeText(symbol + editor.value.substring(s,e) + symbol, s, e, 'end');
  updatePreview();
  editor.focus();
}

function makeList(){
  const s = editor.selectionStart;
  const e = editor.selectionEnd;
  const text = editor.value.substring(s,e) || '';
  const list = text.split('\n').map(l=>'• '+l).join('\n');
  editor.setRangeText(list,s,e,'end');
  updatePreview();
}

/* ================= TEMPLATES ================= */
function insertTemplate(type){
  const t = {
    payment:`*Payment Reminder*\nInvoice: _INV-001_\nAmount: *₹5,000*\nStatus: ~Pending~\n\nPlease complete payment 🙏`,
    balance:`*Balance Update*\nTotal: *₹10,000*\nPaid: _₹4,000_\n*Due: ₹6,000*`
  };
  editor.value += (editor.value ? "\n\n" : "") + (t[type] || '');
  updatePreview();
}

/* ================= EMOJIS ================= */
document.querySelectorAll('.emoji').forEach(em=>{
  em.onclick = ()=>{
    const s = editor.selectionStart;
    editor.setRangeText(em.innerText, s, s, 'end');
    updatePreview();
    editor.focus();
  };
});

/* ================= ACTIONS ================= */
function clearText(){
  if(confirm("Clear message?")){
    editor.value='';
    updatePreview();
  }
}

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
