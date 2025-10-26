# DocVerse - Intelligent Documentation Platform

DocVerse is a real-time collaborative documentation platform with AI-powered features. This MVP demonstrates core functionality including user authentication, real-time collaborative editing, code block integration, and AI-generated summaries.

## Features

- **User Authentication**: Simple email/password login and signup with session management
- **Document Management**: Create, list, and manage documents with a clean dashboard
- **Real-Time Collaboration**: Live synchronization of text edits between multiple users
- **Code Block Integration**: Markdown-style code blocks with distinct visual styling
- **AI Summaries**: Generate intelligent summaries using Hugging Face API
- **Clean UI**: Minimal, functional design focused on usability

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: SQLite (development)
- **Real-Time**: Socket.IO
- **Authentication**: Custom session-based auth
- **AI**: Hugging Face Inference API

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd docverse
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Hugging Face API key (optional):
```
HUGGINGFACE_API_KEY=your_api_key_here
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Authentication
- Sign up with your email and password
- Sign in to access your documents

### Creating Documents
- Click "New Document" on the dashboard
- Enter a title and click "Create Document"

### Collaborative Editing
- Open a document to start editing
- Multiple users can edit simultaneously
- Changes are synchronized in real-time
- See who's currently typing

### Code Blocks
- Use markdown syntax: \`\`\`code\`\`\`
- Code blocks are automatically styled with monospace font and background

### AI Summaries
- Click "AI Summary" button in the editor
- Get intelligent summaries of your document content
- Summaries are generated using Hugging Face's BART model

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Sign in
- `POST /api/auth/me` - Check current session
- `POST /api/auth/logout` - Sign out

### Documents
- `GET /api/documents` - List user's documents
- `POST /api/documents` - Create new document
- `GET /api/documents/[id]` - Get document
- `PUT /api/documents/[id]` - Update document
- `POST /api/documents/[id]/summary` - Generate AI summary

### Real-Time
- WebSocket connection at `/api/socketio`
- Events: `join-document`, `document-change`, `user-typing`, etc.

## Development

### Database Management
```bash
# View database in Prisma Studio
npx prisma studio

# Reset database
npx prisma db push --force-reset
```

### Building for Production
```bash
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
