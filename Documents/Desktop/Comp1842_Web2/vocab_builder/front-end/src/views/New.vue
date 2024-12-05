<template>
  <div>
    <h1>New Word</h1>
    <word-form @createOrUpdate="createOrUpdate"></word-form>
  </div>
</template>

<script>
import WordForm from '@/components/WordForm.vue';
import { api } from '@/helpers/helpers';

export default {
  name: 'new-word',
  components: {
    'word-form': WordForm,
  },
  methods: {
    async createOrUpdate(word) {
      try {
        // call api to create new word
        await api.createWord(word);

        //  success notification flash card
        this.flash('Word Created Successfully!', 'success');

        // move to word list directly
        this.$router.push('/words');
      } catch (error) {
        console.error('Error creating word:', error);
        this.flash('Failed to create word.', 'error');
      }
    },
  },
};
</script>