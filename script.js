const API_KEY = "AIzaSyBPEgcyYwkmkjtozJi-kiAUj80VPXteQrk"; // ganti dengan API key kamu


document.addEventListener("DOMContentLoaded", () => {
  loadTheme();
  document.getElementById("themeToggle").addEventListener("click", toggleTheme);

  const lastSearch = localStorage.getItem("lastSearch");
  if (lastSearch) {
    document.getElementById("searchInput").value = lastSearch;
    searchVideos();
  }
});

function toggleTheme() {
  const current = document.body.getAttribute("data-theme");
  const newTheme = current === "dark" ? "light" : "dark";
  document.body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
}

function loadTheme() {
  const saved = localStorage.getItem("theme") || "light";
  document.body.setAttribute("data-theme", saved);
}

async function searchVideos() {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) return;

  localStorage.setItem("lastSearch", query);

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=9&q=${encodeURIComponent(query)}&key=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    displayVideos(data.items);
  } catch (err) {
    alert("Gagal mengambil video. Cek API Key atau koneksi internet.");
    console.error(err);
  }
}

function displayVideos(videos) {
  const container = document.getElementById("videoContainer");
  container.innerHTML = "";

  videos.forEach(video => {
    const { videoId } = video.id;
    const { title, channelTitle } = video.snippet;

    const card = document.createElement("div");
    card.className = "video-card";
    card.innerHTML = `
      <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
      <h4>${title}</h4>
      <p>${channelTitle}</p>
    `;
    container.appendChild(card);
  });
}