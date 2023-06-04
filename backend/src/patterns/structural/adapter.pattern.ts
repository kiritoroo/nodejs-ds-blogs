// Target
export interface MediaPlayer {
  play(audioType: string, fileName: string): void;
}

// Adaptee
export class MP3Player {
  playMP3(fileName: string): void {
    console.log(`Playing MP3 file: ${fileName}`);
  }
}

// Adapter
export class MP3PlayerAdapter implements MediaPlayer {
  private mp3Player: MP3Player;

  constructor() {
    this.mp3Player = new MP3Player();
  }

  play(audioType: string, fileName: string): void {
    if (audioType === 'mp3') {
      this.mp3Player.playMP3(fileName);
    } else {
      console.log(`Invalid media type: ${audioType}`);
    }
  }
}

// Client
export class AudioPlayer implements MediaPlayer {
  play(audioType: string, fileName: string): void {
    if (audioType === 'mp3') {
      console.log(`Playing MP3 file: ${fileName}`);
    } else if (audioType === 'mp4' || audioType === 'vlc') {
      // Sử dụng Adapter để chơi các định dạng không tương thích
      const adapter = new MP3PlayerAdapter();
      adapter.play(audioType, fileName);
    } else {
      console.log(`Invalid media type: ${audioType}`);
    }
  }
}

// // Sử dụng
// const audioPlayer = new AudioPlayer();
// audioPlayer.play('mp3', 'song.mp3');
// audioPlayer.play('mp4', 'movie.mp4');
// audioPlayer.play('vlc', 'video.vlc');
