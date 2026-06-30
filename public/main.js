async function loadData() {
  const res = await fetch("/data");
  const data = await res.json();

  document.getElementById("output").textContent =
    JSON.stringify(data, null, 2);
}

async function addData(firstName, lastName, location) {
  await fetch("/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      location: location,
      image: "./uploads/a.png"
    })
  });

  // loadData();
}