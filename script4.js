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
                        caption: `Coffee Date ${page * 2 - 1}`,
                        date: "21 Nov, 2024",
                        
                        comments: 5,
                        image: "https://i.pinimg.com/736x/69/74/7e/69747e7d984efaf943c388c1798b5384.jpg",
                    },
                    {
                        caption: `Start your day with a cup of coffee ${page * 2}`,
                        date: "20 Nov, 2024",
            
                        
                        comments: 8,
                        image: "https://i.pinimg.com/474x/3e/36/7c/3e367c3543973c5824d1d09dacc7d5d1.jpg",
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
                    <img src="${post.image}" class="card-img-top" alt="${post.caption}">
                    <div class="card-body">
                        <h5 class="card-title">${post.caption}</h5>
                        <p class="text-muted">${post.date}</p>
                        
                     
                        <div class="d-flex justify-content-between mt-3">
                            
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

    document.getElementById("createPostButton").addEventListener("click", () => {
        // Retrieve form data
        const caption = document.getElementById("postTitle").value;
        const date = document.getElementById("postDate").value;
        const imageInput = document.getElementById("postImage");
    
        let image = "https://via.placeholder.com/600x300"; // Default fallback image
        if (imageInput.files && imageInput.files[0]) {
            // If a file is selected, create an object URL
            image = URL.createObjectURL(imageInput.files[0]);
        }
    
        // Validate required fields
        if (caption && date) {
            // Create a new post object
            const newPost = {
                caption,
                image,
                date,
                comments: Math.floor(Math.random() * 10) + 1, // Randomize comment count for demo
            };
    
            // Add the new post to the blog list
            renderPost(newPost);
    
            // Clear the form and hide the modal
            document.getElementById("createPostForm").reset();
            const modal = bootstrap.Modal.getInstance(document.getElementById("createPostModal"));
            modal.hide();
        } else {
            alert("Please fill out all required fields!");
        }
    });
    
    // Function to render a post
    function renderPost(post) {
        const blogPostsContainer = document.getElementById("blog-posts");
    
        const postHTML = `
            <div class="card mb-4">
                <img src="${post.image}" class="card-img-top" alt="${post.caption}">
                <div class="card-body">
                    <h5 class="card-title">${post.caption}</h5>
                    <p class="text-muted">${post.date}</p>
                    
                    <div class="d-flex justify-content-between mt-3">
                        
                        <span class="text-muted">${post.comments} Comments</span>
                    </div>
                </div>
            </div>
        `;
    
        // Append the new post to the blog posts container
        blogPostsContainer.insertAdjacentHTML("afterbegin", postHTML);
    }
    

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);
});
