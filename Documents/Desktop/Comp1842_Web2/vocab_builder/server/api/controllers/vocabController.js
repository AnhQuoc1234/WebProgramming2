const mongoose = require('mongoose');
const Vocab = mongoose.model('Vocab');

// List all words
exports.list_all_words = async (req, res) => {
    try {
        const words = await Vocab.find({});
        console.log(words); // Log the retrieved words
        res.status(200).json(words);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch words', details: err.message });
    }
};

// Create a word
exports.create_a_word = async (req, res) => {
    const { english, german, vietnamese } = req.body;

    // Validate input fields
    if (!english || !german || !vietnamese) {
        return res.status(400).json({ error: 'All fields (english, german, vietnamese) are required' });
    }

    try {
        const newWord = new Vocab({ english, german, vietnamese });
        const savedWord = await newWord.save();
        res.status(201).json(savedWord);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create word', details: err.message });
    }
};

// Read a specific word by ID
exports.read_a_word = async (req, res) => {
    try {
        const word = await Vocab.findById(req.params.wordId);
        if (!word) {
            return res.status(404).json({ error: 'Word not found' });
        }
        res.status(200).json(word);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch word', details: err.message });
    }
};

// Update a word
exports.update_a_word = async (req, res) => {
    const { english, german, vietnamese } = req.body;

    // Validate input fields
    if (!english || !german || !vietnamese) {
        return res.status(400).json({ error: 'All fields (english, german, vietnamese) are required' });
    }

    try {
        const updatedWord = await Vocab.findByIdAndUpdate(
            req.params.wordId,
            { english, german, vietnamese },
            { new: true, runValidators: true } // Ensure validation runs on update
        );
        if (!updatedWord) {
            return res.status(404).json({ error: 'Word not found' });
        }
        res.status(200).json(updatedWord);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update word', details: err.message });
    }
};

// Delete a word
exports.delete_a_word = async (req, res) => {
    try {
        const deletedWord = await Vocab.deleteOne({ _id: req.params.wordId });
        if (deletedWord.deletedCount === 0) {
            return res.status(404).json({ error: 'Word not found' });
        }
        res.status(200).json({ message: 'Word successfully deleted', _id: req.params.wordId });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete word', details: err.message });
    }
};