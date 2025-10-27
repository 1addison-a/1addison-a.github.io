let courseCount = 1;
let uploadedImageData = null;

// Function declarations first (hoisted)
function addCourse() {
  courseCount++;
  const coursesContainer = document.getElementById('coursesContainer');
  
  const courseDiv = document.createElement('div');
  courseDiv.className = 'course-entry';
  courseDiv.innerHTML = `
    <div class="course-title">Course ${courseCount}</div>
    <label>Department Code</label>
    <input type="text" name="courseDept[]" placeholder="e.g., ITSC" required>
    
    <label>Course Number</label>
    <input type="text" name="courseNum[]" placeholder="e.g., 3155" required>
    
    <label>Course Name</label>
    <input type="text" name="courseName[]" placeholder="Course name" required>
    
    <label>Reason for Taking</label>
    <textarea name="courseReason[]" rows="2" placeholder="Why are you taking this course?" required></textarea>
    
    <button type="button" class="remove-course" onclick="removeCourse(this)">Remove Course</button>
  `;
  
  coursesContainer.appendChild(courseDiv);
}

function removeCourse(button) {
  const courseEntry = button.closest('.course-entry');
  courseEntry.remove();
  
  // Renumber remaining courses
  const allCourses = document.querySelectorAll('.course-entry');
  allCourses.forEach((course, index) => {
    course.querySelector('.course-title').textContent = `Course ${index + 1}`;
  });
  
  courseCount = allCourses.length;
}

function resetCourses() {
  const coursesContainer = document.getElementById('coursesContainer');
  coursesContainer.innerHTML = `
    <div class="course-entry">
      <div class="course-title">Course 1</div>
      <label>Department Code</label>
      <input type="text" name="courseDept[]" value="ITSC" placeholder="e.g., ITSC" required>
      
      <label>Course Number</label>
      <input type="text" name="courseNum[]" value="3155" placeholder="e.g., 3155" required>
      
      <label>Course Name</label>
      <input type="text" name="courseName[]" value="Software Engineering" placeholder="Course name" required>
      
      <label>Reason for Taking</label>
      <textarea name="courseReason[]" rows="2" placeholder="Why are you taking this course?" required>To learn industry-standard software development practices and agile methodologies.</textarea>
    </div>
  `;
  courseCount = 1;
}

function displayResults() {
  const form = document.getElementById('introForm');
  const resultDiv = document.getElementById('result');
  
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
  const imageSrc = uploadedImageData || document.getElementById('previewImg').src;
  
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
  
  // Build the introduction page HTML
  let html = `
    <h2>${mascotTitle}</h2>
    
    <figure>
      <img src="${imageSrc}" alt="${fullName}">
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
  
  // Add courses as sub-bullets
  courses.forEach((course) => {
    html += `          <li><strong>${course.dept} ${course.num} - ${course.name}:</strong> ${course.reason}</li>\n`;
  });
  
  html += `        </ul>
      </li>
      <li><strong>Future Goals/Plans:</strong> ${bullets[6]}</li>
    </ul>
  `;
  
  // Add quote
  html += `
    <p><strong>Favorite Quote:</strong></p>
    <p><em>"${quote}"</em></p>
    <p><strong>- ${quoteAuthor}</strong></p>
  `;
  
  // Add optional fields if filled
  if (funnyThing) {
    html += `    <p><strong>Funny Thing:</strong> ${funnyThing}</p>\n`;
  }
  
  if (shareItem) {
    html += `    <p><strong>Something I'd Like to Share:</strong> ${shareItem}</p>\n`;
  }
  
  html += `
    <div class="reset-link">
      <p><a href="#" onclick="resetToForm(); return false;">Start Over</a></p>
    </div>
  `;
  
  // Hide form and show results
  form.style.display = 'none';
  document.querySelector('.form-intro').style.display = 'none';
  document.querySelector('h2').textContent = 'Introduction'; // 👈 change title
  resultDiv.innerHTML = html;
  resultDiv.classList.remove('hidden');
  
  // Scroll to results
  resultDiv.scrollIntoView({ behavior: 'smooth' });
}

function resetToForm() {
  const form = document.getElementById('introForm');
  const resultDiv = document.getElementById('result');
  
  // Show form, hide results
  form.style.display = 'flex';
  document.querySelector('.form-intro').style.display = 'block';
  document.querySelector('h2').textContent = 'Introduction Form'; // 👈 restore title
  resultDiv.classList.add('hidden');
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('introForm');
  const clearBtn = document.getElementById('clearBtn');
  const pictureInput = document.getElementById('picture');
  const previewImg = document.getElementById('previewImg');

  // Prevent default form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault(); 
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    displayResults();
  });

  // Reset button functionality
  form.addEventListener('reset', function() {
    setTimeout(() => {
      resetCourses();
      uploadedImageData = null;
      previewImg.src = 'images/addison.jpg';
      document.getElementById('result').classList.add('hidden');
    }, 10);
  });

  // Clear button empties all fields
  clearBtn.addEventListener('click', function() {
    form.querySelectorAll('input:not([type="file"]), textarea').forEach((el) => {
      el.value = '';
    });
    pictureInput.value = '';
    uploadedImageData = null;
    previewImg.src = 'images/addison.jpg';
    document.getElementById('result').classList.add('hidden');
    resetCourses();
  });

  // Image preview
  pictureInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        uploadedImageData = event.target.result;
        previewImg.src = uploadedImageData;
      };
      reader.readAsDataURL(file);
    }
  });
});
