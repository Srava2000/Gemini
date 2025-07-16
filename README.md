
# 💬 Gemini AI Chat - Conversational Chat App (Frontend Only)

A sleek, Gemini-inspired conversational chat interface built with Next.js 15 App Router. Supports OTP login, chatroom management, AI-simulated messages, dark mode, image uploads, and modern UX/UI features.

---

## 🚀 Live Demo

🔗 [View Live on Vercel](https://your-vercel-deployment-url.vercel.app)



## 🧠 Features

- ✅ OTP-based Login/Signup (Simulated)
- ✅ Country Code Dropdown (Custom Selector)
- ✅ Zod + React Hook Form Validation
- ✅ Zustand Global State (Chatrooms & Messages)
- ✅ Chatroom Create/Delete
- ✅ AI Replies (Fake Gemini response using `setTimeout`)
- ✅ Throttling + Typing Indicator
- ✅ Infinite Scroll Simulation
- ✅ Pagination (Client-side limit)
- ✅ Image Upload with Base64 Preview
- ✅ Copy to Clipboard on Hover
- ✅ Dark Mode Toggle
- ✅ Mobile Responsive
- ✅ Toast Notifications (`react-hot-toast`)
- ✅ Keyboard Accessibility
- ✅ LocalStorage Persistence (auth, chatrooms, theme)

---

## 🧪 Tech Stack

| Tech              | Usage                             |
|-------------------|------------------------------------|
| **Next.js 15**     | Routing & Rendering               |
| **Tailwind CSS**   | Styling & Dark Mode               |
| **Zustand**        | Global state (chat, auth, theme) |
| **Zod + RHF**      | Form validation                   |
| **Vercel**         | Deployment                        |

---

## 🛠 Installation & Local Setup

```bash
git clone https://github.com/Srava2000/Gemini.git
cd Gemini
npm install
npm run dev


---

## 📁 Folder Structure

```
/app
  /login       → OTP login screen
  /verify      → OTP entry screen
  /chat
    /[id]      → Chatroom interface
  layout.tsx   → Includes toast and theme
/components
  PhoneNumberForm.tsx
  OTPForm.tsx
  ThemeToggle.tsx
  CountrySelector.tsx
/lib
  store.ts       → Zustand store (chatrooms, messages)
  zodSchemas.ts  → Zod form schemas
  api.ts         → Utility for country code fetching
/public
  /icons         → Lucide-react icons (optional)
```

---

## 📦 Implementation Highlights

### ✅ Throttling & AI Reply

- Simulated `Gemini is typing...` using `setTimeout`
- Delays added before AI responds (throttled)

### ✅ Pagination + Infinite Scroll (Dummy)

- Message array paginated client-side
- Scroll position tracked with `ref`

### ✅ Form Validation

- All inputs validated with `Zod`
- RHF used for smooth error handling

### ✅ Image Upload

- Uploads preview images using `FileReader` + base64
- Image shown in chat bubble with open-in-new-tab on click

### ✅ Dark Mode

- Tailwind `dark:` strategy using `class`
- User preference saved in `localStorage`

---

