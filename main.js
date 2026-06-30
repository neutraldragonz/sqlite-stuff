async function loadData() {
  const res = await fetch("/data");
  const data = await res.json();

  document.getElementById("output").textContent =
    JSON.stringify(data, null, 2);
}

async function addData() {
  await fetch("/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      firstName: "Joe",
      lastName: "Smith",
      location: "summertech",
      image: "./uploads/a.png"
    })
  });

  loadData();
}