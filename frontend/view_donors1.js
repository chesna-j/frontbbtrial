const donorsTableBody = document.getElementById('donors');

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
            donorsTableBody.innerHTML = ''; // Clear the table body
            data.forEach(donor => {
                const row = document.createElement('tr');

                // Format the DOB without timestamp
                const dob = new Date(donor.DOB);
                const formattedDOB = dob.toISOString().split('T')[0]; // This gets YYYY-MM-DD

                // Create table cells for each piece of donor data
                row.innerHTML = `
                    <td>${donor.donor_name}</td>
                    <td>${donor.gender}</td>
                    <td>${formattedDOB}</td>
                    <td>${donor.phone_no}</td>
                    <td>${donor.address}</td>
                    <td>${donor.weight}</td>
                    <td>${donor.blood_pressure}</td>
                    <td>${donor.iron_content}</td>
                    <td>${donor.doctor_id}</td>
                `;

                // Append the row to the table body
                donorsTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching donors:', error));
}

// Call fetchDonors when the DOM content is loaded
document.addEventListener('DOMContentLoaded', fetchDonors);