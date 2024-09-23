const express = require('express');
const router = express.Router();
const { ChatOpenAI } = require('@langchain/openai');
const { PromptTemplate } = require('@langchain/core/prompts');
const { LLMChain } = require('langchain/chains');

router.post('/', async (req, res) => {
    const { prompt, apiKey } = req.body;

    try {
        const chatModel = new ChatOpenAI({
            modelName: 'gpt-4o',
            openAIApiKey: apiKey,
            temperature: 0.7,
        });

        const template = `Write a blog post about {topic}. The blog post should be around {wordCount} words long.`;
        const promptTemplate = new PromptTemplate({
            template: template,
            inputVariables: ['topic', 'wordCount'],
        });

        const chain = new LLMChain({ llm: chatModel, prompt: promptTemplate });

        const result = await chain.call({
            topic: prompt,
            wordCount: '1000',
        });

        res.json({ content: result.text });
    } catch (error) {
        console.error('Error generating blog:', error);
        res.status(500).json({ error: 'Error generating blog' });
    }
});

module.exports = router;