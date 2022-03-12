import axios from "axios";

export const postModule = {
    state: () => ({
        posts: [],
        isLoading: false,
        isError: '',
        selectedSort: '',
        searchQuery: '',
        page: 1,
        perPage: 10,
        totalPages: 0,
        sortOptions: [
            { value: 'title', name: 'By title'},
            { value: 'body',  name: 'By body'}
        ]
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) => {
                return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
            })
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setLoading(state, isLoading) {
            state.isLoading = isLoading;
        },
        setError(state, isError) {
            state.isError = isError;
        },
        setPage(state, page) {
            state.page = page;
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery;
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages
        },
        removePost(state, post) {
            state.posts = state.posts.filter(({ id }) => post.id !== id )
        },
        createPost(state, post) {
            state.posts.push(post);
        }
    },
    actions: {
        async fetchUserPosts({ state, commit }) {
            try {
                commit('setLoading', true);
                this.isLoading = true;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.perPage
                    }
                });
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.perPage))
                commit('setPosts', response.data)
            } catch (e) {
                commit('setError', 'Fetch error!');
                console.log(e)
            } finally {
                commit('setLoading', false);
            }
        }
    },
    namespaced: true
}