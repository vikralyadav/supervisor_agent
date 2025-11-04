// import { initChatModel } from "langchain";
// import { createAgent } from "langchain";


// import { tool } from "langchain";
// import { z } from "zod";

// import { config } from "dotenv";
// config();

// const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
// if (!GOOGLE_API_KEY) {
//   throw new Error("Missing GOOGLE_API_KEY in environment variables");
// }

// const model = 
// await initChatModel(
    
//     "google-genai:gemini-2.5-flash-lite"
// );



// import { google } from 'googleapis';
// import fs from 'fs';
// import path from 'path';

// const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
// const TOKEN_PATH = path.join(process.cwd(), 'token.json');

// async function getAuthClient() {
//   const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
//   const { client_secret, client_id, redirect_uris } = credentials.web;

//   const oAuth2Client = new google.auth.OAuth2(
//     client_id,
//     client_secret,
//     redirect_uris[0]
//   );

//   // Load token if it exists
//   if (fs.existsSync(TOKEN_PATH)) {
//     const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
//     oAuth2Client.setCredentials(token);
//     return oAuth2Client;
//   } else {
//     // Otherwise, generate auth URL
//     const authUrl = oAuth2Client.generateAuthUrl({
//       access_type: 'offline',
//       scope: ['https://www.googleapis.com/auth/calendar'],
//     });
//     console.log('Authorize this app by visiting this URL:', authUrl);
//   }
// }







// // const createCalendarEvent = tool(



    
// //   async ({ title, startTime, endTime, attendees, location }) => {



// //      const auth = await getAuthClient();



// //      const calendar = google.calendar({ version: 'v3', auth });




// //       const event = {
// //     summary: title,
// //     location,
// //     start: {
// //       dateTime: startTime,
// //       timeZone: 'Asia/Kolkata',
// //     },
// //     end: {
// //       dateTime: endTime,
// //       timeZone: 'Asia/Kolkata',
// //     },
// //     attendees: attendees.map((email) => ({ email })),
// //   };



// //    const response = await calendar.events.insert({
// //     calendarId: 'primary',
// //     resource: event,
// //   });

// //   return `Event created: ${response.data.htmlLink}`;
// //     // Stub: In practice, this would call Google Calendar API, Outlook API, etc.
// //   //  return `Event created: ${title} from ${startTime} to ${endTime} with ${attendees.length} attendees`;
// //   },
// // //   {
// // //     name: "create_calendar_event",
// // //     description: "Create a calendar event. Requires exact ISO datetime format.",
// // //     schema: z.object({
// // //       title: z.string(),
// // //       startTime: z.string().describe("ISO format: '2024-01-15T14:00:00'"),
// // //       endTime: z.string().describe("ISO format: '2024-01-15T15:00:00'"),
// // //       attendees: z.array(z.string()).describe("email addresses"),
// // //       location: z.string().optional(),
// // //     }),
// // //   }
// // );

// const CALENDAR_AGENT_PROMPT = `
// You are a calendar scheduling assistant.
// Parse natural language scheduling requests (e.g., 'next Tuesday at 2pm')
// into proper ISO datetime formats.
// Use get_available_time_slots to check availability when needed.
// Use create_calendar_event to schedule events.
// Always confirm what was scheduled in your final response.
// `.trim();

//  createCalendarEvent = tool(
    
//   async ({ title, startTime, endTime, attendees, location }) => {
//     const auth = await getAuthClient();
//     const calendar = google.calendar({ version: "v3", auth });

    
//     const event = {
//       summary: title,
//       location,
//       start: {
//         dateTime: startTime,
//         timeZone: "Asia/Kolkata",
//       },
//       end: {
//         dateTime: endTime,
//         timeZone: "Asia/Kolkata",
//       },
//       attendees: attendees.map((email) => ({ email })),
//     };

//     const response = await calendar.events.insert({
//       calendarId: "primary",
//       resource: event,
//     });

