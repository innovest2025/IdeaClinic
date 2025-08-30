function validateForm(formData) {
  try {
    const errors = {};

    // Required field validation
    if (!formData.teamName?.trim()) {
      errors.teamName = 'Team name is required';
    }

    if (!formData.department?.trim()) {
      errors.department = 'Department is required';
    }

    if (!formData.year?.trim()) {
      errors.year = 'Year is required';
    }

    if (!formData.studentName1?.trim()) {
      errors.studentName1 = 'At least one student name is required';
    }

    if (!formData.phoneNumber?.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      errors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.ideaTitle?.trim()) {
      errors.ideaTitle = 'Idea title is required';
    }

    if (!formData.problemDescription?.trim()) {
      errors.problemDescription = 'Problem description is required';
    } else if (formData.problemDescription.trim().length < 50) {
      errors.problemDescription = 'Please provide a more detailed description (at least 50 characters)';
    }

    if (!formData.beneficiaries?.trim()) {
      errors.beneficiaries = 'Beneficiaries description is required';
    } else if (formData.beneficiaries.trim().length < 30) {
      errors.beneficiaries = 'Please provide more details about who will benefit (at least 30 characters)';
    }

    if (!formData.ideaDescription?.trim()) {
      errors.ideaDescription = 'Idea description is required';
    } else if (formData.ideaDescription.trim().length < 100) {
      errors.ideaDescription = 'Please provide a more detailed idea description (at least 100 characters)';
    }

    return errors;
  } catch (error) {
    console.error('Validation error:', error);
    return {};
  }
}