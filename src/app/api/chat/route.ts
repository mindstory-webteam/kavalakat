import { NextRequest, NextResponse } from 'next/server';

// FREE Mock AI Chatbot - No API Keys Required!
// Place this at: app/api/chat/route.ts

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Your Company Information
const COMPANY_INFO = {
  name: "Your Company Name",
  industry: "Your Industry",
  services: [
    "Service 1 - Web Development",
    "Service 2 - Mobile Apps",
    "Service 3 - Digital Marketing",
    "Service 4 - Consulting"
  ],
  location: "Your City, Country",
  phone: "+1234567890",
  email: "contact@yourcompany.com",
  website: "www.yourcompany.com",
  workingHours: "Monday - Friday, 9 AM - 6 PM",
  about: "We are a leading company providing excellent services since 2020. Our team is dedicated to helping clients achieve their goals."
};

// Smart response patterns
const responsePatterns = {
  greetings: {
    patterns: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'],
    responses: [
      `Hello! Welcome to ${COMPANY_INFO.name}. How can I assist you today?`,
      `Hi there! Thanks for reaching out to ${COMPANY_INFO.name}. What can I help you with?`,
      `Hey! Great to hear from you. How can we help you today?`
    ]
  },
  services: {
    patterns: ['service', 'what do you do', 'what do you offer', 'help with', 'provide'],
    responses: [
      `We offer several services:\n\n${COMPANY_INFO.services.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\nWhich service interests you?`,
      `At ${COMPANY_INFO.name}, we specialize in:\n${COMPANY_INFO.services.join('\n• ')}\n\nWould you like to know more about any of these?`
    ]
  },
  contact: {
    patterns: ['contact', 'reach', 'phone', 'email', 'call', 'get in touch'],
    responses: [
      `You can reach us at:\n📞 Phone: ${COMPANY_INFO.phone}\n📧 Email: ${COMPANY_INFO.email}\n🌐 Website: ${COMPANY_INFO.website}\n\nFeel free to call us directly using the call button!`,
      `Here's how to contact us:\n\nPhone: ${COMPANY_INFO.phone}\nEmail: ${COMPANY_INFO.email}\n\nOur team is available ${COMPANY_INFO.workingHours}. You can also click the call button to speak with us now!`
    ]
  },
  location: {
    patterns: ['where', 'location', 'address', 'find you', 'located'],
    responses: [
      `We're located in ${COMPANY_INFO.location}. Would you like directions or more information about visiting us?`,
      `Our office is in ${COMPANY_INFO.location}. We'd love to meet you! Contact us to schedule a visit.`
    ]
  },
  about: {
    patterns: ['about', 'who are you', 'tell me about', 'your company', 'what is'],
    responses: [
      `${COMPANY_INFO.about}\n\nWe're based in ${COMPANY_INFO.location} and have been serving clients since 2020. Want to know more about our services?`,
      `Great question! ${COMPANY_INFO.about}\n\nWe specialize in ${COMPANY_INFO.industry} and pride ourselves on excellent customer service.`
    ]
  },
  pricing: {
    patterns: ['price', 'cost', 'how much', 'pricing', 'rate', 'charge'],
    responses: [
      `Our pricing varies based on your specific needs. I'd recommend speaking with our team directly for an accurate quote. Would you like to call us now or should I have someone contact you?`,
      `We offer competitive pricing tailored to each client. For a personalized quote, please call us at ${COMPANY_INFO.phone} or click the call button to speak with our sales team!`
    ]
  },
  hours: {
    patterns: ['hours', 'open', 'available', 'when', 'time'],
    responses: [
      `We're available ${COMPANY_INFO.workingHours}. Outside these hours, you can leave a message and we'll get back to you first thing!`,
      `Our working hours are ${COMPANY_INFO.workingHours}. Need immediate assistance? Click the call button to reach us now!`
    ]
  },
  help: {
    patterns: ['help', 'assist', 'support', 'question'],
    responses: [
      `I'm here to help! You can ask me about:\n• Our services\n• Contact information\n• Pricing\n• Location\n• Working hours\n\nWhat would you like to know?`,
      `Happy to assist! I can help you with information about our services, pricing, location, and more. What specific information are you looking for?`
    ]
  },
  thanks: {
    patterns: ['thank', 'thanks', 'appreciate'],
    responses: [
      `You're very welcome! Is there anything else I can help you with?`,
      `My pleasure! Feel free to ask if you have any other questions.`,
      `Glad I could help! Don't hesitate to reach out if you need anything else.`
    ]
  },
  goodbye: {
    patterns: ['bye', 'goodbye', 'see you', 'later'],
    responses: [
      `Goodbye! Thanks for chatting with ${COMPANY_INFO.name}. Have a great day!`,
      `Take care! Feel free to reach out anytime. We're here to help!`,
      `See you later! Don't forget - you can call us anytime at ${COMPANY_INFO.phone}!`
    ]
  }
};

// Default responses
const defaultResponses = [
  `That's a great question! For detailed information, I'd recommend calling us at ${COMPANY_INFO.phone}. Our team can provide you with specific details.`,
  `I'd be happy to help with that! For the most accurate information, please call us using the call button or reach out at ${COMPANY_INFO.email}.`,
  `Thanks for your interest! While I can provide general information, our team would love to discuss this with you in detail. Would you like to call us now?`,
  `That's an interesting question! To give you the best answer, I recommend speaking with our expert team. Click the call button to connect with us!`
];

// Function to find matching pattern
function findMatchingResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();
  
  // Check each category
  for (const [category, data] of Object.entries(responsePatterns)) {
    const matched = data.patterns.some(pattern => 
      lowerMessage.includes(pattern.toLowerCase())
    );
    
    if (matched) {
      // Return random response from matching category
      const responses = data.responses;
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  
  // Return default response if no match
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Simulate AI thinking delay
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();
    
    // Get last user message
    const lastMessage = messages[messages.length - 1];
    
    if (!lastMessage || lastMessage.role !== 'user') {
      throw new Error('No user message found');
    }

    // Simulate AI "thinking" time (500-1500ms)
    const thinkingTime = 500 + Math.random() * 1000;
    await delay(thinkingTime);

    // Generate smart response
    const aiResponse = findMatchingResponse(lastMessage.content);

    return NextResponse.json({
      message: aiResponse,
      success: true
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { 
        message: `Sorry, I encountered an error. Please try calling us at ${COMPANY_INFO.phone} or email us at ${COMPANY_INFO.email} for assistance.`,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to check if API is working
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Free AI Chatbot API is running!',
    company: COMPANY_INFO.name
  });
}