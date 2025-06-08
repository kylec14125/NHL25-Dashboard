document.getElementById('loadBtn').addEventListener('click', () => {
  const fileInput = document.getElementById('dataFile');
  const file = fileInput.files[0];
  if (!file) {
    return alert('Please select a JSON file of players.');
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const players = JSON.parse(e.target.result);
      renderPlayerTable(players);
    } catch (err) {
      alert('Error parsing JSON: ' + err.message);
    }
  };
  reader.readAsText(file);
});

function renderPlayerTable(players) {
  const tbody = document.querySelector('#playerTable tbody');
  tbody.innerHTML = '';

  players.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.name}</td>
      <td>${p.position}</td>
      <td>${p.age}</td>
      <td>${p.overall}</td>
      <td>${p.contract}</td>
      <td>${p.potential}</td>
      <td>${projectSalary(p, p.position === 'G')}</td>
    `;
    tbody.appendChild(tr);
  });
}

function projectSalary(player, isGoalie) {
  let val;
  if (isGoalie) {
    val = 3 + 0.02 * (player.savePct * 100) - 0.1 * player.gaa;
  } else {
    val = 0.13 * player.points;
  }
  if (player.age < 26) val *= 1.1;
  if (player.age > 32) val *= 0.9;
  if (/(Elite|Franchise)/.test(player.potential)) val *= 1.1;
  return `$${val.toFixed(2)}M`;
}
