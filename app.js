class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">We're sorry, but something unexpected happened.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  try {
    const [formData, setFormData] = React.useState({
      teamName: '',
      department: '',
      year: '',
      studentName1: '',
      studentName2: '',
      studentName3: '',
      phoneNumber: '',
      email: '',
      ideaTitle: '',
      problemDescription: '',
      beneficiaries: '',
      ideaDescription: '',
      pitchDeck: null
    });

    const [errors, setErrors] = React.useState({});
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [showSuccess, setShowSuccess] = React.useState(false);

    const handleInputChange = (field, value) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: '' }));
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const validationErrors = validateForm(formData);
      
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setIsSubmitting(true);
      try {
        await submitForm(formData);
        setShowSuccess(true);
      } catch (error) {
        console.error('Form submission error:', error);
        alert('The Form has been sucessfully submitted.');
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="min-h-screen py-8 px-4" data-name="app" data-file="app.js">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary-color)] mb-4">
                Welcome to the Idea Clinic – Fueling Innovation!
              </h1>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                Organized by <strong>CITBIF & CITIL</strong>, this initiative is designed to identify and nurture breakthrough ideas from budding innovators.
                Selected teams will be eligible for the Idea Refinery Bootcamp, where they will receive intensive mentoring, prototyping support, and funding opportunities.
                Submit your ideas now and take the first step towards transforming them into impactful solutions!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <FormField
                label="Team Name *"
                value={formData.teamName}
                onChange={(value) => handleInputChange('teamName', value)}
                error={errors.teamName}
                placeholder="Enter your team name"
              />

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  label="Department *"
                  value={formData.department}
                  onChange={(value) => handleInputChange('department', value)}
                  error={errors.department}
                  placeholder="Select your department"
                  type="select"
                  options={[
                    'Artificial Intelligence and Data Sciences',
                    'Computer Science & Business Systems',
                    'Computer Science & Engineering',
                    'CSE (Cyber Security)',
                    'CSE (AI and Machine Learning)',
                    'Information Technology',
                    'Electronics and Communication Engineering',
                    'ECE (Advanced Comm. Technology)',
                    'EC (VLSI Design & Technology)',
                    'Biomedical Engineering',
                    'Electrical & Electronics Engineering',
                    'Mechatronics Engineering',
                    'Mechanical Engineering',
                    'Civil Engineering',
                    'Alumni'
                  ]}
                />
                <FormField
                  label="Year *"
                  value={formData.year}
                  onChange={(value) => handleInputChange('year', value)}
                  error={errors.year}
                  placeholder="Select your year"
                  type="select"
                  options={[
                    'First',
                    'Second',
                    'Third',
                    'Fourth',
                    'Others'
                  ]}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <FormField
                  label="Student Name 1 *"
                  value={formData.studentName1}
                  onChange={(value) => handleInputChange('studentName1', value)}
                  error={errors.studentName1}
                  placeholder="First team member"
                />
                <FormField
                  label="Student Name 2"
                  value={formData.studentName2}
                  onChange={(value) => handleInputChange('studentName2', value)}
                  error={errors.studentName2}
                  placeholder="Second team member"
                />
                <FormField
                  label="Student Name 3"
                  value={formData.studentName3}
                  onChange={(value) => handleInputChange('studentName3', value)}
                  error={errors.studentName3}
                  placeholder="Third team member"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  label="Phone Number *"
                  value={formData.phoneNumber}
                  onChange={(value) => handleInputChange('phoneNumber', value)}
                  error={errors.phoneNumber}
                  placeholder="10-digit phone number"
                />
                <FormField
                  label="Email ID *"
                  value={formData.email}
                  onChange={(value) => handleInputChange('email', value)}
                  error={errors.email}
                  placeholder="your.email@example.com"
                  type="email"
                />
              </div>

              <FormField
                label="Idea Title *"
                value={formData.ideaTitle}
                onChange={(value) => handleInputChange('ideaTitle', value)}
                error={errors.ideaTitle}
                placeholder="Give your idea a compelling title"
              />

              <FormField
                label="What Problem Does It Solve? *"
                value={formData.problemDescription}
                onChange={(value) => handleInputChange('problemDescription', value)}
                error={errors.problemDescription}
                placeholder="Describe the problem your idea addresses..."
                type="textarea"
                rows={4}
              />

              <FormField
                label="Who Will Benefit? *"
                value={formData.beneficiaries}
                onChange={(value) => handleInputChange('beneficiaries', value)}
                error={errors.beneficiaries}
                placeholder="Identify your target audience and stakeholders..."
                type="textarea"
                rows={4}
              />

              <FormField
                label="Idea Description *"
                value={formData.ideaDescription}
                onChange={(value) => handleInputChange('ideaDescription', value)}
                error={errors.ideaDescription}
                placeholder="Provide a detailed description of your innovative solution..."
                type="textarea"
                rows={6}
              />

              <div className="max-w-md mx-auto">
                <FileUpload
                  label="Upload Pitch Deck"
                  file={formData.pitchDeck}
                  onChange={(file) => handleInputChange('pitchDeck', file)}
                  error={errors.pitchDeck}
                  accept=".pdf,.ppt,.pptx"
                  maxSize={20}
                  description="PDF, PPT, PPTX (max 20 MB)"
                />
              </div>

              <div className="text-center pt-6" flex item-center justify-center>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full md:w-auto flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <div className="icon-send text-lg"></div>
                      Submit Your Idea
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {showSuccess && (
          <SuccessModal onClose={() => setShowSuccess(false)} />
        )}
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
