async function submitForm(formData) {
  try {
    // Google Apps Script Web App URL - Replace with your actual deployment URL
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby2WMrwFYFzc17rO1MkDRVgFQjD6FltDlTdaF0rFb_5CMqSn8sk6ofL1Q4drDaXOy8w/exec';
    
    // Create FormData object to handle file uploads
    const submitData = new FormData();
    
    // Add all form fields
    submitData.append('teamName', formData.teamName);
    submitData.append('department', formData.department);
    submitData.append('year', formData.year);
    submitData.append('studentName1', formData.studentName1);
    submitData.append('studentName2', formData.studentName2 || '');
    submitData.append('studentName3', formData.studentName3 || '');
    submitData.append('phoneNumber', formData.phoneNumber);
    submitData.append('email', formData.email);
    submitData.append('ideaTitle', formData.ideaTitle);
    submitData.append('problemDescription', formData.problemDescription);
    submitData.append('beneficiaries', formData.beneficiaries);
    submitData.append('ideaDescription', formData.ideaDescription);
    submitData.append('timestamp', new Date().toISOString());
    
    // Add files if present
    if (formData.pitchDeck) {
      submitData.append('pitchDeck', formData.pitchDeck);
    }

    console.log('Submitting form data to Google Apps Script...');
    console.log('Form data keys:', Array.from(submitData.keys()));

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: submitData,
      mode: 'cors'  // Explicitly set CORS mode
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Response error:', errorText);
      throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('Google Apps Script response:', result);
    return result;

    // Simulation - remove this in production
    // await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
    
    // console.log('Form submitted successfully:', {
    //   teamName: formData.teamName,
    //   department: formData.department,
    //   email: formData.email,
    //   ideaTitle: formData.ideaTitle,
    //   timestamp: new Date().toISOString()
    // });

    // return { success: true, message: 'Form submitted successfully' };
    
  } catch (error) {
    console.error('Form submission error:', error);
    throw new Error('Failed to submit form. Please try again.');
  }
}

// Google Apps Script code for backend integration
// Save this as a new Google Apps Script project and deploy as a web app

/*
function doGet(e) {
  // Handle preflight OPTIONS request for CORS
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getActiveSheet();
    const folder = DriveApp.getFolderById('YOUR_DRIVE_FOLDER_ID');
    
    // For FormData, use e.parameters instead of e.parameter
    const params = e.parameters;
    const timestamp = new Date().toISOString();
    
    // Handle file uploads
    let pitchDeckUrl = '';
    
    if (params.pitchDeck && params.pitchDeck[0]) {
      const pitchDeckBlob = Utilities.newBlob(
        Utilities.base64Decode(params.pitchDeck[0]), 
        'application/octet-stream',
        `${params.teamName[0]}_pitch_deck_${timestamp}`
      );
      const pitchDeckFile = folder.createFile(pitchDeckBlob);
      pitchDeckUrl = pitchDeckFile.getUrl();
    }
    
    // Append row to sheet
    sheet.appendRow([
      timestamp,
      params.teamName ? params.teamName[0] : '',
      params.department ? params.department[0] : '',
      params.year ? params.year[0] : '',
      params.studentName1 ? params.studentName1[0] : '',
      params.studentName2 ? params.studentName2[0] : '',
      params.studentName3 ? params.studentName3[0] : '',
      params.phoneNumber ? params.phoneNumber[0] : '',
      params.email ? params.email[0] : '',
      params.ideaTitle ? params.ideaTitle[0] : '',
      params.problemDescription ? params.problemDescription[0] : '',
      params.beneficiaries ? params.beneficiaries[0] : '',
      params.ideaDescription ? params.ideaDescription[0] : '',
      pitchDeckUrl
    ]);
    
    return ContentService.createTextOutput(
      JSON.stringify({success: true, message: 'Form submitted successfully'})
    ).setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({success: false, error: error.toString()})
    ).setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
}
*/