document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnHakkimda");
  const overlay = document.getElementById("overlay");
  const list = document.getElementById("userList");
  const btnGit = document.getElementById("btnGit");

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

  async function loadUsers() {
    overlay.style.display = "flex"; // göster
    let count = 0;

    const res = await fetch("http://localhost:1453/users");
    const data = await res.json();

    list.innerHTML = "";
    data.forEach((user) => {
      count++;
      const li = document.createElement("li");
      li.textContent = count + "- " + user.name;
      list.appendChild(li);
    });

    const h1 = document.getElementsByTagName("h1")[0];
    h1.textContent = `Kullanıcılar: ${data.length} Kişi Listede Var!`;
    overlay.style.display = "none"; // gizle
  }

  btnGit.addEventListener("click", async () => {
    const gitContainer = document.getElementsByClassName("git-container")[0];
    gitContainer.innerHTML = ""; // ← temizle
    overlay.style.display = "flex"; // göster

    try {
      const res = await fetch("http://localhost:1453/git-users");
      if (!res.ok) throw new Error("API hata döndü: " + res.status);
      const data = await res.json();

      data.forEach((d) => {
        const div = document.createElement("div");
        const div2 = document.createElement("div");
        const div3 = document.createElement("div");
        const p = document.createElement("p");
        const img = document.createElement("img");
        const h3 = document.createElement("h3");
        const h6 = document.createElement("h6");

        h3.textContent = d.id + " | " + d.login.toString().toUpperCase();
        h6.textContent = d.type;
        img.src = d.avatar_url;
        p.textContent =
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id perspiciatis doloribus praesentium debitis nostrum obcaecati tempora quos in ipsa unde? Repudiandae perspiciatis explicabo eveniet, rem qui earum. Nemo aliquam sit velit minus! Aliquam laudantium distinctio quod est sunt assumenda animi exercitationem reprehenderit vero. Dignissimos sapiente perspiciatis natus eveniet, tempora officia!";

        h3.style.cssText =
          "text-align: center; border-bottom: 1px solid black; padding: 3px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;";

        h6.style.cssText = "padding: 3px; text-align: center";
        div3.style.cssText =
          "flex-grow: 1; font-size: 12px; border-left: 3px solid crimson; padding: 5px; border-bottom-left-radius: 10px; border-top-left-radius: 10px; ";
        img.style.cssText =
          "display:block; width: 50px; height: 50px; border-radius: 50%; flex-shrink: 0;";
        div2.style.cssText =
          "display: flex; flex-direction: column; flex-shrink: 0; width: 150px; overflow: hidden; white-space: nowrap;";

        div2.appendChild(h3);
        div2.appendChild(h6);
        div3.appendChild(p);
        div.appendChild(img);
        div.appendChild(div2);
        div.appendChild(div3);
        div.classList.add("git-user");
        gitContainer.appendChild(div);
      });
    } catch (error) {
      console.error("HATA YAKALANDI:", error);
    } finally {
      overlay.style.display = "none"; // gizle
    }
  });

  loadUsers();
});
