document.addEventListener('DOMContentLoaded', function() {
  // Votre code JavaScript ici
});

// Définissez la valeur de i et r selon vos besoins
const i = 1;
const r = 10;

// Fonction pour lire le fichier de correspondance
async function lireCorrespondance() {
  const correspondance = {};

  const response = await fetch('../correspondance.txt');
  const content = await response.text();
  const lignes = content.split('\n');

  lignes.forEach(ligne => {
    const [codeCIS, prescription] = ligne.trim().split(';');

    // Modification pour vérifier si la ligne contient une prescription
    if (prescription) {
      // Si le code CIS est déjà dans la correspondance, ajoute la prescription
      if (codeCIS in correspondance) {
        correspondance[codeCIS].push(prescription.trim());
      } else {
        // Sinon, crée une nouvelle entrée dans la correspondance
        correspondance[codeCIS] = [prescription.trim()];
      }
    }
  });

  return correspondance;
}

// Fonction pour vérifier les correspondances dans le fichier Excel
async function verifierCorrespondances() {
  const correspondance = await lireCorrespondance();

  const response = await fetch('../resultat.xlsx');
  const data = await response.arrayBuffer();
  const workbook = XLSX.read(data, { type: 'array' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = XLSX.utils.sheet_to_json(sheet);

  // Liste des codes de prescription à vérifier
  const codesPrescriptionAVérifier = ['45', '70', '77', '78', '82', '83', '105', '111', '120', '121', '137', '141', '157'];

  // Noms des patients correspondants par catégorie
  let nomsCorrespondantsC = '';
  let nomsCorrespondantsCa = '';
  let nomsCorrespondantsP = '';
  let nomsCorrespondantsA = '';

  // Vérification des correspondances
  jsonData.forEach(patient => {
    for (let i = 1; i <= 10; i++) {
      const codeCIS = patient[`Code${i}`];

      // Vérifier si le codeCIS est présent dans la correspondance et a des prescriptions associées
      if (codeCIS && correspondance[codeCIS]) {
        const prescriptionsPatient = correspondance[codeCIS];

        // Vérifier si une des prescriptions du patient correspond à celles à vérifier
        if (prescriptionsPatient.some(p => codesPrescriptionAVérifier.includes(p))) {
          const nomPatient = patient['Administré.e'] +" "+patient['Nom'] +" "+patient['Prénom'];

          // Classification du patient en fonction de la prescription
          if (['45','77', '78','83', '121'].some(p => prescriptionsPatient.includes(p))) {
            nomsCorrespondantsC += `${nomPatient}<br>`;
          } else if (['82','120','137'].some(p => prescriptionsPatient.includes(p))) {
            nomsCorrespondantsCa += `${nomPatient}<br>`;
          } else if (['105', '111', '141'].some(p => prescriptionsPatient.includes(p))) {
            nomsCorrespondantsP += `${nomPatient}<br>`;
          } else if (['70', '157'].some(p => prescriptionsPatient.includes(p))) {
            nomsCorrespondantsA += `${nomPatient}<br>`;
          }
        }
      }
    }
  });

  // Affichage des noms des patients correspondants dans les divs correspondantes
  document.getElementById('nomsDesPatientsC').innerHTML = nomsCorrespondantsC;
  document.getElementById('nomsDesPatientsCa').innerHTML = nomsCorrespondantsCa;
  document.getElementById('nomsDesPatientsP').innerHTML = nomsCorrespondantsP;
  document.getElementById('nomsDesPatientsA').innerHTML = nomsCorrespondantsA;

  // Vérification des correspondances (votre code existant)

// Catégories de problèmes de santé
console.log("Noms des patients C : ", nomsCorrespondantsC);
console.log("Noms des patients Ca : ", nomsCorrespondantsCa);
console.log("Noms des patients P : ", nomsCorrespondantsP);
console.log("Noms des patients A : ", nomsCorrespondantsA);

// ... (votre code existant)

// Catégories de problèmes de santé
const categories = {
  'Problèmes Cardiaques': nomsCorrespondantsC,
  'Problèmes Cancéreux': nomsCorrespondantsCa,
  'Problèmes Psychiatriques': nomsCorrespondantsP,
  'Problèmes Addictifs': nomsCorrespondantsA,
};

// Trier les catégories par nombre de patients
const sortedCategories = Object.entries(categories)
  .filter(([_, noms]) => noms && noms.trim() !== '') // Supprime les catégories vides
  .sort((a, b) => b[1].split('<br>').length - a[1].split('<br>').length);

// Afficher les catégories triées dans le HTML
const categoriesContainer = document.getElementById('categoriesContainer');
sortedCategories.forEach(([categorie, noms]) => {
  const categorieId = categorie.replace(/ /g, '');
  const div = document.createElement('div');
  div.id = categorieId;
  if (noms) {
    div.innerHTML = `<h2>${categorie}</h2>${noms}`;
  } else {
    div.innerHTML = `<h2>${categorie}</h2>Aucun patient dans cette catégorie`;
  }
  categoriesContainer.appendChild(div);
});

// Classement des problèmes par nombre de patients
const classementProblemes = sortedCategories.map(([categorie, noms]) => ({
  categorie,
  nombrePatients: noms.split('<br>').length,
}));

// Trier le classement des problèmes par nombre de patients (ordre décroissant)
classementProblemes.sort((a, b) => b.nombrePatients - a.nombrePatients);

// Afficher le classement dans le HTML
const classementContainer = document.getElementById('classementContainer');
classementProblemes.forEach((probleme, index) => {
  const div = document.createElement('div');
  div.innerHTML = `${index + 1}. ${probleme.categorie} - ${probleme.nombrePatients} patients`;
  classementContainer.appendChild(div);
});


}

// Appel de la fonction principale
verifierCorrespondances();
