let realMadrid = {
  teamName: "Real Madrid",
  city: "Madrid",
  country: "Spain",
  topScorers: ["Ronaldo", "Benzema", "Hazard"],
  worldwideFansInMillions: 798,
};

let barcelona = {
  teamName: "Barcelona",
  city: "Barcelona",
  country: "Spain",
  topScorers: ["Messi", "Suarez", "Puyol"],
  worldwideFansInMillions: 738,
};

let manchesterUnited = {
  teamName: "Manchester United",
  city: "Manchester",
  country: "England",
  topScorers: ["Cantona", "Rooney", "Ronaldo"],
  worldwideFansInMillions: 755,
};

let manchesterCity = {
  teamName: "Manchester City",
  city: "Manchester",
  country: "England",
  topScorers: ["Sterling", "Aguero", "Haaland"],
  worldwideFansInMillions: 537,
};

let brazilNationalTeam = {
  teamName: "Brazil National Team",
  city: "Not applicable",
  country: "Brazil",
  topScorers: ["Ronaldinho", "Cafu", "Bebeto"],
  worldwideFansInMillions: 950,
};

let argentinaNationalTeam = {
  teamName: "Argentina national team",
  city: "Not applicable",
  country: "Argentina",
  topScorers: ["Messi", "Batistuta", "Maradona"],
  worldwideFansInMillions: 888,
};

let atleticoMadrid = {
  teamName: "Atletico Madrid",
  city: "Madrid",
  country: "Spain",
  topScorers: ["Aragonés", "Griezmann", "Torez"],
  worldwideFansInMillions: 400,
};

let realMadridColor = {
  color: {
    home: "White",
    away: "Purple",
  },
};

let barcelonaColor = {
  color: {
    home: "Red",
    away: "Pink",
  },
};

let output = document.createElement("div");
document.body.appendChild(output);

function showTeams(title, data) {
  let heading = document.createElement("h2");
  heading.textContent = title;
  output.appendChild(heading);

  data.docs.forEach((doc) => {
    let team = doc.data();
    let p = document.createElement("p");
    p.textContent =
      team.teamName +
      " | " +
      team.city +
      ", " +
      team.country +
      " | Fans: " +
      team.worldwideFansInMillions +
      " million" +
      " | Top scorers: " +
      team.topScorers.join(", ");
    output.appendChild(p);
  });
}

function showMessage(message) {
  let p = document.createElement("p");
  p.textContent = message;
  output.appendChild(p);
}

db.collection("teams")
  .add(realMadrid)
  .then((doc) => {
    db.collection("teams").doc(doc.id).update({
      teamName: "Real Madrid FC",
      worldwideFansInMillions: 811,
      topScorers: firebase.firestore.FieldValue.arrayRemove("Hazard"),
    });

    db.collection("teams").doc(doc.id).update({
      topScorers: firebase.firestore.FieldValue.arrayUnion("Crispo"),
    });

    db.collection("teams").doc(doc.id).update(realMadridColor);

    showMessage("Real Madrid updated.");
  });

db.collection("teams")
  .add(barcelona)
  .then((doc) => {
    db.collection("teams").doc(doc.id).update({
      teamName: "FC Barcelona",
      worldwideFansInMillions: 747,
      topScorers: firebase.firestore.FieldValue.arrayRemove("Puyol"),
    });

    db.collection("teams").doc(doc.id).update({
      topScorers: firebase.firestore.FieldValue.arrayUnion("Deco"),
    });

    db.collection("teams").doc(doc.id).update(barcelonaColor);

    showMessage("Barcelona updated.");
  });

db.collection("teams").add(manchesterUnited);
db.collection("teams").add(manchesterCity);
db.collection("teams").add(brazilNationalTeam);
db.collection("teams").add(argentinaNationalTeam);
db.collection("teams").add(atleticoMadrid);

db.collection("teams")
  .where("country", "==", "Spain")
  .get()
  .then((data) => {
    showTeams("1. Teams in Spain", data);
  });

db.collection("teams")
  .where("city", "==", "Madrid")
  .where("country", "==", "Spain")
  .get()
  .then((data) => {
    showTeams("2. Teams in Madrid, Spain", data);
  });

db.collection("teams")
  .where("city", "==", "Not applicable")
  .get()
  .then((data) => {
    showTeams("3. National teams", data);
  });

db.collection("teams")
  .where("country", "!=", "Spain")
  .get()
  .then((data) => {
    showTeams("4. Teams not in Spain", data);
  });

db.collection("teams")
  .where("country", "not-in", ["Spain", "England"])
  .get()
  .then((data) => {
    showTeams("5. Teams not in Spain or England", data);
  });

db.collection("teams")
  .where("country", "==", "Spain")
  .where("worldwideFansInMillions", ">", 700)
  .get()
  .then((data) => {
    showTeams("6. Teams in Spain with more than 700M fans", data);
  });

db.collection("teams")
  .where("worldwideFansInMillions", ">=", 500)
  .where("worldwideFansInMillions", "<=", 600)
  .get()
  .then((data) => {
    showTeams("7. Teams with fans between 500M and 600M", data);
  });

db.collection("teams")
  .where("topScorers", "array-contains", "Ronaldo")
  .get()
  .then((data) => {
    showTeams("8. Teams where Ronaldo is a top scorer", data);
  });

db.collection("teams")
  .where("topScorers", "array-contains-any", ["Ronaldo", "Maradona", "Messi"])
  .get()
  .then((data) => {
    showTeams("9. Teams where Ronaldo, Maradona, or Messi is a top scorer", data);
  });
