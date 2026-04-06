document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnHakkimda");

  const bekle = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  btn.addEventListener("click", async () => {
    let noktaSayisi = 0;
    const interval = setInterval(() => {
      noktaSayisi = (noktaSayisi % 3) + 1;
      console.clear();
      console.log("Bekliyor" + ".".repeat(noktaSayisi));
    }, 500);

    await bekle(2000);
    clearInterval(interval);
    console.clear();
    console.log("Merhaba async");

    const res = await fetch("http://localhost:1453/hakkimda");
    const data = await res.json();
    const ul = document.createElement("ul");
    console.log(data.length);
    data.forEach((el) => {
      const li = document.createElement("li");
      li.textContent = el.id + " " + el.name + " " + el.age;
      ul.appendChild(li);
    });
    btn.appendChild(ul);
  });
});
