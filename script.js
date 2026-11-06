
let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

// Save jobs in Local Storage
function saveJobs() {
    localStorage.setItem("jobs", JSON.stringify(jobs));
}

// Display all jobs
function displayJobs() {
    const table = document.querySelector("tbody");
    table.innerHTML = "";

    jobs.forEach(function(job, index) {
        const row = table.insertRow();

        // Company
        row.insertCell(0).textContent = job.company;

        // Position
        row.insertCell(1).textContent = job.position;

        // Status
        const statusCell = row.insertCell(2);
        statusCell.textContent = job.status;
        statusCell.className = job.status.toLowerCase();

        // Action buttons
        const actionCell = row.insertCell(3);

        // Edit Button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";

        editBtn.onclick = function() {
            const newCompany = prompt("Enter Company Name:", job.company);
            if (newCompany === null) return;

            const newPosition = prompt("Enter Position:", job.position);
            if (newPosition === null) return;

            const newStatus = prompt(
                "Enter Status (Applied, Interview, Selected):",
                job.status
            );

            if (newStatus === null) return;

            if (!newCompany.trim() || !newPosition.trim()) {
                alert("Please enter all details!");
                return;
            }

            if (!["Applied", "Interview", "Selected"].includes(newStatus)) {
                alert("Invalid Status!");
                return;
            }

            jobs[index].company = newCompany.trim();
            jobs[index].position = newPosition.trim();
            jobs[index].status = newStatus;

            saveJobs();
            displayJobs();
            updateCounts();

            alert("Job Updated Successfully!");
        };

        // Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.onclick = function() {
            const confirmDelete = confirm("Are you sure you want to delete this job?");

            if (confirmDelete) {
                jobs.splice(index, 1);

                saveJobs();
                displayJobs();
                updateCounts();

                alert("Job Deleted Successfully!");
            }
        };

        actionCell.appendChild(editBtn);
        actionCell.appendChild(deleteBtn);
    });
}

// Dashboard Auto Count
function updateCounts() {
    document.getElementById("totalCount").textContent = jobs.length;

    document.getElementById("appliedCount").textContent =
        jobs.filter(job => job.status === "Applied").length;

    document.getElementById("interviewCount").textContent =
        jobs.filter(job => job.status === "Interview").length;

    document.getElementById("selectedCount").textContent =
        jobs.filter(job => job.status === "Selected").length;
}

// Open Add Job Form
function openForm() {
    document.getElementById("jobModal").style.display = "flex";
}

// Close Add Job Form
function closeForm() {
    document.getElementById("jobModal").style.display = "none";
}

// Add New Job
function addJob() {
    const company = document.getElementById("company").value.trim();
    const position = document.getElementById("position").value.trim();
    const status = document.getElementById("status").value;

    if (!company || !position) {
        alert("Please enter all details!");
        return;
    }

    jobs.push({
        company: company,
        position: position,
        status: status
    });

    saveJobs();
    displayJobs();
    updateCounts();

    document.getElementById("company").value = "";
    document.getElementById("position").value = "";

    closeForm();

    alert("Job Saved Successfully!");
}

// Load jobs when website opens
displayJobs();
updateCounts();

function searchJobs() {
    filterAndDisplayJobs();
}

function filterJobs() {
    filterAndDisplayJobs();
}

function filterAndDisplayJobs() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    const selectedStatus = document.getElementById("statusFilter").value;

    const table = document.querySelector("tbody");
    table.innerHTML = "";

    jobs.forEach(function(job, index) {
        const matchesSearch =
            job.company.toLowerCase().includes(searchValue) ||
            job.position.toLowerCase().includes(searchValue);

        const matchesStatus =
            selectedStatus === "All" || job.status === selectedStatus;

        if (matchesSearch && matchesStatus) {
            const row = table.insertRow();

            row.insertCell(0).textContent = job.company;
            row.insertCell(1).textContent = job.position;

            const statusCell = row.insertCell(2);
            statusCell.textContent = job.status;
            statusCell.className = job.status.toLowerCase();

            const actionCell = row.insertCell(3);

            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";

            editBtn.onclick = function() {
                const newCompany = prompt("Company Name:", job.company);
                if (newCompany === null) return;

                const newPosition = prompt("Position:", job.position);
                if (newPosition === null) return;

                const newStatus = prompt(
                    "Status (Applied, Interview, Selected):",
                    job.status
                );
                if (newStatus === null) return;

                if (!newCompany.trim() || !newPosition.trim()) {
                    alert("Please enter all details!");
                    return;
                }

                if (!["Applied", "Interview", "Selected"].includes(newStatus)) {
                    alert("Invalid Status!");
                    return;
                }

                jobs[index].company = newCompany.trim();
                jobs[index].position = newPosition.trim();
                jobs[index].status = newStatus;

                saveJobs();
                displayJobs();
                updateCounts();
            };

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";

            deleteBtn.onclick = function() {
                if (confirm("Delete this job?")) {
                    jobs.splice(index, 1);
                    saveJobs();
                    displayJobs();
                    updateCounts();
                }
            };

            actionCell.appendChild(editBtn);
            actionCell.appendChild(deleteBtn);
        }
    });
}
