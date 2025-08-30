function FileUpload({ label, file, onChange, error, accept, maxSize, description }) {
  try {
    const [isDragging, setIsDragging] = React.useState(false);
    const fileInputRef = React.useRef(null);

    const handleFileSelect = (selectedFile) => {
      if (selectedFile) {
        const maxSizeBytes = maxSize * 1024 * 1024; // Convert MB to bytes
        if (selectedFile.size > maxSizeBytes) {
          alert(`File size must be less than ${maxSize} MB`);
          return;
        }

        const allowedTypes = accept.split(',').map(type => type.trim());
        const fileExtension = '.' + selectedFile.name.split('.').pop().toLowerCase();
        
        if (!allowedTypes.includes(fileExtension)) {
          alert(`Please select a valid file type: ${accept}`);
          return;
        }

        onChange(selectedFile);
      }
    };

    const handleDragOver = (e) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = (e) => {
      e.preventDefault();
      setIsDragging(false);
    };

    const handleDrop = (e) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFile = e.dataTransfer.files[0];
      handleFileSelect(droppedFile);
    };

    const formatFileSize = (bytes) => {
      const mb = bytes / (1024 * 1024);
      return mb.toFixed(2) + ' MB';
    };

    return (
      <div data-name="file-upload" data-file="components/FileUpload.js">
        <label className="form-label">{label}</label>
        
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragging
              ? 'border-[var(--primary-color)] bg-[var(--secondary-color)]'
              : 'border-gray-300 hover:border-[var(--primary-color)]'
          }`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={(e) => handleFileSelect(e.target.files[0])}
            className="hidden"
          />
          
          {file ? (
            <div className="space-y-2">
              <div className="icon-check-circle text-2xl text-[var(--success-color)]"></div>
              <p className="font-medium text-[var(--text-primary)]">{file.name}</p>
              <p className="text-sm text-[var(--text-secondary)]">
                {formatFileSize(file.size)}
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(null);
                }}
                className="text-[var(--error-color)] hover:underline text-sm"
              >
                Remove file
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="icon-upload text-2xl text-gray-400"></div>
              <p className="text-[var(--text-primary)]">
                Click to browse or drag and drop
              </p>
              <p className="text-sm text-[var(--text-secondary)]">{description}</p>
            </div>
          )}
        </div>
        
        {error && (
          <p className="error-text">{error}</p>
        )}
      </div>
    );
  } catch (error) {
    console.error('FileUpload component error:', error);
    return null;
  }
}