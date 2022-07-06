const container = document.getElementById("container");
const generateNewsButton = document.getElementById("generateNewsButton");

const fetchNews = async (start) => {
  const url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=20&_sort=id&_start=${start}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const generateNewNews = async () => {
  start = Math.floor(10000 * Math.random());
  await createNews(start);
};

const createNewsElement = async (data) => {
  const newsContainer = document.createElement("div");
  newsContainer.classList.add("newContainer");
  const header = document.createElement("h2");
  header.classList.add("newHeader");
  header.innerHTML = data.title;
  newsContainer.appendChild(header);
  if (data.summary !== "") {
    const paragraph = document.createElement("p");
    paragraph.classList.add("summary");
    paragraph.innerHTML = data.summary;
    newsContainer.appendChild(paragraph);
  }
  const aTag = document.createElement("a");
  aTag.innerText = "Click For more Info";
  aTag.href = data.url;
  newsContainer.appendChild(aTag);
  container.appendChild(newsContainer);
};

const createNews = async (start = 10) => {
  container.innerHTML = "";
  let data = await fetchNews(start);
  for (let i = 0; i < data.length; i++) {
    createNewsElement(data[i]);
  }
};

const updateContainer = async () => {
  await createNews();
};

generateNewsButton.addEventListener("click", generateNewNews);

document.addEventListener("DOMContentLoaded", updateContainer);
