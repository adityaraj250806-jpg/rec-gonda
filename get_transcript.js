const { YoutubeTranscript } = require('youtube-transcript');

YoutubeTranscript.fetchTranscript('3aDU8UwU-Io')
  .then(t => {
    const text = t.map(i => i.text).join(' ');
    console.log(text);
  })
  .catch(console.error);
