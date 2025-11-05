import { useState } from "react";
import { Upload, File, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface UploadBoxProps {
  label: string;
  accept?: string;
  onUpload?: (file: File) => void;
  onRemove?: () => void;
}

export default function UploadBox({
  label,
  accept,
  onUpload,
  onRemove,
}: UploadBoxProps) {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFileName(file.name);
      onUpload?.(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      onUpload?.(file);
    }
  };

  const handleRemove = () => {
    setFileName(null);
    onRemove?.();
  };

  return (
    <div className="mb-4" data-testid={`upload-box-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <Label className="text-sm font-medium text-foreground mb-2 block">
        {label}
      </Label>
      <div
        className={`relative border-2 border-dashed rounded-md p-4 transition-colors ${
          dragActive
            ? "border-cyan bg-cyan/5"
            : fileName
            ? "border-border bg-card"
            : "border-border hover:border-cyan/50 cursor-pointer"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={!!fileName}
          data-testid="file-input"
        />

        {fileName ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cyan/10 rounded-md flex items-center justify-center flex-shrink-0">
                <File className="w-5 h-5 text-cyan" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate" data-testid="file-name">
                  {fileName}
                </p>
                <p className="text-xs text-muted-foreground">File uploaded</p>
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleRemove}
              className="h-8 w-8 flex-shrink-0"
              data-testid="button-remove-file"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            <Upload className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">
              Drop file here or click to browse
            </p>
            {accept && (
              <p className="text-xs mt-1 opacity-75">
                Accepts: {accept}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
