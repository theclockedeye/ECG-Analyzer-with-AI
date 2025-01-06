import { useState } from 'react';
import { Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export function DropZone() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = [...e.dataTransfer.files];
    if (files?.[0]) {
      setFile(files[0]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"
    >
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20'
            : 'border-gray-300 hover:border-gray-400 dark:border-gray-700'
        }`}
      >
        <Upload className="mb-4 h-12 w-12 text-gray-400" />
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          Drag and drop your ECG file here, or click to select
        </p>
        {file && (
          <p className="mt-2 text-sm font-medium text-blue-500">
            Selected: {file.name}
          </p>
        )}
      </div>
      
      {file && (
        <Button className="mt-4 w-full">
          Analyze ECG
        </Button>
      )}
    </motion.div>
  );
}