import ReactAudioPlayer from "react-audio-player";

export default function AudioPlayback({ audioFile, fileUrl }: { audioFile: File, fileUrl?: string }) {
  const src = fileUrl ? fileUrl : URL.createObjectURL(audioFile)
  return <ReactAudioPlayer src={src} controls />;
}
