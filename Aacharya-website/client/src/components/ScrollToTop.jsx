import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop — instantly resets scroll position to the top of the page
 * on every route change. Also disables the browser's native scroll
 * restoration so it never jumps to the footer or a mid-page position.
 */
export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Disable browser's built-in scroll restoration
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        // Instantly jump to top — no smooth scroll so there's no flash
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [pathname]);

    return null;
}
