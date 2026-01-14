import { BareMuxConnection } from "/core/index.mjs";

async function init() {
  try {
    const connection = new BareMuxConnection("/core/worker.js");

    let wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/ws/";

    if (location.host !== "localhost:8080" && !location.host.startsWith("127.0.0.1")) {
      wispUrl = "wss://epoxy.mercurywork.shop/";
    }
    await connection.setTransport("/lib/index.mjs", [{ wisp: wispUrl }]);

    if ("serviceWorker" in navigator) {
      await navigator.serviceWorker.register("/sw.js", { scope: "/service/" });
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    return true;
  } catch (error) {
    alert("Proxy connection failed! Public Wisp servers are down. You MUST host your own server. See walkthrough.md for instructions.");
    return false;
  }
}

const initPromise = init();

async function go(url) {
  const ready = await initPromise;
  if (!ready) {
    alert("Failed to initialize proxy. Check console for errors.");
    return;
  }

  if (!url.startsWith("http")) url = "https://" + url;
  window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
}

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  let url = document.getElementById("url").value.trim();
  if (!url) return;
  if (!url.includes(".") && !url.startsWith("http")) {
    url = "https://www.google.com/search?q=" + encodeURIComponent(url);
  }
  await go(url);
});

document.querySelectorAll(".link").forEach(link => {
  link.addEventListener("click", async () => await go(link.dataset.url));
});
