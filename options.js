// options.js

// Save options to chrome.storage
function saveOptions() {
    var channels = document.getElementById('channels').value;
    var channelList = channels
      .split('\\n')
      .map(function (item) {
        return item.trim();
      })
      .filter(function (item) {
        return item.length > 0;
      });
    chrome.storage.sync.set(
      {
        blockedChannels: channelList,
      },
      function () {
        // Notify the user that the options were saved
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
          status.textContent = '';
        }, 1500);
      }
    );
  }
  
  // Restore the list of blocked channels
  function restoreOptions() {
    chrome.storage.sync.get(['blockedChannels'], function (result) {
      var channels = result.blockedChannels || [];
      document.getElementById('channels').value = channels.join('\\n');
    });
  }
  
  document.addEventListener('DOMContentLoaded', restoreOptions);
  document.getElementById('save').addEventListener('click', saveOptions);
  