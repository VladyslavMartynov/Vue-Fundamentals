import { computed, ref } from "vue";

export default function useSearchedPosts(sortedPosts) {
    const searchQuery = ref('');
    const searchedPosts = computed(() => {
        return sortedPosts.value.filter((post) => post.title.toLowerCase().includes(searchQuery.value.toLowerCase()));
    })

    return {
        searchQuery, searchedPosts
    }
}