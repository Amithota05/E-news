document.addEventListener("DOMContentLoaded", function() {
    const apiKeys = {
        Home: '5b944f72f5574210b5efc22dffbce117', 
        business: '5b944f72f5574210b5efc22dffbce117', 
        tech: '5b944f72f5574210b5efc22dffbce117',
        sport: '5b944f72f5574210b5efc22dffbce117',
        politics: '5b944f72f5574210b5efc22dffbce117',
        entertain: '5b944f72f5574210b5efc22dffbce117',
    };

    const apiUrls = {
        Home: `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKeys.Home}`,
        business: `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${apiKeys.business}`,
        Tech : `https://newsapi.org/v2/everything?q=apple&from=2024-08-18&to=2024-08-18&sortBy=popularity&apiKey=${apiKeys.tech}`,
        sport : `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=${apiKeys.sport}`,
        politics: `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKeys.politics}`,
        entertain: `https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=${apiKeys.entertain}`,
    };

    const themeToggleBtn = document.getElementById('theme-toggle');
    const newsContainer = document.getElementById('news-container');
    const searchInput = document.getElementById('search');
    const navLinks = document.querySelectorAll('nav ul li a');
    let articles = [];

    // Function to fetch and display news based on category
    function fetchNews(category = '') {
        let fetchUrl;

        if (category === 'Home' || category === '') {
            fetchUrl = apiUrls.Home;
        } else if (category === 'Business') {
            fetchUrl = apiUrls.business;
        } else if(category === 'Technology') {
            fetchUrl = apiUrls.Tech;
        } else if(category === 'sport'){
            fetchUrl = apiUrls.sport;
        } else if(category === 'politics'){
            fetchUrl = apiUrls.politics;
        } else if(category === 'entertainment'){
            fetchUrl = apiUrls.entertain;
        }
        else {
            fetchUrl = apiUrls.Home;
        }

        fetch(fetchUrl)
            .then(response => response.json())
            .then(data => {
                articles = data.articles;
                displayNews(articles);
            })
            .catch(error => console.error('Error fetching news:', error));
    }

    // Display news articles
    function displayNews(articles) {
        newsContainer.innerHTML = ''; 
        articles.forEach(article => {
            const newsItem = document.createElement('article');
            newsItem.className = 'news-item';
            newsItem.innerHTML = `
                <img src="${article.urlToImage}" alt="News Image">
                <h2>${article.title}</h2>
                <p>${article.description}</p>
                <a href="${article.url}" target="_blank">Read more</a>
            `;
            newsContainer.appendChild(newsItem);
        });
    }

    // Search news
    searchInput.addEventListener('keyup', function(e) {
        const query = e.target.value.toLowerCase();
        const filteredArticles = articles.filter(article => 
            article.title.toLowerCase().includes(query) ||
            article.description.toLowerCase().includes(query)
        );
        displayNews(filteredArticles);
    });

    // Toggle Dark Mode
    themeToggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
    });

    // Event listeners for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            fetchNews(category);
        });
    });

    // Fetch initial general news
    fetchNews();
});
