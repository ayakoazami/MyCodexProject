const fileInput = document.getElementById('audioFile');
const audio = document.getElementById('player');
const fileName = document.getElementById('fileName');
const albumArt = document.getElementById('albumArt');
const tempoRange = document.getElementById('tempoRange');
const tempoValue = document.getElementById('tempoValue');

fileInput.addEventListener('change', function() {
  const file = this.files[0];
  if (!file) return;

  const url = URL.createObjectURL(file);
  audio.src = url;
  audio.load();

  fileName.textContent = file.name;
  jsmediatags.read(file, {
    onSuccess: function(tag) {
      const picture = tag.tags.picture;
      if (picture) {
        let base64 = "";
        const data = picture.data;
        for (let i = 0; i < data.length; i++) {
          base64 += String.fromCharCode(data[i]);
        }
        albumArt.src = `data:${picture.format};base64,${btoa(base64)}`;
      } else {
        albumArt.src = "";
      }
    },
    onError: function() {
      albumArt.src = "";
    }
  });
});

tempoRange.addEventListener('input', function() {
  const value = parseInt(this.value, 10);
  tempoValue.textContent = value > 0 ? `+${value}` : value;
  audio.playbackRate = 1 + value / 100;
});