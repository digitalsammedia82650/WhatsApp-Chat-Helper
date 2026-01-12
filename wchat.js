(function(){
const editor = document.getElementById('editor');


window.wrap = function(symbol) {
const start = editor.selectionStart;
const end = editor.selectionEnd;
const selected = editor.value.substring(start, end);


if (!selected) return;


const wrapped = symbol + selected + symbol;
editor.setRangeText(wrapped, start, end, 'end');
editor.focus();
};


window.makeList = function(prefix) {
const lines = editor.value.split('\n').map(l => l ? prefix + ' ' + l : l);
editor.value = lines.join('\n');
editor.focus();
};


window.insertPaymentTemplate = function() {
editor.value += '
*Payment Reminder*
Invoice No: _INV-001_
Amount Due: *₹5,000*
Due Date: _10 Jan 2026_


Please complete the payment at your convenience. Thank you. 🙏
';
editor.focus();
};


window.insertBalanceTemplate = function() {
editor.value += '
*Account Summary*
Total Amount: *₹12,000*
Paid: _₹7,000_
*Balance Due: ₹5,000*


Kindly clear the balance to continue service.
';
editor.focus();
};


window.clearText = function() {
if (confirm('Clear entire message?')) editor.value = '';
};


window.copyText = function() {
editor.select();
document.execCommand('copy');
alert('Copied! Paste into WhatsApp');
};


// Emoji drag & click
})();
