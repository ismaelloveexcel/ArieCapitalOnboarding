import { useState } from 'react';
import UploadBox from '../UploadBox';
import type { StatusType } from '../StatusChip';

export default function UploadBoxExample() {
  const [status, setStatus] = useState<StatusType>('pending');

  return (
    <div className="space-y-4">
      <UploadBox
        label="Certificate of Incorporation"
        accept=".pdf,.jpg,.png"
        status={status}
        onUpload={(file) => {
          console.log('File uploaded:', file.name);
          setTimeout(() => setStatus('verified'), 1000);
        }}
        onRemove={() => {
          console.log('File removed');
          setStatus('pending');
        }}
      />
    </div>
  );
}
