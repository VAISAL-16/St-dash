import emailjs from '@emailjs/browser';

export const sendResetPasswordEmail = (toEmail, password) => {
  const templateParams = {
    email: toEmail,
    password: password,
  };

  return emailjs.send(
    'service_k27z0kq',         // 🔁 Replace with actual
    'template_w186l7r',        // 🔁 Replace with actual
    templateParams,
    'l7UCg_Uu2vDgrUG6x'          // 🔁 Replace with actual
  );
};
