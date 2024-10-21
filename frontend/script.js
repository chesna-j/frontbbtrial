const donorForm = document.getElementById('donorForm');
const donorsList = document.getElementById('donors');

// Fetch donors when the page loads
document.addEventListener('DOMContentLoaded', () => {
        fetchBloodBanks(); // Fetch blood banks when the page loads
});


// Function to fetch blood banks from the backend and populate the dropdown
function fetchBloodBanks() {
    fetch('http://localhost:3000/blood_banks') // Adjust your server URL
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const bloodBankSelect = document.getElementById('bloodBankId');
            data.forEach(bloodBank => {
                const option = document.createElement('option');
                option.value = bloodBank.blood_bank_id; // Set the value as the ID
                option.textContent = bloodBank.blood_bank_name; // Set the display text as the name
                bloodBankSelect.appendChild(option); // Add the option to the dropdown
            });
        })
        .catch(error => console.error('Error fetching blood banks:', error));
}
// Handle form submission
donorForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission

    const donorData = {
        donor_name: document.getElementById('donorName').value,
        gender: document.getElementById('gender').value,
        DOB: document.getElementById('dob').value,
        phone_no: document.getElementById('mobileNumber').value,
        address: document.getElementById('address').value,
        weight: document.getElementById('weight').value,
        blood_pressure: document.getElementById('bloodPressure').value,
        iron_content: document.getElementById('ironContent').value,
        doctor_id: document.getElementById('doctorId').value, // Get doctor_id from the input field
    };

    // Create blood object
    const bloodData = {
        blood_type: document.getElementById('bloodType').value,
        blood_bank_id: document.getElementById('bloodBankId').value
    };

    console.log("Submitting donor data:", donorData); // Log donor data before sending

    // Send the donor object to the server
    fetch('http://localhost:3000/donors', { // Adjust your server's IP address
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(donorData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // After donor is created, send blood data
        const donorId = data.id; // Get the donor ID from response (make sure your backend returns the ID)

        const donorIdDisplay = document.getElementById('donorIdDisplay');
        donorIdDisplay.innerHTML = `<p>Donor ID: ${donorId}</p>`;
        
        return fetch('http://localhost:3000/blood', { // Use the blood endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                blood_type: bloodData.blood_type, 
                donor_id: donorId, 
                blood_bank_id: bloodData.blood_bank_id 
            }), // Send blood data
        });
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(bloodData => {
        console.log('Blood record created:', bloodData);
        fetchDonors(); // Refresh the donors list
        donorForm.reset(); // Clear the form
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

// Function to delete a donor
function deleteDonor(donorId) {
    console.log(`Deleting donor with ID: ${donorId}`); // Log donor ID before deletion
    fetch(`http://localhost:3000/donors/${donorId}`, { // Adjust your server's IP address
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            console.log('Donor deleted successfully');
            fetchDonors(); // Refresh the list after deletion
        } else {
            console.error('Failed to delete donor:', response.statusText);
        }
    })
    .catch(error => console.error('Error deleting donor:', error));
}
