"use client";

import Heading from "@/app/dashboard/components/heading";
import { Video, Loader2, CloudUpload } from "lucide-react";
import { useState, useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

interface TrueVideoProps {
  videoUrl: string | null;
  setVideoUrl: (url: string | null) => void;
  setVideoFile: (file: File | null) => void;
}

const TrueVideo = ({ videoUrl, setVideoUrl, setVideoFile }: TrueVideoProps) => {
  const [uploading, setUploading] = useState(false);
  const ffmpegRef = useRef(new FFmpeg()); // Prevent re-initializing ffmpeg on every render

  const handleUpload = async (file: File) => {
    setUploading(true);
    const ffmpeg = ffmpegRef.current;

    try {
      // 1. Load FFmpeg
      const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
      await ffmpeg.load({
        coreURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.js`,
          "text/javascript",
        ),
        wasmURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.wasm`,
          "application/wasm",
        ),
      });

      // 2. Write file to virtual memory
      await ffmpeg.writeFile("input", await fetchFile(file));

      // 3. Compress (Standard libx264 compression)
      // crf 28 is the sweet spot for file size vs quality
      await ffmpeg.exec([
        "-i",
        "input",
        "-vcodec",
        "libx264",
        "-crf",
        "28",
        "output.mp4",
      ]);

      // 4. Read the result
      const data = await ffmpeg.readFile("output.mp4");
      const compressedBlob = new Blob([data as any], { type: "video/mp4" });

      // Convert Blob back to a File object for your existing backend logic
      const compressedFile = new File([compressedBlob], file.name, {
        type: "video/mp4",
      });

      // 5. Update State
      setVideoFile(compressedFile);
      setVideoUrl(URL.createObjectURL(compressedBlob));
    } catch (error) {
      console.error("Compression failed:", error);
      // Fallback: If compression fails, just use the original file
      setVideoFile(file);
      setVideoUrl(URL.createObjectURL(file));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Heading
        title="Show Us Your Store"
        description="Record a short video of your store (30–60 seconds works best)."
      />

      {/* Upload Box */}
      {!videoUrl && (
        <label
          htmlFor="video-upload"
          className="group flex h-[500px] flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 cursor-pointer transition hover:border-[var(--primary)] hover:bg-[color:var(--primary)/0.04]"
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-10 w-10 animate-spin text-[var(--primary)]" />
              <p className="text-xs text-blue-500 font-bold">
                Shrinking video for faster upload...
              </p>
            </div>
          ) : (
            <CloudUpload className="h-10 w-10 text-gray-400 group-hover:text-[var(--primary)]" />
          )}

          <div className="text-center space-y-1">
            <p className="font-medium">
              {uploading ? "Processing video..." : "Click to record or upload"}
            </p>
            <p className="text-sm text-gray-500">MP4 / MOV • Max 60 sec</p>
          </div>

          <input
            id="video-upload"
            type="file"
            accept="video/*"
            hidden
            disabled={uploading}
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleUpload(e.target.files[0]);
              }
            }}
          />
        </label>
      )}

      {/* Preview Section - Remains exactly as you had it */}
      {videoUrl && (
        <div className="space-y-4">
          <div className="rounded-xl border bg-black/90 p-2">
            <video
              src={videoUrl}
              controls
              className="w-full max-h-[500px] rounded-lg object-contain"
            />
          </div>

          <button
            type="button"
            className="mx-auto block text-sm font-medium text-gray-600 hover:text-[var(--primary)] underline underline-offset-4"
            onClick={() => {
              setVideoUrl(null);
              setVideoFile(null);
            }}
          >
            Record again
          </button>
        </div>
      )}
    </div>
  );
};

export default TrueVideo;
