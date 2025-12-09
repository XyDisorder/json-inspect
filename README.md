# 🧩 JsonInspect — Inspect, diff, explore.

**JsonInspect** is a lightweight developer tool designed to help you:
- 🔍 **Inspect** JSON structures visually  
- 🌳 **Navigate** nested objects/arrays with a collapsible tree view  
- 🛣️ **List all paths** in dot-notation (`user.address.city`)  
- 🛠️ **Generate TypeScript types** automatically  
- 📐 **View minimal schemas** for objects & arrays  
- 🔄 **Compare two JSON** side-by-side with visual diff (GitHub-style)
- ⚡ **Work instantly** as you paste JSON (no backend, no login)

Perfect for backend devs, frontend devs, data engineers, or anyone dealing with messy JSON daily.

🌐 **Try it online:** [jsoninspect.com](https://jsoninspect.com)

---

## ✨ Features

### 🔥 1. Live JSON Parsing  
Paste JSON → instantly see structure, paths, types, and schema.

### 🌳 2. Tree View  
A clean, collapsible explorer for deeply nested data.

### 🛣️ 3. Path Explorer  
Generate every path inside your data, ideal for mapping, validation, and debugging.

### 🛠️ 4. TypeScript Generator  
Automatically infer:
- objects
- arrays
- unions
- optional fields  
Output a clean, readable `type Root = { ... }`.

### 📐 5. Schema View  
Minimal, human-friendly schema for quick understanding.

### 🔄 6. JSON Comparison  
Compare two JSON side-by-side with:
- **Visual diff highlighting** with real-time editing
- **Color-coded differences**: added (green), removed (red), modified (amber)
- **Filterable results** by difference type
- **Synchronized scrolling** between both JSONs
- **Fullscreen mode** for better visibility
- **Search functionality** in both JSONs

### 🔍 7. Search & Navigation
- **Search** through JSON content with instant highlighting
- **Navigate** between matches with Previous/Next buttons
- **Minimal search bar** for quick access

### 🧪 8. 100% Client-Side  
No backend.  
Your data never leaves your machine.

### 🎨 9. Clean, minimal UI  
Modern TailwindCSS interface with smooth interactions, dark mode support, and responsive design.

---

## 🧰 Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **React Hooks** (pure React + recursion)
- Works entirely client-side

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/jsonbuddy.git
cd jsonbuddy

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm build
pnpm start
```

---

## 📖 Usage

### Inspector Mode
1. Paste your JSON into the input field
2. Explore the structure in the tree view
3. View all paths, TypeScript types, or schema
4. Use the search bar to find specific keys or values

### Compare Mode
1. Switch to "Compare" mode
2. Paste your first JSON in the left panel
3. Paste your second JSON in the right panel
4. See differences highlighted in real-time
5. Use filters to show only added, removed, or modified items
6. Use the search bar to find specific content in each JSON

---

## 🎯 Use Cases

- **API Development**: Inspect API responses and compare different versions
- **Data Validation**: Generate TypeScript types for your data structures
- **Debugging**: Find paths and understand nested JSON structures
- **Documentation**: Generate schemas and types for your documentation
- **Data Migration**: Compare JSON structures before and after migration

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🔗 Links

- **Website**: [jsoninspect.com](https://jsoninspect.com)
- **GitHub**: [github.com/yourusername/jsonbuddy](https://github.com/yourusername/jsonbuddy)

---

Made with ❤️ for developers who work with JSON daily.
