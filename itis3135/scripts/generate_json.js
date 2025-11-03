// generate_json.js

// Helper function to escape HTML characters for JSON display
function escapeJSONForDisplay(json) {
  const div = document.createElement('div');
  div.textContent = json;
  return div.innerHTML;
}

function generateJSON() {
  console.log('generateJSON called');
  
  const form = document.getElementById('introForm');
  const resultDiv = document.getElementById('result');
  
  if (!form) {
    console.error('Form not found');
    return;
  }
  
  if (!resultDiv) {
    console.error('Result div not found');
    return;
  }
  
  // Validate form
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  
  console.log('Form is valid, gathering data...');
  
  // Get all form values
  const firstName = document.getElementById('firstName').value;
  const middleName = document.getElementById('middleName').value;
  const nickname = document.getElementById('nickname').value;
  const lastName = document.getElementById('lastName').value;
  const mascotAdj = document.getElementById('mascotAdj').value;
  const mascotAnimal = document.getElementById('mascotAnimal').value;
  const divider = document.getElementById('divider').value;
  const caption = document.getElementById('caption').value;
  const personalStatement = document.getElementById('personalStatement').value;
  const quote = document.getElementById('quote').value;
  const quoteAuthor = document.getElementById('quoteAuthor').value;
  const funnyThing = document.getElementById('funnyThing').value;
  const shareItem = document.getElementById('shareItem').value;
  
  // Get image source (uploaded or default)
  const imageSrc = (typeof uploadedImageData !== 'undefined' && uploadedImageData) 
    ? uploadedImageData 
    : document.getElementById('previewImg').src;
  
  // Get bullets
  const personalBackground = document.getElementById('bullet1').value;
  const professionalBackground = document.getElementById('bullet2').value;
  const academicBackground = document.getElementById('bullet3').value;
  const subjectBackground = document.getElementById('bullet4').value;
  const primaryComputer = document.getElementById('bullet5').value;
  const coursesCurrently = document.getElementById('bullet6').value;
  const futureGoals = document.getElementById('bullet7').value;
  
  // Get courses
  const courseDepts = form.querySelectorAll('input[name="courseDept[]"]');
  const courseNums = form.querySelectorAll('input[name="courseNum[]"]');
  const courseNames = form.querySelectorAll('input[name="courseName[]"]');
  const courseReasons = form.querySelectorAll('textarea[name="courseReason[]"]');
  
  const courses = [];
  for (let i = 0; i < courseDepts.length; i++) {
    courses.push({
      department: courseDepts[i].value,
      number: courseNums[i].value,
      name: courseNames[i].value,
      reason: courseReasons[i].value
    });
  }
  
  // Build JSON object matching the example structure
  const jsonData = {
    firstName: firstName,
    preferredName: nickname || firstName,
    middleInitial: middleName,
    lastName: lastName,
    divider: divider,
    mascotAdjective: mascotAdj,
    mascotAnimal: mascotAnimal,
    image: imageSrc,
    imageCaption: caption,
    personalStatement: personalStatement,
    personalBackground: personalBackground,
    professionalBackground: professionalBackground,
    academicBackground: academicBackground,
    subjectBackground: subjectBackground,
    primaryComputer: primaryComputer,
    coursesCurrentlyTaking: coursesCurrently,
    futureGoals: futureGoals,
    courses: courses,
    quote: quote,
    quoteAuthor: quoteAuthor,
    funnyThing: funnyThing,
    somethingToShare: shareItem
  };
  
  // Convert to pretty JSON string
  const jsonString = JSON.stringify(jsonData, null, 2);
  
  // Escape HTML for display
  const escapedJSON = escapeJSONForDisplay(jsonString);
  
  // Display the JSON code with syntax highlighting
  const displayHTML = `
    <h2>Introduction JSON</h2>
    <p>Below is the JSON data for your introduction. You can copy and paste this code:</p>
    <section>
      <pre><code class="language-json">${escapedJSON}</code></pre>
    </section>
    <div class="reset-link">
      <p><a href="#" onclick="resetToForm(); return false;">Start Over</a></p>
    </div>
  `;
  
  // Hide form and show results
  form.style.display = 'none';
  document.querySelector('.form-intro').style.display = 'none';
  resultDiv.innerHTML = displayHTML;
  resultDiv.classList.remove('hidden');
  
  // Apply syntax highlighting if Highlight.js is loaded
  if (typeof hljs !== 'undefined') {
    hljs.highlightAll();
  }
  
  // Scroll to results
  resultDiv.scrollIntoView({ behavior: 'smooth' });
}
