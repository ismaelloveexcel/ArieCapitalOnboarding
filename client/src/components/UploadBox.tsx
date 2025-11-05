import { useState } from "react";
import { Upload, File, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import StatusChip, { type StatusType } from "./StatusChip";
import { Button } from "@/components/ui/button";

interface UploadBoxProps {
  label: string;
  accept?: string;
  status?: StatusType;
  onUpload?: (file: File) => void;
  onRemove?: () => void;
}

export default function UploadBox({
  label,
  accept,
  status,
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
    <div className="relative" data-testid={`upload-box-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <label className="text-sm font-medium text-foreground mb-2 block">
        {label}
      </label>
      <motion.div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-all ${
          dragActive
            ? "border-cyan bg-cyan/5"
            : fileName
            ? "border-border bg-card"
            : "border-border hover:border-cyan hover:bg-card"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        whileHover={{ scale: fileName ? 1 : 1.01 }}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={!!fileName}
          data-testid="file-input"
        />

        <AnimatePresence mode="wait">
          {fileName ? (
            <motion.div
              key="file"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <File className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground truncate max-w-[200px]" data-testid="file-name">
                    {fileName}
                  </p>
                  <p className="text-xs text-muted-foreground">File uploaded</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {status && <StatusChip status={status} />}
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleRemove}
                  className="h-8 w-8"
                  data-testid="button-remove-file"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-lg flex items-center justify-center">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground mb-1">
                Drop file here or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                {accept ? `Accepts: ${accept}` : "Any file type"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
