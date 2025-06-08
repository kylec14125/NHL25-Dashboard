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

  // Insight 2: Upcoming contract renewal - find highest overall among players with 1 year left
  const upcomingRenewals = players.filter(p => parseInt(p['Years'] || 0) === 1);
  const highestOverallRenewal = upcomingRenewals.reduce((max, p) => parseInt(p['Overall'] || 0) > parseInt(max['Overall'] || 0) ? p : max, upcomingRenewals[0] || {});

  // Insight 3: AHL Call-up Watch - for now, placeholder until we build AHL system
  const possibleCallUp = players.find(p => parseInt(p['Goals'] || 0) >= 30) || players[0];

  insightsContainer.innerHTML = `
    <div class="insight">
      <strong>Top Scorer:</strong> ${topScorer['Player']} with ${topScorer['Points']} points.
    </div>
    <div class="insight">
      <strong>Upcoming Contract Renewal:</strong> ${highestOverallRenewal['Player']} (Overall: ${highestOverallRenewal['Overall']}) with only 1 year left.
    </div>
    <div class="insight">
      <strong>AHL Call-up Watch:</strong> ${possibleCallUp['Player']} with ${possibleCallUp['Goals']} goals.
    </div>
  `;
}
});
