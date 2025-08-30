# Idea Clinic Webform

## Project Overview
A responsive webform for the "Idea Clinic - Fueling Innovation" initiative organized by CITBIF & CITIL. The form collects innovative ideas from students and teams, with file upload capabilities and backend integration to Google Sheets and Google Drive.

## Features
- **Responsive Design**: Mobile-friendly layout using TailwindCSS
- **Form Validation**: Client-side validation for all required fields
- **File Upload**: Support for supporting documents and pitch decks
- **Modern UI**: Clean, professional design with smooth interactions
- **Backend Integration**: Ready for Google Apps Script integration

## Form Fields
- Team Name (required)
- Department (dropdown, required - 15 engineering departments + Alumni)
- Year (dropdown, required - First/Second/Third/Fourth/Others)
- Student Names (1-3 members, first required)
- Phone Number (10-digit validation, required)
- Email ID (email validation, required)
- Idea Title (required)
- Problem Description (required, min 50 chars)
- Beneficiaries (required, min 30 chars)
- Idea Description (required, min 100 chars)
- Pitch Deck (optional, PDF/PPT/PPTX, max 20MB)

## Setup Instructions
1. Create a new Google Sheets document for storing responses
2. Create a Google Drive folder for file uploads
3. Set up Google Apps Script with the provided code
4. Deploy the script as a web app and get the URL
5. Update the `GOOGLE_SCRIPT_URL` in `utils/formSubmission.js`
6. Replace `YOUR_SHEET_ID` and `YOUR_DRIVE_FOLDER_ID` in the Apps Script

## Technology Stack
- React 18 (production build)
- TailwindCSS for styling
- Lucide icons
- Google Apps Script for backend
- Google Sheets for data storage
- Google Drive for file storage

## File Structure
- `index.html` - Main HTML structure
- `app.js` - Main React application
- `components/` - Reusable React components
- `utils/` - Utility functions for validation and form submission
- `trickle/assets/` - Project assets and resources
- `trickle/notes/` - Project documentation

## Google Apps Script Setup

### Step 1: Create Google Sheets
1. Go to Google Sheets and create a new spreadsheet
2. Name it "Idea Clinic Submissions"
3. Create headers in the first row:
   - A1: Timestamp
   - B1: Team Name
   - C1: Department
   - D1: Year
   - E1: Student Name 1
   - F1: Student Name 2
   - G1: Student Name 3
   - H1: Phone Number
   - I1: Email
   - J1: Idea Title
   - K1: Problem Description
   - L1: Beneficiaries
   - M1: Idea Description
   - N1: Pitch Deck Link

### Step 2: Create Google Drive Folder
1. Create a new folder in Google Drive
2. Name it "Idea Clinic Files"
3. Copy the folder ID from the URL

### Step 3: Deploy Google Apps Script
1. Open Google Apps Script (script.google.com)
2. Create a new project
3. Replace the default code with the code provided in `utils/formSubmission.js`
4. Update `YOUR_SHEET_ID` and `YOUR_DRIVE_FOLDER_ID` with actual IDs
5. Deploy as a web app with execute permissions for "Anyone"
6. Copy the deployment URL

### Step 4: Update Frontend
1. Replace `YOUR_SCRIPT_ID` in `utils/formSubmission.js` with your deployment URL
2. Uncomment the fetch code and remove the simulation code

## Form Validation Rules
- Team Name: Required
- Department: Required (dropdown selection from 15 departments + Alumni)
- Year: Required (dropdown selection from First/Second/Third/Fourth/Others)
- Student Name 1: Required (minimum one team member)
- Phone Number: Required, must be exactly 10 digits
- Email: Required, must be valid email format
- Idea Title: Required
- Problem Description: Required, minimum 50 characters
- Beneficiaries: Required, minimum 30 characters
- Idea Description: Required, minimum 100 characters
- File uploads: Optional, with size and format validation

## Security Considerations
- File size limits enforced on frontend and backend
- File type validation for uploads
- Input sanitization for all form fields
- Error handling for failed submissions

## Browser Support
- Modern browsers with ES6+ support
- Mobile responsive design
- Touch-friendly file upload interface

## Maintenance Notes
- Update README.md whenever project structure or setup instructions change
- Monitor Google Apps Script quotas for high-volume usage
- Regularly backup Google Sheets data
- Test file upload functionality after any backend changes

## Copyright
© 2025 CITBIF & CITIL. All rights reserved.
