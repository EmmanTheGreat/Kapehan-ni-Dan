document.addEventListener("DOMContentLoaded", () => {
    const currentUserSpan = document.getElementById("current-user"); // Reference the span element

    // Function to get the current user from localStorage
    const getCurrentUser = () => {
        let currentUser = "Anonymous"; // Default to "Anonymous"

        // Search for a key in localStorage that starts with "user"
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("user")) {
                const storedData = localStorage.getItem(key);
                if (storedData) {
                    try {
                        const userData = JSON.parse(storedData);
                        currentUser = userData.name || "Anonymous";
                        break; // Stop searching once a match is found
                    } catch (error) {
                        console.error("Error parsing user data from localStorage:", error);
                    }
                }
            }
        }

        return currentUser;
    };

    // Update the current-user span
    if (currentUserSpan) {
        currentUserSpan.textContent = ` ${getCurrentUser()}`;
    }
});