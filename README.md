# Sheet Doctor Frontend

Sheet Doctor Frontend is a web application for analyzing, detecting errors, and suggesting corrections in Excel spreadsheets. Built with Vue 3 and Vite, it provides an intuitive interface for uploading files, visualizing detected formula errors, and applying corrections.

## Features

- Upload Excel files (`.xlsx`)
- Analyze formulas for common errors (syntax, reference, function, circular, division by zero, etc.)
- Visual summary and detailed list of detected errors
- Suggestions and explanations for corrections
- Confidence score for each correction
- User-friendly interface with real-time feedback

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/sheet-doctor-frontend.git
   cd sheet-doctor-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
# or
yarn build
```

The optimized files will be in the `dist/` folder.

## Project Structure

```
src/
  components/      # Reusable Vue components
  composables/     # Composition API composables
  services/        # API services and utilities
  App.vue          # Main component
  main.js          # Application entry point
```

## Main Dependencies

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [xlsx](https://www.npmjs.com/package/xlsx) (Excel file reading)
- [axios](https://axios-http.com/) (HTTP requests)
- [Font Awesome](https://fontawesome.com/) (icons)

## Notes

- Make sure the backend API is running if required. I'm working on it, but I'm not publishing it yet.
- To customize messages or error types, edit the components in `src/components/`.

## License

This project is licensed under the MIT License.

---

Made with ❤️ by Daniel Mesquita