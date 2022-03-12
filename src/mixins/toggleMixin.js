export default  {
    props: {
        isOpen: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        hideModal() {
            this.$emit('update:isOpen', false)
        }
    },
    mounted() {

    }
}