//     return ` Event created successfully! View it here: ${response.data.htmlLink}`;
//   },
//   {
//     name: "create_calendar_event",
//     description:
//       "Creates a calendar event using the Google Calendar API. Requires valid OAuth credentials.",
//     schema: z.object({
//       title: z.string(),
//       startTime: z
//         .string()
//         .describe("ISO datetime format, e.g. '2025-11-03T14:00:00+05:30'"),
//       endTime: z
//         .string()
//         .describe("ISO datetime format, e.g. '2025-11-03T15:00:00+05:30'"),
//       attendees: z.array(z.string()).describe("List of email addresses"),
//       location: z.string().optional(),
//     }),
//   }
// );



// const res =  createCalendarEvent.invoke({
//   title: "Project Review Meeting",
//   startTime: "2025-11-04T10:00:00+05:30",
//   endTime: "2025-11-04T11:00:00+05:30",
//   attendees: ["teammate@example.com", "manager@example.com"],

//   location: "Google Meet",
// });


// console.log(res);





// const sendEmail = tool(
//   async ({ to, subject, body, cc }) => {
//     // Stub: In practice, this would call SendGrid, Gmail API, etc.
//     return `Email sent to ${to.join(', ')} - Subject: ${subject}`;
//   },
//   {
//     name: "send_email",
//     description: "Send an email via email API. Requires properly formatted addresses.",
//     schema: z.object({
//       to: z.array(z.string()).describe("email addresses"),
//       subject: z.string(),
//       body: z.string(),
//       cc: z.array(z.string()).optional(),
//     }),
//   }
// );

// const getAvailableTimeSlots = tool(
//   async ({ attendees, date, durationMinutes }) => {
//     // Stub: In practice, this would query calendar APIs
//     return ["09:00", "14:00", "16:00"];
//   },
//   {
//     name: "get_available_time_slots",
//     description: "Check calendar availability for given attendees on a specific date.",
//     schema: z.object({
//       attendees: z.array(z.string()),
//       date: z.string().describe("ISO format: '2024-01-15'"),
//       durationMinutes: z.number(),
//     }),
//   }
// );





// // const CALENDAR_AGENT_PROMPT = `
// // You are a calendar scheduling assistant.
// // Parse natural language scheduling requests (e.g., 'next Tuesday at 2pm')
// // into proper ISO datetime formats.
// // Use get_available_time_slots to check availability when needed.
// // Use create_calendar_event to schedule events.
// // Always confirm what was scheduled in your final response.
// // `.trim();

// // const calendarAgent = createAgent({
// //   model: model,
// //   tools: [createCalendarEvent, getAvailableTimeSlots],
// //   systemPrompt: CALENDAR_AGENT_PROMPT,
// // });


// // calendarAgent()



// // const query = "Schedule a team meeting next Tuesday at 2pm for 1 hour";

// // const stream = await calendarAgent.stream({
// //   messages: [{ role: "user", content: query }]
// // });

// // for await (const step of stream) {
// //   for (const update of Object.values(step)) {
// //     if (update && typeof update === "object" && "messages" in update) {
// //       for (const message of update.messages) {
// //         console.log(message.toFormattedString());
// //       }
// //     }
// //   }
// // }



// const EMAIL_AGENT_PROMPT = `
// You are an email assistant.
// Compose professional emails based on natural language requests.
// Extract recipient information and craft appropriate subject lines and body text.
// Use send_email to send the message.
// Always confirm what was sent in your final response.
// `.trim();

// const emailAgent = createAgent({
//   model: model,
//   tools: [sendEmail],
//   systemPrompt: EMAIL_AGENT_PROMPT,
// });

// // const query = "Send the design team a reminder about reviewing the new mockups";

// // const stream = await emailAgent.stream({
// //   messages: [{ role: "user", content: query }]
// // });

// // for await (const step of stream) {
// //   for (const update of Object.values(step)) {
// //     if (update && typeof update === "object" && "messages" in update) {
// //       for (const message of update.messages) {
// //         console.log(message.toFormattedString());
// //       }
// //     }
// //   }
// // }




