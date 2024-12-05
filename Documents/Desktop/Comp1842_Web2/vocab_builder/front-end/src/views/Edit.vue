<template>
    <div>
    <h1>Edit Word</h1>
    <word-form :word="word" @createOrUpdate="createOrUpdate"></word-form>
    </div>
</template>
<script>
import WordForm from '@/components/WordForm.vue';
import { api } from '@/helpers/helpers';

export default {
    name: 'edit-word',
    components: {
    'word-form': WordForm,
    },
    data() {
    return {
        word: {}, 
    };
    },
    async mounted() {
    try {
        const wordId = this.$route.params.id;
        this.word = await api.getWord(wordId);
    } catch (error) {
        console.error('Error fetching word:', error);
        this.flash('Failed to load word. Please try again.', 'error');
    }
    },
    methods: {
    createOrUpdate: async function (updatedWord) {
        try {
        const res = await api.updateWord(updatedWord);

        this.flash('Word Updated Successfully!', 'success');

        this.$router.push(`/words/${res._id}`);
        } catch (error) {

            console.error('Error updating word:', error);
        this.flash(
            `Failed to update word: ${
        error.response?.data?.message || 'Internal server error'
            }`,
            'error'
        );
        }
    },
    },
};
</script>