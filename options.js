document.getElementById("add-site").addEventListener("click", () => {
    const siteInput = document.getElementById("blocked-site").value;
    if (siteInput) {
      chrome.storage.sync.get({ blockSites: [] }, (data) => {
        const updatedSites = [...data.blockSites, siteInput];
        chrome.storage.sync.set({ blockSites: updatedSites }, displaySites);
        document.getElementById("blocked-site").value = "";
      });
    }
  });
  
  function displaySites() {
    chrome.storage.sync.get({ blockSites: [] }, (data) => {
      const siteList = document.getElementById("site-list");
      siteList.innerHTML = "";
      data.blockSites.forEach(site => {
        const li = document.createElement("li");
        li.textContent = site;
        siteList.appendChild(li);
      });
    });
  }
  displaySites();
  