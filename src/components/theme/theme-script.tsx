/**
 * Inline before paint to avoid a light flash when dark theme is stored.
 * Keep in sync with STORAGE_KEY in theme-provider.tsx.
 */
export function ThemeScript() {
  const script = `(function(){try{var t=localStorage.getItem("opsconcierge-theme");if(t==="dark"){document.documentElement.classList.add("dark");document.documentElement.style.colorScheme="dark";}else{document.documentElement.style.colorScheme="light";}}catch(e){}})();`;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
}
