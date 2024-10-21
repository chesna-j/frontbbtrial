const donorsList = document.getElementById('donors');

// Function to fetch donors from the server
function fetchDonors() {
    fetch('http://localhost:3000/donors') // Adjust your server's IP address
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Log data to check structure
            donorsList.innerHTML = ''; // Clear the list
            data.forEach(donor => {
                const li = document.createElement('li');

                // Format the DOB without timestamp
                const dob = new Date(donor.DOB);
                const formattedDOB = dob.toISOString().split('T')[0]; // This gets YYYY-MM-DD

                // Display the donor information without blood bank and blood type
                li.textContent = `Donor Name: ${donor.donor_name}, Gender: ${donor.gender}, DOB: ${formattedDOB}, Phone No: ${donor.phone_no}, Address: ${donor.address}, Weight: ${donor.weight}, Blood Pressure: ${donor.blood_pressure}, Iron Content: ${donor.iron_content}, Doctor ID: ${donor.doctor_id}`;

                // Append the list item
                donorsList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching donors:', error));
}

// Call fetchDonors when the DOM content is loaded
document.addEventListener('DOMContentLoaded', fetchDonors);
