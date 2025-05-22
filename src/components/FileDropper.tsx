import { useState } from "react";
import type { DragEvent } from "react";
import { API_BASE_URL } from "../const.ts";
import type { UploadApiResponse } from "../types/core.ts";

interface Props {
  onApiResponse: (response: UploadApiResponse) => void;
}

export default function FileDropper({ onApiResponse }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setPreview(droppedFile.name);
    } else {
      alert("Please upload a .log file");
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("logFile", file);

    try {
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      onApiResponse(data);
    } catch (error: unknown) {
      console.log(error);
      alert("Failed to upload log file");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer"
      >
        {preview ? (
          <p className="text-green-600 dark:text-green-400">
            Selected: <span className="font-mono">{preview}</span>
          </p>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            Drag & drop a `.log` file here
          </p>
        )}
      </div>

      <button
        onClick={handleUpload}
        disabled={uploading && !!file}
        className="mt-4 w-full bg-blue-600 dark:bg-blue-500 text-white dark:text-gray-900 px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-600"
      >
        {uploading ? "Uploading..." : "Upload & Parse"}
      </button>
    </div>
  );
}
