document.addEventListener('DOMContentLoaded', () => {
  const insightsContainer = document.getElementById('insightsContainer');
  const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR0zy1FIjBS2wfjqFjUqKOK_lmXKwcTQCDRghHipHLznFhV6aFjxrUb0Et0L950k3qHEsrqlEs72A29/pub?output=csv';

  fetch(sheetURL)
    .then(response => response.text())
    .then(csvData => {
      Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        transformHeader: header => header.trim(),
        complete: function(results) {
          const data = results.data;
          generateInsights(data);
        }
      });
    })
    .catch(error => console.error('Error fetching data:', error));

  function generateInsights(players) {
    // Insight 1: Top scorer
    const topScorer = players.reduce((max, p) => parseInt(p['Points'] || 0) > parseInt(max['Points'] || 0) ? p : max, players[0]);

    // Insight 2: Highest potential (filter for "Elite" or similar)
    const highestPotential = players.find(p => p['Potential'] && p['Potential'].toLowerCase().includes('elite')) || players[0];

    // Insight 3: Possible AHL call-up
    const possibleCallUp = players.find(p => parseInt(p['Goals'] || 0) >= 30) || players[0];

    // Insert insights into HTML
    insightsContainer.innerHTML = `
      <div class="insight">
        <strong>Top Scorer:</strong> ${topScorer['Player']} with ${topScorer['Points']} points.
      </div>
      <div class="insight">
        <strong>Highest Potential:</strong> ${highestPotential['Player']} (${highestPotential['Potential']}).
      </div>
      <div class="insight">
        <strong>AHL Call-up Watch:</strong> ${possibleCallUp['Player']} with ${possibleCallUp['Goals']} goals.
      </div>
    `;
  }
});
