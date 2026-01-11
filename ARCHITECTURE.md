# MRTek.ai Website Architecture

This document provides a technical overview of the MRTek.ai marketing website architecture and technology stack.

## Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| **React 18** | Component-based UI framework |
| **TypeScript** | Static typing and enhanced developer experience |
| **Vite** | Fast build tool and development server |
| **Tailwind CSS** | Utility-first CSS framework with custom design tokens |
| **shadcn/ui** | Accessible, customizable component library |
| **React Router v6** | Client-side routing |
| **React Query (TanStack)** | Server state management and caching |
| **Lucide React** | Icon library |

### Backend (Supabase via Lovable Cloud)

The backend infrastructure is powered by **Supabase**, accessed through **Lovable Cloud** which provides:

| Feature | Description |
|---------|-------------|
| **Edge Functions** | Serverless TypeScript/Deno functions for API logic |
| **PostgreSQL Database** | Relational database with Row Level Security (RLS) |
| **Authentication** | User auth with email, OAuth, and magic links |
| **Storage** | File storage with access policies |
| **Realtime** | WebSocket subscriptions for live updates |
| **Secrets Management** | Secure environment variable storage |

### External Integrations

| Service | Purpose |
|---------|---------|
| **Azure AI** | Powers conversational AI responses in the chatbot |
| **Resend** | Transactional email delivery for contact/booking forms |

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React SPA)                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Pages: Home | About | Services | Blog | Contact     │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │  Components: Header | Footer | Chatbot | UI Library  │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │  State: React Query | React Router | Local State     │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────┬───────────────────────────────────┘
                          │ HTTPS
                          ▼
┌─────────────────────────────────────────────────────────────┐
│              Supabase (via Lovable Cloud)                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                   Edge Functions                     │    │
│  │  ┌─────────────┐ ┌─────────────┐ ┌───────────────┐  │    │
│  │  │ mrtek-chat  │ │send-contact │ │ send-booking  │  │    │
│  │  │             │ │   -email    │ │    -email     │  │    │
│  │  └──────┬──────┘ └──────┬──────┘ └───────┬───────┘  │    │
│  └─────────┼───────────────┼────────────────┼──────────┘    │
│            │               │                │               │
│  ┌─────────┴───────────────┴────────────────┴──────────┐    │
│  │              Secrets Management                      │    │
│  │  AZURE_CHAT_PROXY_URL | RESEND_API_KEY | etc.       │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────┬───────────────────────────────────┘
                          │
          ┌───────────────┴───────────────┐
          ▼                               ▼
┌──────────────────┐            ┌──────────────────┐
│     Azure AI     │            │      Resend      │
│  (Chat Proxy)    │            │  (Email API)     │
└──────────────────┘            └──────────────────┘
```

---

## Edge Functions

### `mrtek-chat`
AI-powered chatbot endpoint with:
- **FAQ Matching**: Pattern-based responses for common questions
- **Azure AI Proxy**: Falls back to Azure AI for conversational responses
- **Rate Limiting**: IP-based throttling for both general and AI requests
- **Thread Management**: Maintains conversation context via thread IDs

### `send-contact-email`
Contact form handler:
- Validates and sanitizes input
- Sends notification emails via Resend
- Rate limited (5 requests/hour per IP)

### `send-booking-email`
Booking/scheduling form handler:
- Processes meeting requests
- Sends confirmation emails via Resend
- Input validation and XSS protection

---

## Project Structure

```
├── src/
│   ├── assets/              # Static images and media
│   ├── components/
│   │   ├── Chatbot/         # AI assistant components
│   │   │   ├── Chatbot.tsx
│   │   │   ├── ChatHeader.tsx
│   │   │   ├── MessageList.tsx
│   │   │   ├── MessageInput.tsx
│   │   │   ├── useChat.ts
│   │   │   ├── knowledgeBase.ts
│   │   │   └── types.ts
│   │   ├── ui/              # shadcn/ui components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── SchedulerModal.tsx
│   ├── hooks/               # Custom React hooks
│   ├── integrations/
│   │   └── supabase/        # Auto-generated Supabase client
│   ├── lib/                 # Utility functions
│   ├── pages/               # Route components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Blog.tsx
│   │   ├── BlogPost.tsx
│   │   ├── Contact.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx              # Root component with routing
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles and design tokens
├── supabase/
│   ├── functions/           # Edge functions
│   │   ├── mrtek-chat/
│   │   ├── send-contact-email/
│   │   └── send-booking-email/
│   └── config.toml          # Supabase configuration
├── public/                  # Static public assets
└── index.html               # HTML template
```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase anon/public key |

### Edge Function Secrets (stored in Supabase)

| Secret | Description |
|--------|-------------|
| `AZURE_CHAT_PROXY_URL` | Azure Function App endpoint for AI chat |
| `AZURE_AGENT_ENDPOINT` | Azure AI agent endpoint |
| `AZURE_AGENT_API_KEY` | Azure AI authentication key |
| `AZURE_AGENT_ID` | Azure AI agent identifier |
| `RESEND_API_KEY` | Resend email API key |

---

## Deployment

- **Frontend**: Deployed via Lovable's publishing system
- **Edge Functions**: Auto-deployed on code push
- **Database**: Managed PostgreSQL via Supabase

---

## Security Considerations

- All edge functions implement CORS headers
- Rate limiting protects against abuse
- Input sanitization prevents XSS attacks
- Secrets stored securely (not in codebase)
- Row Level Security (RLS) enabled on database tables

---

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The app runs at `http://localhost:8080` by default.
