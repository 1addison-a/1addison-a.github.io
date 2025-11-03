// generate_html.js

// Helper function to escape HTML characters for display
function escapeHTMLForDisplay(html) {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}

function generateHTML() {
  const form = document.getElementById('introForm');
  const resultDiv = document.getElementById('result');
  
  // Validate form
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  
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
  // Check if uploadedImageData exists from introduction.js
  const imageSrc = (typeof uploadedImageData !== 'undefined' && uploadedImageData) 
    ? uploadedImageData 
    : document.getElementById('previewImg').src;
  
  // Get bullets
  const bullets = [];
  for (let i = 1; i <= 7; i++) {
    const bulletElement = document.getElementById(`bullet${i}`);
    if (bulletElement) {
      bullets.push(bulletElement.value);
    }
  }
  
  // Get courses
  const courseDepts = form.querySelectorAll('input[name="courseDept[]"]');
  const courseNums = form.querySelectorAll('input[name="courseNum[]"]');
  const courseNames = form.querySelectorAll('input[name="courseName[]"]');
  const courseReasons = form.querySelectorAll('textarea[name="courseReason[]"]');
  
  const courses = [];
  for (let i = 0; i < courseDepts.length; i++) {
    courses.push({
      dept: courseDepts[i].value,
      num: courseNums[i].value,
      name: courseNames[i].value,
      reason: courseReasons[i].value
    });
  }
  
  // Build full name with nickname
  let fullName = firstName;
  if (middleName) fullName += ` ${middleName}`;
  if (nickname) fullName += ` "${nickname}"`;
  fullName += ` ${lastName}`;
  
  // Build mascot title
  const mascotTitle = `${fullName} ${divider} ${mascotAdj} ${mascotAnimal}`;
  
  // Build the HTML code as a STRING (not rendered HTML)
  let htmlCode = `<h2>Introduction HTML</h2>
<h3>${mascotTitle}</h3>
<figure>
    <img src="${imageSrc}" alt="${fullName}" />
    <figcaption>${caption}</figcaption>
</figure>

<p>${personalStatement}</p>

<ul>
    <li><strong>Personal Background:</strong> ${bullets[0]}</li>
    <li><strong>Professional Background:</strong> ${bullets[1]}</li>
    <li><strong>Academic Background:</strong> ${bullets[2]}</li>
    <li><strong>Background in Web Development:</strong> ${bullets[3]}</li>
    <li><strong>Primary Computer Platform:</strong> ${bullets[4]}</li>
    <li><strong>Courses Currently Taking:</strong> ${bullets[5]}
        <ul>
`;
  
  // Add courses
  courses.forEach((course) => {
    htmlCode += `            <li><strong>${course.dept} ${course.num} - ${course.name}:</strong> ${course.reason}</li>\n`;
  });
  
  htmlCode += `        </ul>
    </li>
    <li><strong>Future Goals/Plans:</strong> ${bullets[6]}</li>
</ul>

<p><strong>Favorite Quote:</strong></p>
<p><em>"${quote}"</em></p>
<p><strong>- ${quoteAuthor}</strong></p>
`;
  
  // Add optional fields if filled
  if (funnyThing) {
    htmlCode += `\n<p><strong>Funny Thing:</strong> ${funnyThing}</p>`;
  }
  
  if (shareItem) {
    htmlCode += `\n<p><strong>Something I'd Like to Share:</strong> ${shareItem}</p>`;
  }
  
  // Escape HTML for display (so it shows as text, not rendered)
  const escapedHTML = escapeHTMLForDisplay(htmlCode);
  
  // Display the HTML code with syntax highlighting
  const displayHTML = `
    <h2>Introduction HTML</h2>
    <p>Below is the HTML code for your introduction. You can copy and paste this code:</p>
    <section>
      <pre><code class="language-html">${escapedHTML}</code></pre>
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