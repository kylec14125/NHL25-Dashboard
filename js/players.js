// players.js

document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('csvFileInput');
  const uploadButton = document.getElementById('uploadButton');
  const tableBody = document.querySelector('#playersTable tbody');

  // Load PapaParse from CDN (optional)
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.2/papaparse.min.js';
  document.head.appendChild(script);

  uploadButton.addEventListener('click', () => {
    const file = fileInput.files[0];
    if (!file) {
      alert('Please select a CSV file first.');
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function(results) {
        const data = results.data;
        console.log(data); // View parsed data in console
        displayPlayerData(data);
      }
    });
  });

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

      // Highlight top performers (e.g., Points >= 10)
      if (parseInt(player['Points']) >= 10) {
        row.style.backgroundColor = '#224c61'; // Seafoam highlight for Kraken vibes
      }

      tableBody.appendChild(row);
    });
  }
});
