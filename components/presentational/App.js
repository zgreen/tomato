export default ({ children }) => (
  <main>
    <style jsx global>{`
      :root {
        --brown: #3d2d2d;
      }
      html {
        box-sizing: border-box;
      }
      *,
      *::before,
      *::after {
        box-sizing: inherit;
      }
      body {
        background-color: var(--brown);
        color: tomato;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica,
          Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
        margin: 0;
      }
    `}</style>
    <style jsx>{`
      main {
        display: flex;
        flex-direction: column;
        height: 100vh;
        padding: 10px;
      }
    `}</style>
    {children}
  </main>
);
