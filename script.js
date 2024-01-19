// Function to fetch word from API
// const Dictonaryword = async (word) => {
//     try {
//         const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
//         const response = await fetch(apiUrl);

//         if (!response.ok) {
//             throw new Error(`Error: ${response.statusText}`);
//         }

//         const wordData = await response.json();
//         console.log(wordData);
//         return wordData;

//     } catch (error) {
//         console.log(error);
//     }
// }

const callTopHeadlinesApi = async() => {
    try {
        const apUrl = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=7ba481f83dd14ba4a128a35a502b5218';
        const response = await fetch(apUrl);
        if(!response.ok){
            throw new Error(`Error: ${response.statusText}`);
        }
        const newsData = await response.json();
        console.log(newsData);
        return newsData;
    } catch (error) {
        
    }
}


function timeAgoFun(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now - date) / 1000);

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
    };

    for (let unit in intervals) {
        const count = Math.floor(seconds / intervals[unit]);
        if (count > 0) {
            return count === 1 ? `${count} ${unit} ago` : `${count} ${unit}s ago`;
        }
    }

    return 'Just now';
}



const getTopHeadlines = async() =>{
    const newsData = await callTopHeadlinesApi();
    if(newsData){
        const articles = newsData.articles;
        articles.forEach(article => {
            const title = article.title || "No Title";
            const description = article.description || "No Description";
            const publishTime = timeAgoFun(article.publishedAt) || "No Publish Time";
            const newsUrl = article.url;
            const imageUrl = article.urlToImage || "./images/default-image.jpg";
            const source = article.source.name || "unknown";
            createTopNewsOverviewDiv(title, description, publishTime, newsUrl, imageUrl, source);
        })
    }
}



let topNewsContainer = document.getElementsByClassName("top-news-container")[0];
function createTopNewsOverviewDiv(title,  description,  publishTime, newsUrl, imageUrl, source) {
    let topNews = document.createElement("div");
    topNews.classList.add("top-news");
    const image = new Image();
    image.src = imageUrl;

    image.onload = function () {
        // Image exists, set the background image
        topNews.style.backgroundImage = `url(${imageUrl})`;
    };

    image.onerror = function () {
        // Image does not exist, set a default background image
        console.log("Image not found. Using default image.");
        topNews.style.backgroundImage = 'url("./images/default-image.jpg")';
    };

    // Wrap the entire topNews in an anchor tag
    let newsLink = document.createElement("a");
    newsLink.href = newsUrl;
    newsLink.appendChild(topNews);

    let topNewsDataContainer = document.createElement("div");
    topNewsDataContainer.classList.add("top-news-data-container");

    let topNewsTitle = document.createElement("h1");
    topNewsTitle.classList.add("top-news-title");
    topNewsTitle.innerHTML = title;

    let topNewsDescription = document.createElement("p");
    topNewsDescription.classList.add("top-news-description");
    topNewsDescription.innerHTML = description;

    let publisherDetailsDiv = document.createElement("div");
    publisherDetailsDiv.classList.add("publisher-details-div");

    let sourceDiv = document.createElement("p");
    sourceDiv.classList.add("top-news-publisher-name");
    sourceDiv.innerHTML = source;

    let publishTimeDiv = document.createElement("p");
    publishTimeDiv.classList.add("top-news-publish-time");
    publishTimeDiv.innerHTML = publishTime;

    publisherDetailsDiv.appendChild(sourceDiv);
    publisherDetailsDiv.appendChild(publishTimeDiv);

    topNewsDataContainer.appendChild(publisherDetailsDiv);
    topNewsDataContainer.appendChild(topNewsTitle);
    topNewsDataContainer.appendChild(topNewsDescription);
   

    topNews.appendChild(topNewsDataContainer);

    // Append the wrapped topNews (inside the anchor tag) to topNewsContainer
    topNewsContainer.appendChild(newsLink);

    return topNews;
}

// Example usage:

// Append the created top-news element to topNewsContainer
topNewsContainer.appendChild(getTopHeadlines());

