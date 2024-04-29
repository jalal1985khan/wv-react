// components/ContactForm.js

import { useState } from 'react';
import axios from 'axios';
import { Col, Row, Container } from 'react-bootstrap'
import { RotatingLines } from 'react-loader-spinner'
import ServerConfig from '../config.json'


const ContactForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        businessEmail: '',
        businessPhoneNumber: '',
        message:'',
    });
    const isBlank = (str) => {
        return !str.trim();
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
        setLoader(false);
    };

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [formVisible, setFormVisible] = useState(true);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // if (isBlank(formData.fullName)) {
        //     setError('Please enter a full name.');
        //     setIsSubmitting(false);
        //     return;
        // }

        // if (isBlank(formData.businessEmail)) {
        //     setError('Please enter a Email.');
        //     setIsSubmitting(false);
        //     return;
        // }


        // if (isBlank(formData.message)) {
        //     setError('Please enter a Message.');
        //     setIsSubmitting(false);
        //     return;
        // }

        try {
            const response = await axios.post(
                'https://beta.upfront.global/wp-json/contact-form-7/v1/contact-forms/3664/feedback',
                formData,
                 {
                    headers: {
                        "Content-Type": 'multipart/form-data',
                    }
        
         
        });
            console.log(response.data.status);
            if (response.data.status === 'mail_sent') {
                setFormVisible(false); // Hide the form
                setSuccessMessage('Thank you for your submission!');
            } else {
                const fieldErrors = {};
                const { status, invalid_fields } = response.data;
                invalid_fields.forEach((field) => {
                    fieldErrors[field.field] = field.message;
                });
                setErrors(fieldErrors);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }

        setIsSubmitting(false);
    };

    return (
<div className="form-bg">

  {formVisible ? (           

<form onSubmit={handleSubmit} encType='multipart/form-data'>
<Row>
<Col>
<div className="mb-3">
<label for="firstName" className="form-label">Full Name <span class="required">*</span> </label>
                             
<input
type="text"
name="fullName"
className={`form-control ${errors && errors.fullName ? 'is-invalid' : ''}`}
id="fullName"
placeholder="Full Name"
value={formData.fullName}
onChange={handleChange}
                                />
                                {errors && errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                                
</div>
</Col>
                       
</Row>
<Row>

<Col>
<div className="mb-3">
<label for="businessEmail" className="form-label">Email <span class="required">*</span></label>                            
<input
type="text"
name="businessEmail"
className={`form-control ${errors && errors.businessEmail ? 'is-invalid' : ''}`}
id="businessEmail"                                
placeholder="Email"
value={formData.businessEmail}
onChange={handleChange}
                                />
                            {errors && errors.businessEmail && <div className="invalid-feedback">{errors.businessEmail}</div>}
                            </div>
</Col>
</Row>
<Row>
<Col sm={12}>
<div className="mb-3">
<label for="country" className="form-label">Message <span class="required">*</span></label>                            
                                < textarea type='text' id="message"
                                    className={`form-control ${errors && errors.message ? 'is-invalid' : ''}`}
                                    value={formData.message}
                                    onChange={handleChange}
                                    name='message'
                                    rows="4" 
                                    cols="50" /> 
                                {errors && errors.message && <div className="invalid-feedback">{errors.message}</div>}
                                                       
</div>                                
</Col>
</Row>
                    <Row>
<Col sm={12}>
<button type="submit" className="btn b-btn text-white" disabled={isSubmitting}>
Send Message
                            { isSubmitting &&
                                <RotatingLines
                                    strokeColor="white"
                                    strokeWidth="3"
                                    animationDuration="1"
                                    width="20"
                                    visible={true}
                                />
                            }
</button>
                   
                    </Col></Row>
{error && <p className="error">{error}</p>}
</form> 
            ) : (
                    <Container>
                        <h2>Thank you for you interest</h2>
                        <p>We will get back to you soon.</p>
                </Container>
            )}
</div>
    );
};

export default ContactForm;
