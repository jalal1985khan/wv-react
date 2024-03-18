export default async function handler(req, res) {
    const formData = req.body;
  
    try {
      // Forward the form data to Contact Form 7 endpoint on WordPress
      const response = await fetch('https://beta.walmartvriddhi.org/wp-json/contact-form-7/v1/contact-forms/27012/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        // Successful form submission
        res.status(200).json({ success: true, message: data.message });
      } else {
        // Failed form submission
        res.status(400).json({ success: false, message: 'Form submission failed.' });
      }
    } catch (error) {
      // Error handling
      console.error('Error submitting form:', error);
      res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  }