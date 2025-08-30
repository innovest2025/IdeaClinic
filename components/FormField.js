function FormField({ label, value, onChange, error, placeholder, type = 'text', options = [], rows = 3 }) {
  try {
    const renderInput = () => {
      if (type === 'select') {
        return (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="form-input"
          >
            <option value="">Select department...</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      }

      if (type === 'textarea') {
        return (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            className="form-textarea"
          />
        );
      }

      return (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="form-input"
        />
      );
    };

    return (
      <div data-name="form-field" data-file="components/FormField.js">
        <label className="form-label">
          {label}
        </label>
        {renderInput()}
        {error && (
          <p className="error-text">{error}</p>
        )}
      </div>
    );
  }
  catch (error) {
    console.error('FormField component error:', error);
    return null;
}
