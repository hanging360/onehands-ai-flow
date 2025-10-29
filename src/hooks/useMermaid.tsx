import { useEffect } from 'react';
import mermaid from 'mermaid';

export const useMermaid = () => {
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'inherit',
    });

    const renderDiagrams = async () => {
      try {
        await mermaid.run({
          querySelector: '.mermaid',
        });
      } catch (error) {
        console.error('Error rendering mermaid diagrams:', error);
      }
    };

    renderDiagrams();
  }, []);
};
