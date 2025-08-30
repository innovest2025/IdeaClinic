function SuccessModal({ onClose }) {
  try {
    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        data-name="success-modal" 
        data-file="components/SuccessModal.js"
      >
        <div className="bg-white rounded-xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="w-16 h-16 bg-[var(--success-color)] rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="icon-check text-2xl text-white"></div>
          </div>
          
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
            Thank You!
          </h2>
          
          <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
            Thank you for submitting your idea! Our team will get back to you soon.
          </p>
          
          <button
            onClick={onClose}
            className="btn-primary w-full"
          >
            Close
          </button>
        </div>
      </div>
    );
  } catch (error) {
    console.error('SuccessModal component error:', error);
    return null;
  }
}