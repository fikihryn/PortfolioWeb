$(document).ready(function() {
    // Handle interest button selection
    $('.interest-buttons button').click(function() {
        $('.interest-buttons button').removeClass('selected');
        $(this).addClass('selected');
    });

    // Form validation and submission
    $('.kontak-form form').submit(function(e) {
        e.preventDefault();
        
        // Get form values
        const name = $(this).find('input[type="text"]').val().trim();
        const email = $(this).find('input[type="email"]').val().trim();
        const message = $(this).find('textarea').val().trim();
        const interest = $('.interest-buttons button.selected').text();
        
        // Basic validation
        if (!name) {
            showFormError('Nama tidak boleh kosong');
            return;
        }
        
        if (!email) {
            showFormError('Email tidak boleh kosong');
            return;
        }
        
        if (!validateEmail(email)) {
            showFormError('Format email tidak valid');
            return;
        }
        
        if (!message) {
            showFormError('Pesan tidak boleh kosong');
            return;
        }
        
        // Prepare form data
        const formData = {
            name: name,
            email: email,
            message: message,
            interest: interest
        };
        
        // Show loading state
        const submitButton = $(this).find('button[type="submit"]');
        const originalText = submitButton.html();
        submitButton.html('<i class="fas fa-spinner fa-spin"></i> Mengirim...');
        submitButton.prop('disabled', true);
        
        // Simulate AJAX submission (replace with actual AJAX call to backend)
        setTimeout(function() {
            // Reset form
            $('.kontak-form form')[0].reset();
            
            // Show success message
            showFormSuccess('Pesan berhasil dikirim! Kami akan menghubungi Anda segera.');
            
            // Reset button
            submitButton.html(originalText);
            submitButton.prop('disabled', false);
        }, 1500);
    });
    
    // Email validation helper function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Show form error message
    function showFormError(message) {
        // Remove any existing messages
        removeFormMessages();
        
        // Create and insert error message
        const errorDiv = $('<div class="form-message error"></div>').text(message);
        $('.kontak-form form').prepend(errorDiv);
        
        // Auto-remove after 5 seconds
        setTimeout(function() {
            errorDiv.fadeOut(300, function() {
                $(this).remove();
            });
        }, 5000);
    }
    
    // Show form success message
    function showFormSuccess(message) {
        // Remove any existing messages
        removeFormMessages();
        
        // Create and insert success message
        const successDiv = $('<div class="form-message success"></div>').text(message);
        $('.kontak-form form').prepend(successDiv);
        
        // Auto-remove after 5 seconds
        setTimeout(function() {
            successDiv.fadeOut(300, function() {
                $(this).remove();
            });
        }, 5000);
    }
    
    // Remove existing form messages
    function removeFormMessages() {
        $('.form-message').remove();
    }
    
    // Add CSS for form messages
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .form-message {
                padding: 10px 15px;
                margin-bottom: 15px;
                border-radius: 5px;
                font-size: 14px;
            }
            .form-message.error {
                background-color: #ffe6e6;
                color: #d8000c;
                border: 1px solid #ffcccc;
            }
            .form-message.success {
                background-color: #e6ffe6;
                color: #006400;
                border: 1px solid #ccffcc;
            }
        `)
        .appendTo('head');
        
    // Add animation to the contact form
    $('.kontak-form').hide().fadeIn(1000);
    
    // Add a hover effect to the interest buttons
    $('.interest-buttons button').hover(
        function() {
            if (!$(this).hasClass('selected')) {
                $(this).addClass('hover');
            }
        },
        function() {
            $(this).removeClass('hover');
        }
    );
});
