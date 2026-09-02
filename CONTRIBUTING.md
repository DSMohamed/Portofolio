# Contributing Guidelines

Thank you for your interest in contributing to the **Liquid Reveal Developer Portfolio & Admin CMS**!

## Development Workflow

1. **Fork & Clone**
   ```bash
   git clone https://github.com/your-username/liquid-reveal-portfolio.git
   cd liquid-reveal-portfolio
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

4. **Make Your Changes**
   - Follow clean TypeScript and React best practices.
   - Maintain 60fps performance and avoid unnecessary re-renders.
   - Adhere to the existing Tailwind CSS design tokens.

5. **Test Your Changes**
   ```bash
   npm run build
   ```

6. **Submit a Pull Request**
   - Open a PR targeting the `main` branch with a clear description of your changes.

---

## Code Style & Conventions
- Use functional React components with TypeScript interfaces.
- Prefer semantic HTML tags and accessible ARIA attributes.
- Keep animation state in `useRef` for requestAnimationFrame loops.
