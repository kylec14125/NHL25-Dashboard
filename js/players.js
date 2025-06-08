// players.js

document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#playersTable tbody');

  // Fetch the live CSV data from your Google Sheets
  const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR0zy1FIjBS2wfjqFjUqKOK_lmXKwcTQCDRghHipHLznFhV6aFjxrUb0Et0L950k3qHEsrqlEs72A29/pub?output=csv';

  // Load PapaParse from CDN
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
          complete: function(results) {
            const data = results.data;
            console.log(data); // View parsed data
            displayPlayerData(data);
          }
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  function displayPlayerData(players) {
    tableBody.innerHTML = ''; // Clear existing data
    players.forEach(player => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${player['Player Name']}</td>
        <td>${player['Age']}</td>
        <td>${player['Position']}</td>
        <td>${player['Overall']}</td>
        <td>${player['Potential']}</td>
        <td>${player['Goals']}</td>
        <td>${player['Assists']}</td>
        <td>${player['Points']}</td>
      `;

      // Highlight top performers (Points ≥ 10)
      if (parseInt(player['Points']) >= 10) {
        row.style.backgroundColor = '#224c61'; // Seafoam highlight
      }

      tableBody.appendChild(row);
    });
  }
});
