import { initChatModel } from "langchain";

import { config } from "dotenv";
config();

const model = 
await initChatModel(
    
    "google-genai:gemini-2.5-flash-lite"
);



