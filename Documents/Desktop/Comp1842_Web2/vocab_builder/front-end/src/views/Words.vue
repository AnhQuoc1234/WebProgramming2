<template>
    <div>
    <h1>Quoc Anh's Dictionary</h1>
    <table id="words" class="ui celled compact table">
        <thead>
        <tr>
            <th>English</th>
            <th>German</th>
            <th>Vietnamese</th>
            <th colspan="3"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(word, i) in words" :key="i">
            <td>{{ word.english }}</td>
            <td>{{ word.german }}</td>
            <td>{{ word.vietnamese }}</td>
            <td width="75" class="center aligned">
            <router-link :to="{ name: 'show', params: { id: word._id }}">Show</router-link>
            </td>
            <td width="75" class="center aligned">
            <router-link :to="{ name: 'edit', params: { id: word._id }}">Edit</router-link>
            </td>
            <td width="75" class="center aligned">
            <a href="#" @click.prevent="onDestroy(word._id)">Delete</a>
            </td>
        </tr>
        </tbody>
    </table>
    </div>
</template>

<script>
import { api } from '@/helpers/helpers';

export default {
    name: 'words',
    data() {
    return {
        words: [], // Data get from API
    };
    },
    methods: {
    async onDestroy(id) {
        const sure = window.confirm('Are you sure you want to delete this word?');
        if (!sure) return;

        try {
        await api.deleteWord(id);
        this.flash('Word deleted successfully!', 'success');
        this.words = this.words.filter((word) => word._id !== id);
        } catch (error) {
        console.error('Error deleting word:', error);
        this.flash('Failed to delete word.', 'error');
        }
    },
    },
    async mounted() {
    try {
        this.words = await api.getWords();
    } catch (error) {
        console.error('Error fetching words:', error);
    }
    },
};
</script>