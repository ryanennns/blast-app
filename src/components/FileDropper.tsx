import { useState } from "react";
import type { DragEvent } from 'react';


export default function FileDropper() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [response, setResponse] = useState<any>(null);
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
      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResponse(data);
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
        className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center cursor-pointer"
      >
        {preview ? (
          <p className="text-green-600">Selected: {preview}</p>
        ) : (
          <p className="text-gray-500">Drag & drop a `.log` file here</p>
        )}
      </div>

      {file && (
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {uploading ? "Uploading..." : "Upload & Parse"}
        </button>
      )}

      {response && (
        <pre className="mt-4 bg-gray-100 p-4 text-  sm rounded overflow-auto max-h-96 bg-gray-900">
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
}
