// Function to retrieve blocked channels from storage
function getBlockedChannels(callback) {
    chrome.storage.sync.get(['blockedChannels'], function (result) {
      let channels = result.blockedChannels || [];
      callback(channels);
    });
  }
  
  // Function to hide videos from blocked channels
  function hideBlockedVideos(blockedChannels) {
    // Select all video items on the page
    const videoItems = document.querySelectorAll(
      'ytd-video-renderer, ytd-grid-video-renderer, ytd-channel-renderer, ytd-playlist-renderer, ytd-rich-item-renderer'
    );
  
    videoItems.forEach(function (item) {
      let channelNameElement = item.querySelector(
        '#channel-name, #text-container, ytd-channel-name, .ytd-channel-name, .ytd-channel-renderer'
      );
      
      if (channelNameElement) {
        let channelName = channelNameElement.textContent.trim();
        // Hide the video if the channel is in the blocked list
        if (blockedChannels.includes(channelName)) {
          item.style.display = 'none';
        }
      }
    });
  }
  
  // Initialize the content script
  function init() {
    getBlockedChannels(function (blockedChannels) {
      hideBlockedVideos(blockedChannels);
      
      // Observe mutations to handle dynamically loaded content
      const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function () {
          hideBlockedVideos(blockedChannels);
        });
      });
      
      // Start observing the page for new video elements
      observer.observe(document.body, { childList: true, subtree: true });
    });
  }
  
  // Wait for the DOM to be fully loaded
  window.addEventListener('load', function() {
    setTimeout(init, 1000); // Wait 1 second to ensure that the page is fully rendered
  });
  