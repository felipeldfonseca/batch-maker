// Recipients data
const recipients = {
  'brasil-bitcoin': {
    name: 'BRASIL BITCOIN SERVICOS DIGITAIS LTDA',
    cnpj: '29.519.837/0001-23',
    pixKey: '66499dab-b165-4096-aaf8-18935d6167bc'
  },
  'caldeira': {
    name: 'CB TECNOLOGIA E INTERMEDIACAO LTDA',
    cnpj: '31.432.059/0001-82',
    pixKey: 'e12e73a0-d47b-4674-a3c9-8accec5c4f27'
  },
  'securitas': {
    name: 'SECURITAS DIGITAL ASSETS LTDA',
    cnpj: '55.200.012/0001-51',
    pixKey: 'd9260002-6da3-47d8-959e-86a136e7a8ca'
  }
};

// DOM elements
const recipientSelect = document.getElementById('recipient');
const amountInput = document.getElementById('amount');
const pixKeyInput = document.getElementById('pix-key');
const editPixBtn = document.getElementById('edit-pix');
const generateBtn = document.getElementById('generate-csv');
const infoBox = document.getElementById('info');
const transactionCount = document.getElementById('transaction-count');
const recipientName = document.getElementById('recipient-name');
const totalAmount = document.getElementById('total-amount');
const successPopup = document.getElementById('success-popup');
const successMessage = document.getElementById('success-message');
const closePopupBtn = document.getElementById('close-popup');

// Brazilian number formatting functions
function formatBrazilianNumber(value) {
  if (!value) return '';
  const number = parseFloat(value.toString().replace(/\./g, '').replace(',', '.'));
  if (isNaN(number)) return '';
  return number.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function parseBrazilianNumber(value) {
  if (!value) return 0;
  return parseFloat(value.toString().replace(/\./g, '').replace(',', '.'));
}

// Event listeners
recipientSelect.addEventListener('change', handleRecipientChange);
amountInput.addEventListener('input', handleAmountChange);
amountInput.addEventListener('blur', formatAmountDisplay);
editPixBtn.addEventListener('click', handleEditPix);
generateBtn.addEventListener('click', generateCSV);
closePopupBtn.addEventListener('click', closeSuccessPopup);

function handleRecipientChange() {
  const selectedRecipient = recipients[recipientSelect.value];
  
  if (selectedRecipient) {
    pixKeyInput.value = selectedRecipient.pixKey;
    pixKeyInput.setAttribute('readonly', true);
    editPixBtn.textContent = 'Editar';
  } else {
    pixKeyInput.value = '';
  }
  
  updateGenerateButton();
  updateInfo();
}

function handleAmountChange() {
  updateGenerateButton();
  updateInfo();
}

function formatAmountDisplay() {
  const value = amountInput.value;
  if (value) {
    const formatted = formatBrazilianNumber(value);
    if (formatted) {
      amountInput.value = formatted;
    }
  }
}

function handleEditPix() {
  if (pixKeyInput.hasAttribute('readonly')) {
    pixKeyInput.removeAttribute('readonly');
    pixKeyInput.focus();
    editPixBtn.textContent = 'Confirmar';
  } else {
    pixKeyInput.setAttribute('readonly', true);
    editPixBtn.textContent = 'Editar';
  }
}

function updateGenerateButton() {
  const hasRecipient = recipientSelect.value !== '';
  const amount = parseBrazilianNumber(amountInput.value);
  const hasAmount = amount >= 15000;
  const hasPixKey = pixKeyInput.value.trim() !== '';
  
  generateBtn.disabled = !(hasRecipient && hasAmount && hasPixKey);
}

function updateInfo() {
  const amount = parseBrazilianNumber(amountInput.value);
  const selectedRecipientKey = recipientSelect.value;
  const selectedRecipient = recipients[selectedRecipientKey];
  
  if (amount >= 15000 && selectedRecipient) {
    const batches = calculateBatches(amount);
    
    recipientName.textContent = selectedRecipient.name;
    transactionCount.textContent = batches.length;
    totalAmount.textContent = formatBrazilianNumber(amount);
    infoBox.style.display = 'block';
  } else {
    infoBox.style.display = 'none';
  }
}

function calculateBatches(totalAmount) {
  const batches = [];
  let remainingAmount = totalAmount;
  let currentBatchAmount = 14999;
  
  while (remainingAmount > 0) {
    const batchAmount = Math.min(currentBatchAmount, remainingAmount);
    batches.push(batchAmount);
    remainingAmount -= batchAmount;
    currentBatchAmount -= 1;
    
    // Safety check to prevent infinite loop
    if (currentBatchAmount < 1) {
      break;
    }
  }
  
  return batches;
}

function generateCSV() {
  const selectedRecipientKey = recipientSelect.value;
  const selectedRecipient = recipients[selectedRecipientKey];
  const totalAmount = parseBrazilianNumber(amountInput.value);
  const pixKey = pixKeyInput.value.trim();
  
  if (!selectedRecipient || !totalAmount || !pixKey) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }
  
  if (totalAmount < 15000) {
    alert('O valor deve ser maior ou igual a R$ 15.000,00 para gerar lotes.');
    return;
  }
  
  const batches = calculateBatches(totalAmount);
  
  // Generate CSV content
  let csvContent = '';
  
  batches.forEach(batchAmount => {
    const row = [
      `"${selectedRecipient.name}"`,
      `"${selectedRecipient.cnpj}"`,
      `"${pixKey}"`,
      `"${batchAmount.toFixed(2).replace('.', ',')}"`
    ].join(',');
    
    csvContent += row + '\n';
  });
  
  // Download CSV
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `lote_${selectedRecipientKey}_${Date.now()}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Show success popup
  showSuccessPopup(batches.length, totalAmount);
}

function showSuccessPopup(batchCount, amount) {
  successMessage.textContent = `${batchCount} transações totalizando ${formatBrazilianNumber(amount)}`;
  successPopup.style.display = 'flex';
  
  // Auto close after 10 seconds
  setTimeout(() => {
    closeSuccessPopup();
  }, 10000);
}

function closeSuccessPopup() {
  successPopup.style.display = 'none';
}