const express = require("express");
const azureOpenAI = require("../services/azureOpenAIService");
const router = express.Router();

const { z } = require("zod");

const axios = require("axios");

const storySchema = z.object({
    story: z.array(
        z.object({
            page: z.number(),
            story: z.string(),
        })
    ),
});

router.post("/generate-story", async (req, res) => {
    try {
        const { gender, storyType, name } = req.body;

        if (!gender || !storyType) {
            return res.status(400).json({ error: "Both gender and storyType are required" });
        }

        // Generate the prompt
        const prompt = [
            [
                "system",
                "You are a creative assistant that writes highly engaging and imaginative 10-page stories for kids. Each story must include a relatable main character, a vivid and exciting setting, and a captivating plot with challenges or surprises. Each page must contain a single short sentence that advances the story in an engaging way, and the final page must conclude with a meaningful moral for kids. The output must strictly match the JSON schema provided with 10 objects, each containing a page number and a story sentence."
            ],
            [
                "human",
                `Write a 10-page story. The main character name is ${name} and is a ${gender}, and the type of story is ${storyType}. Each page should be a single short sentence advancing the story, formatted as a JSON object with a key 'story' containing an array of objects, each having 'page' and 'story' keys.`
            ]
        ];

        // Set up Azure OpenAI with structured output
        const structuredAI = azureOpenAI.withStructuredOutput(storySchema);

        // Call Azure OpenAI with the prompt
        const aiResponse = await structuredAI.invoke(prompt);

        const storyWithImages = [];
        // Iterate over each page in the story
        for (const page of aiResponse.story) {
            try {
                // Make a request to generate an image
                const imageResponse = await axios.post(
                    "https://vikas-m59ny9c8-swedencentral.cognitiveservices.azure.com/openai/deployments/dall-e-3/images/generations?api-version=2024-02-01",
                    {
                        prompt: `An illustration of: ${page.story}`,
                        n: 1,
                        size: "1024x1024"
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "api-key": process.env.DALLE_OPENAI_API_KEY,
                        },
                    }
                );

                // Extract the image URL and add it to the storyWithImages array
                const imageUrl = imageResponse.data.data[0].url;
                storyWithImages.push({
                    ...page,
                    image: imageUrl,
                });

                console.log(`Successfully generated image for page ${page.page}`);
            } catch (error) {
                // Log and handle the error, appending a null image for the failed page
                // console.error(`Error generating image for page ${page.page}:`, error);
                storyWithImages.push({
                    ...page,
                    image: null,
                });
            }
        }

        // Return the story with images or null placeholders
        res.status(200).json({ story: storyWithImages });

    } catch (error) {
        console.error("Error generating story with images:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
