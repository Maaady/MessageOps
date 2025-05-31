# MessageOps
[![Next.js](https://img.shields.io/badge/Next.js-18.0-green.svg)](https://www.next.jslang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-3.8+-yellow.svg)](https://www.node.jslang.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-brown.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-4.6-blue.svg)](https://www.reactlang.org/)
[![HTML5](https://img.shields.io/badge/HTML5-12.1-voilet.svg)](https://www.html5lang.org/)
[![TalwindCSS](https://img.shields.io/badge/TalwindCSS-8.2-pink.svg)](https://www.talwindcsslang.org/)

- . Built with React, TypeScript, and Tailwind CSS.It encompasses various messaging patterns and technologies used for tasks like remote procedure calls, real-time data streaming, and event-driven architectures.

![SMS Messaging Tool Screenshot](https://images.unsplash.com/photo-1611746869696-d09bce200020?auto=format&fit=crop&q=80&w=2000)

## Features

- 📱 Upload contact lists via CSV or Excel files
- ✅ Automatic phone number validation and formatting
- 📝 Compose and preview messages
- ⏰ Schedule messages for future delivery
- 📊 Real-time message status tracking
- 📋 Comprehensive message history
- 🌐 International phone number support

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

### Uploading Contacts

1. Click the upload area or drag and drop a CSV/Excel file
2. The file should contain phone numbers in the first column
3. Numbers will be automatically validated and formatted
4. Review the validation summary for any invalid numbers

### Sending Messages

1. Compose your message in the message form
2. Optionally set a schedule date/time
3. Click "Send Message" to queue the message
4. Monitor the message status in the history section

## Technology Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Phone Number Validation**: Google LibPhoneNumber
- **File Processing**: XLSX
- **Date Formatting**: date-fns
- **Notifications**: React Hot Toast
- **ID Generation**: UUID

## Project Structure

```
src/
├── components/         # React components
│   ├── FileUpload.tsx
│   ├── MessageForm.tsx
│   ├── MessageHistory.tsx
│   └── ValidationSummary.tsx
├── lib/               # Utility functions and stores
│   ├── messageStore.ts
│   └── phoneUtils.ts
├── App.tsx           # Main application component
└── main.tsx         # Application entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License .

## Acknowledgments

- [Lucide Icons](https://lucide.dev/) for beautiful UI icons
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS framework
- [Google LibPhoneNumber](https://github.com/google/libphonenumber) for phone number validation
