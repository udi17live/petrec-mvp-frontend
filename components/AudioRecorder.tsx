import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Mic, Pause, Play, Square, Home, List } from "lucide-react";
import { formatTime } from "@/lib/functions";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export default function AudioRecorder({
  isRecording,
  isPaused,
  recordingTime,
  onStartRecording,
  onPauseRecording,
  onResumeRecording,
  onStopRecording,
}: {
  isRecording: boolean;
  isPaused: boolean;
  recordingTime: number;
  onStartRecording: () => void;
  onPauseRecording: () => void;
  onResumeRecording: () => void;
  onStopRecording: () => void;
}) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="mt-4 space-y-4">
        <div className="text-center text-4xl font-mono">
          {formatTime(recordingTime)}
        </div>
        <div className="flex justify-center space-x-4">
          <Button
            size="icon"
            className="h-16 w-16 rounded-full"
            onClick={
              isRecording && !isPaused
                ? onPauseRecording
                : isPaused
                ? onResumeRecording
                : onStartRecording
            }
          >
            {isRecording && !isPaused ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Mic className="h-6 w-6" />
            )}
          </Button>
          <Button
            variant="destructive"
            className="h-16 w-16 rounded-full"
            size="icon"
            onClick={onStopRecording}
            disabled={!isRecording}
          >
            <Square className="h-6 w-6" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
