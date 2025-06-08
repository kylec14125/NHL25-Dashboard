document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#playersTable tbody');
  const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR0zy1FIjBS2wfjqFjUqKOK_lmXKwcTQCDRghHipHLznFhV6aFjxrUb0Et0L950k3qHEsrqlEs72A29/pub?output=csv';

  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.2/papaparse.min.js';
  document.head.appendChild(script);

  script.onload = () => {
    fetch(sheetURL)
      .then(response => response.text())
      .then(csvData => {
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          transformHeader: header => header.trim(),
          complete: function(results) {
            const data = results.data;
            displayPlayerData(data);
          }
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  function displayPlayerData(players) {
    tableBody.innerHTML = ''; // Clear existing data
    players.forEach(player => {
      const cleanPlayer = {};
      Object.keys(player).forEach(key => {
        cleanPlayer[key.trim()] = player[key];
      });

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${cleanPlayer['Player Name']}</td>
        <td>${cleanPlayer['Age']}</td>
        <td>${cleanPlayer['Play Type']}</td>
        <td>${cleanPlayer['Position']}</td>
        <td>${cleanPlayer['Overall']}</td>
        <td>${cleanPlayer['Potential']}</td>
        <td>${cleanPlayer['Goals']}</td>
        <td>${cleanPlayer['Assists']}</td>
        <td>${cleanPlayer['Points']}</td>
        <td>${cleanPlayer['Plus Minus']}</td>
        <td>${cleanPlayer['Contract Amount']}</td>
        <td>${cleanPlayer['Contact Years']}</td>
      `;
      tableBody.appendChild(row);
    });

    // Initialize DataTable for sorting
    if ($.fn.DataTable.isDataTable('#playersTable')) {
      $('#playersTable').DataTable().destroy();
    }
    $('#playersTable').DataTable({
      paging: false,
      info: false,
      searching: false
    });
  }
});
