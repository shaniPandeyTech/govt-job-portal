if (!('canParse' in URL)) {
    (URL as any).canParse = function(url: string) {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    };
  }