/**
 * Security & Anti-Inspection Guard for Zyntral AI
 * Protects frontend runtime from casual inspection, source code extraction,
 * and unauthorized DevTools probing in production environments.
 */

export function initSourceProtection() {
  // Only enforce anti-inspection in production builds to preserve developer DX locally
  if (import.meta.env.DEV) {
    return;
  }

  // 1. Disable Right-Click Context Menu (Prevents Inspect Element)
  document.addEventListener('contextmenu', (e: MouseEvent) => {
    e.preventDefault();
    return false;
  }, { capture: true });

  // 2. Block Inspection & Source Extraction Keyboard Shortcuts
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    const isCtrlOrMeta = e.ctrlKey || e.metaKey;
    const isShift = e.shiftKey;
    const key = e.key ? e.key.toUpperCase() : '';

    // Block F12 (DevTools)
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Block Ctrl+U / Cmd+Option+U (View Page Source)
    if ((isCtrlOrMeta && key === 'U') || (e.metaKey && e.altKey && key === 'U')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Block Ctrl+Shift+I / Cmd+Option+I (DevTools Inspect)
    // Block Ctrl+Shift+J / Cmd+Option+J (DevTools Console)
    // Block Ctrl+Shift+C / Cmd+Option+C (Inspect Element Picker)
    if (
      (isCtrlOrMeta && isShift && ['I', 'J', 'C'].includes(key)) ||
      (e.metaKey && e.altKey && ['I', 'J', 'C'].includes(key))
    ) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Block Ctrl+S / Cmd+S (Save Page HTML)
    if (isCtrlOrMeta && key === 'S') {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, { capture: true });

  // 3. Clear Console Output Periodically
  try {
    setInterval(() => {
      console.clear();
    }, 2500);
  } catch {
    // Ignore environments where console.clear is restricted
  }
}
