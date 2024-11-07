const blockElements = () => {
    const selectors = ['.comments', '.sidebar', '.trending'];
    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => el.style.display = 'none');
    });
  };
  
  chrome.storage.sync.get(["blockSites"], (data) => {
    if (data.blockSites && data.blockSites.includes(window.location.hostname)) {
      blockElements();
    }
  });
  