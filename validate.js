document.addEventListener('DOMContentLoaded', function () {
    const forms = document.querySelectorAll('.needs-validation');

    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (form.id === 'registration-form') {
                const password = document.getElementById('reg-password');
                const confirmPassword = document.getElementById('reg-confirmPassword');
                const confirmFeedback = document.getElementById('confirm-pass-feedback');

                if (password && confirmPassword) {
                    if (password.value !== confirmPassword.value) {
                        confirmPassword.setCustomValidity("Passwords do not match");
                        if (confirmFeedback) confirmFeedback.textContent = "Passwords do not match!";
                    } else {
                        confirmPassword.setCustomValidity("");
                    }
                }
            }

            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                alert('Form submitted successfully!');
            }

            form.classList.add('was-validated');
        }, false);
    });

    const passInput = document.getElementById('reg-password');
    const confirmInput = document.getElementById('reg-confirmPassword');

    if (confirmInput && passInput) {
        confirmInput.addEventListener('input', () => {
            if (confirmInput.value === passInput.value) {
                confirmInput.setCustomValidity('');
            } else {
                confirmInput.setCustomValidity('Mismatch');
            }
        });
    }

    document.querySelectorAll('button[type="reset"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const form = e.target.closest('form');
            if (form) form.classList.remove('was-validated');
        });
    });
});
