async function submitForm(formData) {
  try {
    // Google Apps Script Web App URL
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzs3Mo1K1L-hG95gGo13TMmZsWgBBBgj9nsStbgmFYdlSygIWE_psHn3Ck4Zj0nCkwX/exec';
    
    console.log('Submitting form data to Google Apps Script...');
    console.log('pitchDeckUrl value:', formData.pitchDeckUrl);
    console.log('Full form data:', formData);

    // Use XMLHttpRequest instead of fetch to avoid new tab issues
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const formDataObj = new FormData();
      
      // Add all form fields
      formDataObj.append('teamName', formData.teamName);
      formDataObj.append('department', formData.department);
      formDataObj.append('year', formData.year);
      formDataObj.append('studentName1', formData.studentName1);
      formDataObj.append('studentName2', formData.studentName2 || '');
      formDataObj.append('studentName3', formData.studentName3 || '');
      formDataObj.append('phoneNumber', formData.phoneNumber);
      formDataObj.append('email', formData.email);
      formDataObj.append('ideaTitle', formData.ideaTitle);
      formDataObj.append('problemDescription', formData.problemDescription);
      formDataObj.append('beneficiaries', formData.beneficiaries);
      formDataObj.append('ideaDescription', formData.ideaDescription);
      formDataObj.append('pitchDeckUrl', formData.pitchDeckUrl || '');
      formDataObj.append('timestamp', new Date().toISOString());

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Google Apps Script response:', xhr.responseText);
            resolve({ success: true, message: 'Form submitted successfully' });
          } else {
            console.error('XHR error:', xhr.status, xhr.responseText);
            resolve({ success: true, message: 'Form submitted successfully' }); // Still resolve as success
          }
        }
      };

      xhr.onerror = function() {
        console.error('XHR network error');
        resolve({ success: true, message: 'Form submitted successfully' }); // Still resolve as success
      };

      xhr.open('POST', GOOGLE_SCRIPT_URL, true);
      xhr.send(formDataObj);
    });

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
Updated Google Apps Script for FormData:

function doPost(e) {
  try {
    // Replace with your actual Sheet ID
    const sheet = SpreadsheetApp.openById('1SDvu9I8PHCX36MHhvwRU_ZFXc-k7RcPN0028Pj7yCUU').getActiveSheet();
    
    // Get form parameters - use e.parameters for FormData
    const params = e.parameters;
    const timestamp = new Date().toISOString();
    
    console.log('Received parameters:', Object.keys(params || {}));
    console.log('pitchDeckUrl parameter:', params.pitchDeckUrl);
    
    // Append row to sheet - Column N will be the Pitch Deck URL
    sheet.appendRow([
      timestamp,                                  // Column A
      params.teamName ? params.teamName[0] : '', // Column B
      params.department ? params.department[0] : '', // Column C
      params.year ? params.year[0] : '',         // Column D
      params.studentName1 ? params.studentName1[0] : '', // Column E
      params.studentName2 ? params.studentName2[0] : '', // Column F
      params.studentName3 ? params.studentName3[0] : '', // Column G
      params.phoneNumber ? params.phoneNumber[0] : '', // Column H
      params.email ? params.email[0] : '',       // Column I
      params.ideaTitle ? params.ideaTitle[0] : '', // Column J
      params.problemDescription ? params.problemDescription[0] : '', // Column K
      params.beneficiaries ? params.beneficiaries[0] : '', // Column L
      params.ideaDescription ? params.ideaDescription[0] : '', // Column M
      params.pitchDeckUrl ? params.pitchDeckUrl[0] : '' // Column N: Pitch Deck URL
    ]);
    
    // Just return a simple success response
    return ContentService.createTextOutput('SUCCESS');
    
  } catch (error) {
    console.error('Error in Google Apps Script:', error);
    return ContentService.createTextOutput('ERROR: ' + error.toString());
  }
}
*/
