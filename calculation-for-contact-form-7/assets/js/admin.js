document.querySelectorAll('.decimal_sep').forEach(function(input) {
    input.addEventListener('keypress', function(event) {
        setTimeout(function() {
            // Get the current value of the input
            let value = input.value;

            // Replace commas with the word 'comma'
            let updatedValue = value.replace(/,/g, 'comma');

            // Set the updated value back to the input field
            input.value = updatedValue;
        }, 0);
    });
});

document.querySelectorAll('.thousand_sep').forEach(function(input) {
    input.addEventListener('keypress', function(event) {
        setTimeout(function() {
            // Get the current value of the input
            let value = input.value;

            // Replace commas with the word 'comma'
            let updatedValue = value.replace(/,/g, 'comma');

            // Set the updated value back to the input field
            input.value = updatedValue;
        }, 0);
    });
});
