document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input[type="range"]');
    inputs.forEach(input => {
        input.addEventListener('input', updateValues);
    });
});

function updateValues() {
    // Récupérer les valeurs des heures de travail pour chaque production
    const englandTextileHours = parseInt(document.getElementById('countryA-textile').value);
    const englandWineHours = parseInt(document.getElementById('countryA-wine').value);
    const portugalTextileHours = parseInt(document.getElementById('countryB-textile').value);
    const portugalWineHours = parseInt(document.getElementById('countryB-wine').value);

    // Vérifier que le total des heures ne dépasse pas 70 heures pour chaque pays
    const englandTotalHours = englandTextileHours + englandWineHours;
    const portugalTotalHours = portugalTextileHours + portugalWineHours;

    // Mise à jour de l'affichage des heures totales
    document.getElementById('england-total-hours').innerText = englandTotalHours;
    document.getElementById('portugal-total-hours').innerText = portugalTotalHours;

    // Afficher les valeurs actuelles des heures de travail
    document.getElementById('countryA-textile-value').innerText = englandTextileHours;
    document.getElementById('countryA-wine-value').innerText = englandWineHours;
    document.getElementById('countryB-textile-value').innerText = portugalTextileHours;
    document.getElementById('countryB-wine-value').innerText = portugalWineHours;

    // Calculer la production en fonction des heures de travail et des ratios fournis
    const englandTextileProduction = (englandTextileHours / 70) * 2; // Angleterre produit 2 unités de tissus en 70h
    const englandWineProduction = (englandWineHours / 70) * 1; // Angleterre produit 1 unité de vin en 70h

    const portugalTextileProduction = (portugalTextileHours / 70) * 1; // Portugal produit 1 unité de tissus en 70h
    const portugalWineProduction = (portugalWineHours / 70) * 2; // Portugal produit 2 unités de vin en 70h

    // Mettre à jour l'affichage de la production
    document.getElementById('england-textile-output').innerText = englandTextileProduction.toFixed(2);
    document.getElementById('england-wine-output').innerText = englandWineProduction.toFixed(2);
    document.getElementById('portugal-textile-output').innerText = portugalTextileProduction.toFixed(2);
    document.getElementById('portugal-wine-output').innerText = portugalWineProduction.toFixed(2);

    // Assurez-vous que les heures ne dépassent pas 70 pour chaque pays
    if (englandTotalHours > 70 || portugalTotalHours > 70) {
        alert('Le total des heures de travail pour chaque pays ne doit pas dépasser 70 heures.');
    }

    // Dessiner ou mettre à jour le canvas en fonction des nouvelles valeurs
    drawSimulation(englandTextileProduction, englandWineProduction, portugalTextileProduction, portugalWineProduction);
}

function drawSimulation(engTextile, engWine, portTextile, portWine) {
    const canvas = document.getElementById('simulationCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner des barres simples représentant la production
    ctx.fillStyle = 'blue';
    ctx.fillRect(50, canvas.height - engTextile * 50, 50, engTextile * 50); // Angleterre Tissus
    ctx.fillStyle = 'green';
    ctx.fillRect(150, canvas.height - engWine * 50, 50, engWine * 50); // Angleterre Vin

    ctx.fillStyle = 'red';
    ctx.fillRect(250, canvas.height - portTextile * 50, 50, portTextile * 50); // Portugal Tissus
    ctx.fillStyle = 'yellow';
    ctx.fillRect(350, canvas.height - portWine * 50, 50, portWine * 50); // Portugal Vin
}
