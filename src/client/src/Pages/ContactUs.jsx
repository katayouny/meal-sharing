import "./ContactUs.css";
function Contact() {
  return (
    <div className="contact-us-container">
      <h2 className="contact-us-title">We love to hear from you</h2>
      <div className="contac-us-text-container">
        <p>
          Have questions, feedback, or just want to say hello? We'd love to hear
          from you! Get in touch with us using the contact information below:
        </p>
        <br />
        <b>General Inquiries: </b>
        <br />
        <b>Email:</b> info@meal-sharing.com
        <br />
        <b>Mobile:</b> +45 71341197
        <p>
          <b>Customer Support: </b> For assistance with account issues,
          technical support, or any other inquiries, please contact our
          dedicated customer support team
          <br />
          <b>Email: </b>
          <a href="mailto:k.yousefzadeh@gmail.com" style={{ color: "#001d0b" }}>
            support@meal-sharing.com
          </a>
          <br />
          <b>Mobile:</b> +45 71341197
        </p>
        <p>
          <b>Address:</b> Meal Sharing App, Aalborg Sø, Denmark, 9210,
        </p>
        <p>
          Social Media: Connect with us on social media for the latest updates,
          recipes, and community events:
        </p>
        <div>
          <a href="#" target="_blank" rel="noopener noreferrer">
            {" "}
            Facebook |{" "}
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            {" "}
            Instagram |
          </a>
          <a
            href="https://www.linkedin.com/in/katayoun-yousefzadeh/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            LinkedIn{" "}
          </a>
        </div>
        <p>
          We strive to respond to all inquiries promptly. Thank you for reaching
          out!
        </p>
      </div>
    </div>
  );
}

export default Contact;
