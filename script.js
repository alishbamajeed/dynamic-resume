// Save data from form to localStorage and navigate to resume page
function saveData() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const experience = document.getElementById('experience').value;

    const resumeData = { name, email, experience };
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    window.location.href = 'resume.html';
}

// Load resume data on resume page
document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.endsWith('resume.html')) {
        const resumeData = JSON.parse(localStorage.getItem('resumeData'));
        document.getElementById('display-name').textContent = resumeData.name;
        document.getElementById('display-email').textContent = resumeData.email;
        document.getElementById('display-experience').textContent = resumeData.experience;

        // Update profile image
        document.getElementById('update-image-btn').addEventListener('click', function() {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            
            fileInput.onchange = function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        document.getElementById('profile-image').src = event.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            };
            fileInput.click();
        });

        // Download as PDF
        document.getElementById('download-btn').addEventListener('click', function() {
            const resume = document.getElementById('resume-container');
            html2canvas(resume).then(function(canvas) {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jspdf.jsPDF();
                pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
                pdf.save('resume.pdf');
            });
        });

        // Share functionality
        document.getElementById('share-btn').addEventListener('click', function() {
            const shareableLink = `${window.location.href}?resume=${Date.now()}`;
            navigator.clipboard.writeText(shareableLink).then(() => {
                alert('Unique resume link copied to clipboard!');
            });
        });
    }
});
