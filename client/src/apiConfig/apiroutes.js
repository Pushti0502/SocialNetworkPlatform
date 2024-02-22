import BASE_URL from "./api";

export const apiConfig = {
    async createPost(postData) {
        try {
            const response = await fetch(`${BASE_URL}/post/creatPost`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });
            const data = await response.json();
            console.log(data)
            return data;
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    },

    async getPosts() {
        try {
            const response = await fetch(`${BASE_URL}/post/getPosts`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    },

    // Add more API functions as needed
};

