import ReactAudioPlayer from "react-audio-player";

export default function AudioPlayback({ audioFile }: { audioFile: File }) {
  return <ReactAudioPlayer src={URL.createObjectURL(audioFile)} controls />;
}
