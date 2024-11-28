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
                        user:'Johanna',
                        caption: `Coffee Date ${page * 2 - 1}`,
                        date: "21 Nov, 2024",
                        comments: 5,
                        image: "https://i.pinimg.com/736x/69/74/7e/69747e7d984efaf943c388c1798b5384.jpg",
                    },
                    {
                        user:'Gerard',
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
                         <h4>${post.user}</h4> <!-- Display user here -->
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
        const caption = document.getElementById("postTitle").value;
        const imageInput = document.getElementById("postImage");
        let image = "https://via.placeholder.com/600x300"; // Default fallback image
    
        if (imageInput.files && imageInput.files[0]) {
            image = URL.createObjectURL(imageInput.files[0]);
        }
    
        // Validate required fields
        if (caption) {
            let currentUser = "Anonymous"; // Default to "Anonymous"
    
            // Search for a key in localStorage that starts with "user"
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.startsWith("user")) {
                    const storedData = localStorage.getItem(key); // Retrieve the data for the matched key
                    if (storedData) {
                        try {
                            const userData = JSON.parse(storedData); // Parse the stored JSON string
                            currentUser = userData.name || "Anonymous"; // Use the name, fallback to "Anonymous"
                            break; // Stop searching once a match is found
                        } catch (error) {
                            console.error("Error parsing user data from localStorage:", error);
                        }
                    }
                }
            }
    
            // Create a new post object
            const newPost = {
                user: currentUser, // Display the name of the user
                caption,
                image,
                date: formatTimeSince(new Date()), // Use auto-generated timestamp
                comments: Math.floor(Math.random() * 10) + 1, // Randomize comment count
            };
    
            // Save the post to localStorage
            savePost(newPost);
    
            // Render the post in the blog container
            renderPost(newPost);
    
            // Show notification
            showNotification("Posting Success");
    
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
        const postHTML = `
            <div class="card mb-4">
                <img src="${post.image}" class="card-img-top" alt="${post.caption}">
                <div class="card-body">
                     <i>${post.user}</i>
                    <h5 class="card-title">${post.caption}</h5>
                    <p class="text-muted">${post.date}</p>
                    <div class="d-flex justify-content-between mt-3">
                        <span class="text-muted">${post.comments} Comments</span>
                    </div>
                </div>
            </div>
        `;
        blogContainer.insertAdjacentHTML("afterbegin", postHTML);
    }

    const loadPosts = () => {
        const posts = JSON.parse(localStorage.getItem("posts")) || [];
        posts.forEach(renderPost);
    };

    // Save a post to localStorage
    const savePost = (post) => {
        const posts = JSON.parse(localStorage.getItem("posts")) || [];
        posts.unshift(post); // Add the new post to the beginning of the array
        localStorage.setItem("posts", JSON.stringify(posts));
    };

    // Function to display notification
    function showNotification(message) {
        alert(message);
    }

     // Convert image file to Base64
     const getBase64Image = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };


    // Function to format "time since posted"
    function formatTimeSince(date) {
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);
        if (seconds < 60) return `${seconds} seconds ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes} minutes ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} hours ago`;
        const days = Math.floor(hours / 24);
        return `${days} days ago`;
    }

    

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);
});
