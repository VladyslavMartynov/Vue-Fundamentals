import axios from "axios";
import { ref, onMounted } from "vue";

export default function usePosts(limit) {
    const posts = ref([]);
    const isLoading = ref(true);
    const page = ref(1);
    const totalPages = ref(0);

    const fetchUserPosts = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    _page: page.value,
                    _limit: limit
                }
            });
            totalPages.value = Math.ceil(response.headers['x-total-count'] / perPage.value);
            posts.value = response.data;
        } catch (e) {
            console.log(e)
        } finally {
            isLoading.value = false;
        }
    }

    onMounted(fetchUserPosts);

    return {
        isLoading, posts, totalPages
    }
}