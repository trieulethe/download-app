document.getElementById('choose-directory').addEventListener('click', async () => {
  const directoryPath = await window.electronAPI.openDirectory();
  if (directoryPath) {
    document.getElementById('directory-path').textContent = `Saving to: ${directoryPath}`;
  }
});

document.getElementById('start-download').addEventListener('click', () => {
  const username = document.getElementById('username').value;
  const minLikes = document.getElementById('min-likes').value || 0;
  // Gather checkbox options
  const noMetadata = document.getElementById('no-metadata-json').checked ? '--no-metadata-json' : '';
  const noVideos = document.getElementById('no-videos').checked ? '--no-videos' : '';
  const noCaptions = document.getElementById('no-captions').checked ? '--no-captions' : '';
  const fastUpdate = document.getElementById('fast-update').checked ? '--fast-update' : '';
  const directory = document.getElementById('directory-path').textContent.split(': ')[1];

  const optionsArray = [noMetadata, noVideos, noCaptions, fastUpdate];
  const options = optionsArray.filter(option => option !== '').join(' ');

  window.electronAPI.startInstaloader({ username, minLikes, directory, otherOptions: options });
});

document.getElementById('stop-download').addEventListener('click', () => {
  window.electronAPI.stopInstaloader();
});

// Update the status area
window.electronAPI.onStatusUpdate((data) => {
  const statusArea = document.getElementById('status-area');
  statusArea.textContent += data;
});

window.electronAPI.onError((error) => {
  const statusArea = document.getElementById('status-area');
  statusArea.textContent = `Error: ${error}`;
});

