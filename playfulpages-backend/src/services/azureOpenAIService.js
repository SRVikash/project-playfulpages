const { AzureChatOpenAI } = require("@langchain/openai");
require("dotenv").config();

const azureConfig = {
    model: "gpt-4o",
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME,
    azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION,
    temperature: 0,
    maxTokens: undefined,
    timeout: undefined,
    maxRetries: 2,
};

const azureOpenAI = new AzureChatOpenAI(azureConfig);

module.exports = azureOpenAI;