// const scheduleEvent = tool(
//   async ({ request }) => {
//     const result = await calendarAgent.invoke({
//       messages: [{ role: "user", content: request }]
//     });
//     const lastMessage = result.messages[result.messages.length - 1];
//     return lastMessage.text;
//   },
//   {
//     name: "schedule_event",
//     description: `
// Schedule calendar events using natural language.

// Use this when the user wants to create, modify, or check calendar appointments.
// Handles date/time parsing, availability checking, and event creation.

// Input: Natural language scheduling request (e.g., 'meeting with design team next Tuesday at 2pm')
//     `.trim(),
//     schema: z.object({
//       request: z.string().describe("Natural language scheduling request"),
//     }),
//   }
// );

// const manageEmail = tool(
//   async ({ request }) => {
//     const result = await emailAgent.invoke({
//       messages: [{ role: "user", content: request }]
//     });
//     const lastMessage = result.messages[result.messages.length - 1];
//     return lastMessage.text;
//   },
//   {
//     name: "manage_email",
//     description: `
// Send emails using natural language.

// Use this when the user wants to send notifications, reminders, or any email communication.
// Handles recipient extraction, subject generation, and email composition.

// Input: Natural language email request (e.g., 'send them a reminder about the meeting')
//     `.trim(),
//     schema: z.object({
//       request: z.string().describe("Natural language email request"),
//     }),
//   }
// );




// const SUPERVISOR_PROMPT = `
// You are a helpful personal assistant.
// You can schedule calendar events and send emails.
// Break down user requests into appropriate tool calls and coordinate the results.
// When a request involves multiple actions, use multiple tools in sequence.
// `.trim();

// const supervisorAgent = createAgent({
//   model: model,
//   tools: [scheduleEvent, manageEmail],
//   systemPrompt: SUPERVISOR_PROMPT,
// });



// const query = "Schedule a team standup for tomorrow at 9am";

// const stream = await supervisorAgent.stream({
//   messages: [{ role: "user", content: query }]
// });

// for await (const step of stream) {
//   for (const update of Object.values(step)) {
//     if (update && typeof update === "object" && "messages" in update) {
//       for (const message of update.messages) {
//         console.log(message.toFormattedString());
//       }
//     }
//   }
// }





import {config } from "dotenv";
config();


import { initChatModel } from "langchain";
import { createAgent } from "langchain";

import { tool } from "langchain";
import { z } from "zod";


const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
if (!GOOGLE_API_KEY) {
  throw new Error("Missing GOOGLE_API_KEY in environment variables");
}



console.log("GOOGLE_API_KEY is set successfully."); 



const model = await initChatModel("google-genai:gemini-2.5-flash-lite");


console.log("Model initialized:", model);



const createCalendarEvent = tool(

  async ({ title, startTime, endTime, attendees, location }) => { 


    return `Event created: ${title} from ${startTime} to ${endTime} with ${attendees.length} attendees`;
  },{
    name: "create_calender_event",
    description: "Create a calender event. Requires exact ISO datetime format.",
    schema: z.object({
      title: z.string(),
      startTime: z.string().describe("ISO format: '2024-01-15T14:00:00'"),
      endTime: z.string().describe("ISO format: '2024-01-15T15:00:00'"),
      attendees: z.array(z.string()).describe("email addresses"),
      location: z.string().optional(),
    }), 
  }

);




const systemPrompt = `
You are a calendar scheduling assistant.
Parse natural language scheduling requests (e.g., 'next Tuesday at 2pm')`.trim();    



const calendarAgent = createAgent({
  model: model,
  tools: [createCalendarEvent],
  systemPrompt: systemPrompt,
});



const res =await calendarAgent.invoke({
  messages: [{ role: "user", content: "Schedule a team meeting next Tuesday at 2pm for 1 hour" }]
});



console.log(res);

