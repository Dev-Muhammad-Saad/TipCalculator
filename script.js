let activeTip = null;

const billInput   = document.getElementById('bill');
const tipInput    = document.getElementById('tip');
const peopleInput = document.getElementById('people');

const billError   = document.getElementById('bill-error');
const tipError    = document.getElementById('tip-error');
const peopleError = document.getElementById('people-error');

const tipAmountEl = document.getElementById('tip-amount');
const grandTotalEl = document.getElementById('grand-total');
const perPersonEl  = document.getElementById('per-person');

const presetBtns = document.querySelectorAll('.preset');
const resetBtn   = document.getElementById('reset');

function calculate() {
  const bill   = parseFloat(billInput.value);
  const tip    = parseFloat(tipInput.value);
  const people = parseInt(peopleInput.value);

  let valid = true;

  if (billInput.value === '' || isNaN(bill) || bill <= 0) {
    if (billInput.value !== '') {
      showError(billError, billInput, 'Enter a valid bill amount greater than 0.');
      valid = false;
    } else {
      clearError(billError, billInput);
      valid = false;
    }
  } else {
    clearError(billError, billInput);
  }

  if (tipInput.value !== '' && (isNaN(tip) || tip < 0 || tip > 100)) {
    showError(tipError, tipInput, 'Tip must be between 0 and 100.');
    valid = false;
  } else {
    clearError(tipError, tipInput);
  }

  if (peopleInput.value === '' || isNaN(people) || people < 1 || !Number.isInteger(people)) {
    showError(peopleError, peopleInput, 'Enter a whole number of at least 1.');
    valid = false;
  } else {
    clearError(peopleError, peopleInput);
  }

  if (!valid || tipInput.value === '') {
    resetDisplay();
    return;
  }

  const tipAmount  = bill * (tip / 100);
  const grandTotal = bill + tipAmount;
  const perPerson  = Math.ceil((grandTotal / people) * 100) / 100;

  tipAmountEl.textContent  = 'Rs ' + tipAmount.toFixed(2);
  grandTotalEl.textContent = 'Rs ' + grandTotal.toFixed(2);
  perPersonEl.textContent  = 'Rs ' + perPerson.toFixed(2);
}

function showError(errorEl, inputEl, message) {
  errorEl.textContent = message;
  inputEl.classList.add('has-error');
}

function clearError(errorEl, inputEl) {
  errorEl.textContent = '';
  inputEl.classList.remove('has-error');
}

function resetDisplay() {
  tipAmountEl.textContent  = 'Rs —';
  grandTotalEl.textContent = 'Rs —';
  perPersonEl.textContent  = 'Rs —';
}

presetBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    if (btn.classList.contains('active')) {
      btn.classList.remove('active');
      tipInput.value = '';
      activeTip = null;
    } else {
      presetBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      tipInput.value = btn.dataset.value;
      activeTip = btn.dataset.value;
    }
    calculate();
  });
});

tipInput.addEventListener('input', function() {
  presetBtns.forEach(function(b) { b.classList.remove('active'); });
  activeTip = null;
  calculate();
});

billInput.addEventListener('input', calculate);
peopleInput.addEventListener('input', calculate);

resetBtn.addEventListener('click', function() {
  billInput.value   = '';
  tipInput.value    = '';
  peopleInput.value = '1';
  activeTip = null;
  presetBtns.forEach(function(b) { b.classList.remove('active'); });
  clearError(billError, billInput);
  clearError(tipError, tipInput);
  clearError(peopleError, peopleInput);
  resetDisplay();
});
