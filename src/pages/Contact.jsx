import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (formData.name && formData.email && formData.subject && formData.message) {
      console.log('Form submitted:', formData)
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      setTimeout(() => {
        setSubmitted(false)
      }, 3000)
    } else {
      alert('Please fill in all fields!')
    }
  }

  return (
    <div className="page contact-page">
      <h1>📧 Contact Us</h1>
      <p>
        Have questions or feedback? We'd love to hear from you! Fill out the 
        form below and we'll get back to you as soon as possible.
      </p>

      <div className="contact-container">
        <div className="contact-form-wrapper">
          {submitted ? (
            <div className="success-message">
              <h3>✅ Thank You!</h3>
              <p>Your message has been sent successfully. We'll get back to you soon!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject:</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  rows="6"
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          )}
        </div>

        <div className="contact-info">
          <h2>Other Ways to Reach Us</h2>
          <div className="info-item">
            <h3>📍 Location</h3>
            <p>Training Center, Tech City</p>
          </div>
          <div className="info-item">
            <h3>📞 Phone</h3>
            <p>+1 (555) 123-4567</p>
          </div>
          <div className="info-item">
            <h3>💌 Email</h3>
            <p>info@reacttraining.com</p>
          </div>
          <div className="info-item">
            <h3>🕐 Hours</h3>
            <p>Monday - Friday: 9 AM - 6 PM</p>
            <p>Saturday: 10 AM - 4 PM</p>
          </div>
        </div>
      </div>
    </div>
  )
}
