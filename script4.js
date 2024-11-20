document.addEventListener("DOMContentLoaded", () => {
    const blogContainer = document.getElementById("blog-posts");
    const spinner = document.getElementById("spinner");

    let isLoading = false; // Prevent multiple simultaneous fetches
    let currentPage = 1;   // Simulated page tracking

    // Simulate fetching data from an API
    const fetchBlogPosts = async (page) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newPosts = [
                    {
                        title: `Blog Post ${page * 2 - 1}`,
                        date: "21 Nov, 2024",
                        content: "Sample content for the blog post...",
                        category: "Development",
                        comments: 5,
                        image: "https://via.placeholder.com/600x300",
                    },
                    {
                        title: `Blog Post ${page * 2}`,
                        date: "20 Nov, 2024",
                        content: "Another sample content for the blog post...",
                        category: "Project",
                        comments: 8,
                        image: "https://via.placeholder.com/600x300",
                    },
                ];
                resolve(newPosts);
            }, 1500); // Simulate network delay
        });
    };

    // Render fetched blog posts
    const renderPosts = (posts) => {
        posts.forEach((post) => {
            const postHTML = `
                <div class="card mb-4">
                    <img src="${post.image}" class="card-img-top" alt="${post.title}">
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="text-muted">${post.date}</p>
                        <p class="card-text">${post.content}</p>
                        <a href="#" class="btn btn-link">Read more →</a>
                        <div class="d-flex justify-content-between mt-3">
                            <span class="badge bg-primary">${post.category}</span>
                            <span class="text-muted">${post.comments} Comments</span>
                        </div>
                    </div>
                </div>
            `;
            blogContainer.insertAdjacentHTML("beforeend", postHTML);
        });
    };

    // Load more posts when user scrolls near the bottom
    const handleScroll = async () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        // Trigger when near the bottom
        if (scrollTop + clientHeight >= scrollHeight - 50 && !isLoading) {
            isLoading = true;
            spinner.classList.remove("d-none"); // Show loading spinner

            // Fetch and render new posts
            const newPosts = await fetchBlogPosts(++currentPage);
            renderPosts(newPosts);

            spinner.classList.add("d-none"); // Hide spinner
            isLoading = false;
        }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);
});
