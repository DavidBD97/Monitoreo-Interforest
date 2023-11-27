  document.addEventListener('DOMContentLoaded', function () {
    var selectElements = document.querySelectorAll('.select-editable');
    selectElements.forEach(function (select) {
      select.addEventListener('change', function () {
        var selectedValue = parseInt(select.options[select.selectedIndex].getAttribute('data-value'));
        var cell = select.closest('td');

        if (selectedValue === 2) {
          cell.style.backgroundColor = 'palegreen';
          select.style.backgroundColor = 'palegreen';
        } else {
          cell.style.backgroundColor = '';
          select.style.backgroundColor = '';
        }
      });
    });
  });