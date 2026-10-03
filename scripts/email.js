// Same EmailJS service and template as the Divers portfolio demo.
// These are browser/public identifiers; the recipient is set in EmailJS.
export function sendContactEmail({ name, email, message }) {
    return window.emailjs.send('service_w5nij3o', 'template_lt3wy3w', {
        name,
        email,
        message,
    }, { publicKey: 'EKrNtEnXOOZc-5N7Y' });
}
