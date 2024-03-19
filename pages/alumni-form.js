import axios from "axios";
import React, { useState } from "react";
import { useRouter } from 'next/router';
import { Container, Row, Col, Button } from 'react-bootstrap';
import configData from "../config.json";
import { NextSeo } from 'next-seo';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Form from 'react-bootstrap/Form';
import NewsLetter from '../components/NewsLetter'
import Floating from '../components/FloatingMenu'
import Popups from '../components/PopUps'
import Modal from 'react-bootstrap/Modal';
import contactForm from '../utils/Alumni'


export default function App() {

    const [loading, setLoading] = useState(false);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [show, setShow] = useState(false);
    const closeModal = () => {
        setShow(false);
      };

    const handleCheckboxChange = () => {
        setIsCheckboxChecked(!isCheckboxChecked);
    };

    const typeList = [
        { name: "Abhishek jha" },
        { name: "Abhishek KR" },
        { name: "Adarsh Samal" },
        { name: "Ahmed Amin" },
        { name: "Ajith Ranjan" },
        { name: "Amit Chouksey" },
        { name: "Amrit Kumar" },
        { name: "Ankit Makhwana" },
        { name: "Ankit Singh" },
        { name: "Anshul Gupta" },
        { name: "Anupam Chaurasia" },
        { name: "Anurag Singh" },
          { name: "Arun Kumar" },
          { name: "Aseem Kapoor" },
          { name: "Ashutosh Sharma" },
          { name: "Awesz Bukhari" },
          { name: "Balachandra Moger" },
          { name: "Daisy Choudharyr" },
          { name: "Dayanand Choudhary" },
          { name: "Dipesh Choudhary" },
          { name: "G Shiva Keshavulu" },
          { name: "Harshal Tanawala" },
          { name: "Harshvardhan Chauhan" },
          { name: "Jayanta Dey" },
          { name: "Kishore Das" },
          { name: "Kunal Gupta" },
          { name: "Malaya Kumar" },
          { name: "Manoj Kher" },
          { name: "Megha jain" },
          { name: "Meha Sinha" },
          { name: "Muthukumar D" },
          { name: "Naveen Soni" },
          { name: "Meha Sinha" },
          { name: "Meha Sinha" },
          { name: "Meha Sinha" },
          { name: "Meha Sinha" },
          { name: "Meha Sinha" },
  { name: "Nidhi Sharma" },
  { name: "Nikhat Anjum" },
  { name: "Nikhil " },
  { name: "Nishant Sankhala" },
  { name: "Nishtha Gupta" },
  { name: "Nitin Sharma" },
  { name: "Param" },
  { name: "Parvi Lakha" },
  { name: "Pavan Sindhu" },
  { name: "Pawan Khuswaha" },
  { name: "Predun Choudhary" },
  { name: "Priyansh" },
  { name: "Rahul Kumar Gupta" },
  { name: "Rahul Tiwari" },
  { name: "Rahul Yadav" },
  { name: "Raj Tiwari" },
  { name: "Rashee" },
  { name: "Ritu Choudhary" },
  { name: "Riya Gupta" },
  { name: "Rohit Richards" },
  { name: "Samrat Singh" },
  { name: "Sandip Wahane" },
  { name: "Santosh C" },
  { name: "Saurabh Agarwal" },
  { name: "Shivam Kesari" },
  { name: "Shivani Solanki" },
  { name: "Sneha Singh" },
  { name: "Someshwar S" },
  { name: "Soumen Banerjee" },
  { name: "Sreejith S" },
  { name: "Subhankar Shome" },
  { name: "Subramani B S" },
  { name: "Sweety Kumari" },
  { name: "Urvashi Patel" },
  { name: "Vadiraj" },
  { name: "Vikash Tyagi" },
  { name: "Vishal Singh" },
  { name: "Vivek Kumar" },
  { name: "Yash Upadhayee" }
  ];

    // busness type function end here
    const [post, setPost] = useState(null);
    const [errors, setErrors] = useState({});
    const [YourProductImage, setProductImages] = useState([]);
    const [yourProfileImage, setProfileImage] = useState(null);
    const [checkboxError, setCheckboxError] = useState(false);
    const [yourFile, setYourFile] = useState(null);
    const [yourProduct, setProductFile] = useState(null);
    const [FromTypes, setFromTypes] = useState(null);
    const [loader, setLoader] = useState(false); //new entry here
    const [formData, setFormData] = useState({});
    const [isInputnotEmpty, setIsinputNotEmpty] = useState(false);

    const router = useRouter();
    const { utm_source, utm_medium, utm_campaign, utm_id } = router.query;
    const query = router.query;
    const title = "Register with WalmartVriddhi - Walmart Vriddhi"
    const desc = "Fill the form to be a part of the Walmart Vriddhi program and unlock your business growth!"
    const Myimg ="/images/registration_banner.png"

    const handleFromTypes = (e) => {
        const type = typeList.find(
            (type) => type.name === e.target.value
        );
        setFromTypes(type.name);
       // console.log(type.name)
       
    };
    

    const validateEmail = (email) => {
        // Regular expression for validating email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Return true if the email matches the regex pattern, otherwise false
        return emailRegex.test(email);
    };

    
    const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value, // Update the corresponding field based on the name
            }));  
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setProfileImage(selectedFile);
        //alert(selectedFile)
      };


    const handleProductChange = (e) => {
        const files = e.target.files;
        // Convert FileList to array
        const fileList = Array.from(files);
        // Update product images state
        setProductImages(fileList);
    };
 
    const handleSubmit = async(event) => {
        // 👇️ prevent page refresh
        event.preventDefault();
        setLoader(true);
        // Perform form empty validation

    // if (!FullName || !WVProgramID || !yourEmail || !yourDesignation || !yourCompanyName || !yourLocation || !yourBusinessCategory || !FromTypes || !yourAboutBusiness || !yourLinkProfile || !yourWebsiteLink || !yourFacebook || !yourTwitter || !yourInstagram || !yourLinkedin || !YourProductImage.length) {
    //     setErrors({ formEmpty: "Please fill out all fields" });
    //     return;
    // }

    // Perform email validation
        // // Reset errors if no validation errors
        
        //setErrors({ formEmpty: "Please fill out all fields" });


        if (!yourEmail.value || !yourAboutBusiness.value  || !FromTypes  || !YourProductImage.length) {
            setErrors({ formEmpty: "Please fill out all fields" });
            setLoader(false);
            console.log('feilds are empty')
            
            //return;
       }
        
        

        if (!isCheckboxChecked ) {
            setCheckboxError(true);
            console.log('please check the checkbox');
            setLoader(false);
        } else {
            setCheckboxError(false);
            console.log('checked');
            setLoader(false);

           




        const formData = new FormData();
        formData.append('FullName', FullName.value);
        formData.append('WVProgramID', WVProgramID.value);
        formData.append('yourEmail', yourEmail.value);
        formData.append('yourDesignation', yourDesignation.value);
        formData.append('yourCompanyName', yourCompanyName.value);
        formData.append('yourLocation', yourLocation.value); 
        formData.append('yourBusinessCategory', yourBusinessCategory.value);
        formData.append('yourContactPoint', FromTypes);
        formData.append('yourAboutBusiness', yourAboutBusiness.value);
        formData.append('yourLinkProfile', yourLinkProfile.value);
        formData.append('yourWebsiteLink', yourWebsiteLink.value);
        formData.append('yourFacebook', yourFacebook.value);
        formData.append('yourTwitter', yourTwitter.value);
        formData.append('yourInstagram', yourInstagram.value);
        formData.append('yourLinkedin', yourLinkedin.value);
        formData.append('yourProfileImage', yourProfileImage);      
             // Append product images
        YourProductImage.forEach((image, index) => {
        formData.append(`yourProductImage_${index}`, image);
        // formData.append(`yourProductImage`, image);
        });
            
        try {
            const response = await fetch(`${configData.SERVER_FROM}contact-form-7/v1/contact-forms/270120/feedback`, {
              method: 'POST',
              body: formData,
            });
    
            if (response.ok) {
              //console.log(response)
              console.log('File uploaded successfully');
              setSuccess(false);
              //setPost("Your resume has been sent successfully");
              setLoading(true);
              setLoader(false);
            } else {
                console.error('File upload failed');
                setLoader(false);
            }
          } catch (error) {
            console.error('Error uploading file:', error);
            setLoader(false);
        }
            
    }
        
    };
    



    

    return (
        <>
            
            <NextSeo
                noindex={true}
                nofollow={true}
    title={ title}
    description={ desc}
        canonical='https://www.walmartvriddhi.org/register-with-walmartvriddhi/'
        openGraph={{
          url: "https://www.walmartvriddhi.org/register-with-walmartvriddhi/",
          title: title,
          description: desc,
          images: [
            {
              url: Myimg,
              width: 800,
              height: 600,
              alt: 'Walmart Vridhi',
              type: 'image/jpeg',
            },
            {
              url: Myimg,
              width: 900,
              height: 800,
              alt: 'Walmart Vridhi',
              type: 'image/jpeg',
            },
            { url: Myimg },
            { url: Myimg },
          ],
          siteName: {title},
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
    />
            <Header />
            <Container className=" p-0 " fluid >
                <p className="fs-2  text-center pt-5 fw-bold bogle-bold walmart-default">Alumni Details</p>
                <Container className="p-4 px-4 reg-wid">
                <form
                    onSubmit={handleSubmit} encType='multipart/form-data'
                        style={{ margin: '20px' }}>
                    <Row>
                            <Col sm={6} lg={3}>
                            <div className="mb-3" >
                                    <label className="form-label">Full Name:</label>
                                    <input
                                        //required
                                        type='text'
                                        className={`form-control ${errors && errors.FullName ? 'is-invalid' : ''}`}
                                        id="FullName"
                                        name='FullName'
                                        placeholder="Full Name"
                                        //value={FullName}
                                        //onChange={event => setFullName(event.target.value)}
                                        //value={FullName}
                                        value={formData.FullName}
                                        onChange={handleChange}
                                    />
                                    {errors.FullName}
                                    {errors && errors.FullName && <div className="invalid-feedback">{errors.FullName}</div>}
                                    {errors.formEmpty && <div className="error">{errors.formEmpty}</div>}
                                </div>
                            </Col>                
                            <Col sm={6} lg={3}>
                            <div className="mb-3" >
                                    <label className="form-label">WV Program ID:</label>
                                    <input
                                        //required
                                        type='text'
                                        className={`form-control ${errors && errors.WVProgramID ? 'is-invalid' : ''}`}
                                        id="WVProgramID"
                                        name='WVProgramID'
                                        placeholder="WV Program ID"
                                        // value={WVProgramID}
                                        // onChange={event => setWVProgramID(event.target.value)}
                                        value={formData.WVProgramID}
                                        onChange={handleChange}
                                    />
                                    {errors && errors.WVProgramID && <div className="invalid-feedback">{errors.WVProgramID}</div>}
                                </div>
                            </Col>
                            <Col sm={6} lg={3}>
                            <div className="mb-3">
                                    <label htmlfor="yourPhone" className="form-label"><span className="errors">*</span>Your Email:</label>
                                    <input
                                        //required
                                        type='email'
                                        className={`form-control ${errors && errors.yourEmail ? 'is-invalid' : ''}`}
                                        id="yourEmail"
                                        name='yourEmail'
                                        placeholder="test@test.com"
                                        // value={yourEmail}
                                        value={formData.yourEmail}
                                        onChange={handleChange}
                                       
                                    />
                                    {errors && errors.yourEmail && <div className="invalid-feedback">{errors.yourEmail}</div>}
                                </div>
                            </Col>

                            <Col sm={6} lg={3}>
                            <div className="mb-3">
                                    <label htmlfor="Designation" className="form-label">Designation:</label>
                                    <input
                                        //required
                                        type='text'
                                        className={`form-control ${errors && errors.yourDesignation ? 'is-invalid' : ''}`}
                                        id="yourDesignation"
                                        name='yourDesignation'
                                        placeholder="Designation"
                                        // value={yourDesignation}
                                        // onChange={event => setDesignation(event.target.value)}
                                        value={formData.yourDesignation}
                                        onChange={handleChange}
                                    />
                                    {errors && errors.yourDesignation && <div className="invalid-feedback">{errors.yourDesignation}</div>}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6} lg={3}>
                            <div className="mb-3">
                                    <label htmlfor="CompanyName" className="form-label">CompanyName:</label>
                                    <input
                                        //required
                                        type='text'
                                        className={`form-control ${errors && errors.yourCompanyName ? 'is-invalid' : ''}`}
                                        id="yourCompanyName"
                                        name='yourCompanyName'
                                        placeholder="Company Name"
                                        // value={yourCompanyName}
                                        // onChange={event => setCompanyName(event.target.value)}
                                        value={formData.yourCompanyName}
                                        onChange={handleChange}
                                    />
                                    {errors && errors.yourCompanyName && <div className="invalid-feedback">{errors.yourCompanyName}</div>}
                                </div> 
                            </Col>
                            <Col sm={6} lg={3}>
                            <div className="mb-3">
                                    <label htmlfor="Location" className="form-label">Location:</label>
                                    <input
                                        //required
                                        type='text'
                                        className={`form-control ${errors && errors.yourLocation ? 'is-invalid' : ''}`}
                                        id="yourLocation"
                                        name='yourLocation'
                                        placeholder="Location"
                                        // value={yourLocation}
                                        // onChange={event => setLocation(event.target.value)}
                                        value={formData.yourLocation}
                                        onChange={handleChange}
                                    />
                                    {errors && errors.yourLocation && <div className="invalid-feedback">{errors.yourLocation}</div>}
                                </div> 
                            </Col>
                            <Col sm={6} lg={3}>
                            <div className="mb-3">
                                    <label htmlfor="BusinessCategory" className="form-label">Business Category:</label>
                                    <input
                                        //required
                                        type='text'
                                        className={`form-control ${errors && errors.yourBusinessCategory ? 'is-invalid' : ''}`}
                                        id="yourBusinessCategory"
                                        name='yourBusinessCategory'
                                        placeholder="Business Category"
                                        // value={yourBusinessCategory}
                                        // onChange={event => setBusinessCategory(event.target.value)}
                                        value={formData.yourBusinessCategory}
                                        onChange={handleChange}
                                    />
                                    {errors && errors.yourBusinessCategory && <div className="invalid-feedback">{errors.yourBusinessCategory}</div>}
                                </div> 
                            </Col>
                            <Col sm={6} lg={3}>
                            <div className="mb-3">
                                    <label htmlfor="LinkProfile" className="form-label">Business Images:</label>
                                    
                                    <input
                                        //required
                                        type='text'
                                        className={`form-control ${errors && errors.yourLinkProfile ? 'is-invalid' : ''}`}
                                        id="yourLinkProfile"
                                        name='yourLinkProfile'
                                        placeholder="Link for Profile & Business Images"
                                        // value={yourLinkProfile}
                                        // onChange={event => setLinkProfile(event.target.value)}
                                        value={formData.yourLinkProfile}
                                        onChange={handleChange}
                                    />
                                    {errors && errors.yourLinkProfile && <div className="invalid-feedback">{errors.yourLinkProfile}</div>}
                                </div> 
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6} lg={3}>
                            <div className="mb-3">
                                    <label htmlfor="ContactPoint" className="form-label"><span className="errors">*</span>Point of Contact:</label>
                                    <Form.Select aria-label="Default select example" className={`form-control ${errors && errors.yourContactPoint ? 'is-invalid' : ''}`}
                                    id="yourContactPoint"
                                    name="yourContactPoint"
                                    value={formData.yourContactPoint}
                                    onChange={handleFromTypes}
                                    >
                                     <option value="null">Point of Contact</option>
                                    {typeList.map((type, key) => (
                                        <option key={key} title={type.code} value={type.name}>
                                            {type.name}
                                        </option>
                                    ))}
    </Form.Select>
                                    {errors && errors.yourContactPoint && <div className="invalid-feedback">{errors.yourContactPoint}</div>}
                                </div>
                            </Col>
                            <Col sm={6} lg={3}>
                            <div className="mb-3">
                                    <label htmlfor="ProfileImage" className="form-label"><span className="errors">*</span>Profile Image(up to 3MB):</label>
                                    <input
                                        required
                                        type="file"
                                        className={`form-control ${errors && errors.yourProfileImage ? 'is-invalid focus' : ''}`}
                                        id="yourProfileImage"
                                        name='yourProfileImage'
                                        placeholder="ProfileImage"
                                        multiple
                                        value={yourFile}
                                        //onChange={event => setProfileImage(event.target.value)}
                                        //event.target.files[0]
                                        onChange={handleFileChange}
                                    />
                                    {errors && errors.yourProfileImage && <div className="invalid-feedback">{errors.yourProfileImage}</div>}
                                </div>
                            </Col>
                            <Col sm={12} lg={6}>
                            <div className="mb-3">
                                    <label htmlfor="ProductImage" className="form-label"><span className="errors">*</span>Product Image (up to 3 images, maximum size of 7MB):</label>
                                    <input
                                        required
                                        type="file"
                                        className={`form-control ${errors && errors.yourProductImage ? 'is-invalid' : ''}`}
                                        id="yourProductImage"
                                        name='yourProductImage'
                                        placeholder="Product Image"
                                        multiple
                                        value={yourProduct}
                                        //onChange={event => setProductImage(event.target.value)}
                                        onChange={handleProductChange}
                                    />
                                    {errors && errors.yourProductImage && <div className="invalid-feedback">{errors.yourProductImage}</div>}
                                </div>
                            </Col> 
                        </Row>
                        <Row>
                            <Col>
                            <div className="mb-3">
                                    <label htmlfor="AboutBusiness" className="form-label"><span className="errors">*</span>About the Business:</label>
                                    <textarea
                                        //required
                                        type="text"
                                        className={`form-control ${errors && errors.yourAboutBusiness ? 'is-invalid' : ''}`}
                                        id="yourAboutBusiness"
                                        name='yourAboutBusiness'
                                        placeholder="About the Business"
                                        //onChange={event => setAboutBusiness(event.target.value)}
                                        value={formData.yourAboutBusiness}
                                        onChange={handleChange}
                                    />
                                {errors && errors.yourAboutBusiness && <div className="invalid-feedback">{errors.yourAboutBusiness}</div>}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <div className="mb-3">
                                    <label htmlfor="WebsiteLink" className="form-label">Add Website Link:</label>
                                    <input
                                        //required
                                        type="text"
                                        className={`form-control ${errors && errors.yourWebsiteLink ? 'is-invalid' : ''}`}
                                        id="yourWebsiteLink"
                                        name='yourWebsiteLink'
                                        placeholder="Add Website Link"
                                        value={formData.yourWebsiteLink}
                                        //onChange={event => setWebsiteLink(event.target.value)}
                                        onChange={handleChange}
                                    />
{errors && errors.yourWebsiteLink && <div className="invalid-feedback">{errors.yourWebsiteLink}</div>}                                    
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <div className="mb-3">
                                    <label htmlfor="Facebook" className="form-label">Facebook:</label>
                                    <input
                                        //required
                                        type="text"
                                        className={`form-control ${errors && errors.yourFacebook ? 'is-invalid' : ''}`}
                                        id="yourFacebook"
                                        name='yourFacebook'
                                        placeholder="Facebook"
                                        
                                        value={formData.yourFacebook}
                                        //onChange={event => setFacebook(event.target.value)}
                                        onChange={handleChange}
                                    />
                                    {errors && errors.yourFacebook && <div className="invalid-feedback">{errors.yourFacebook}</div>}                                    
                                </div>
                            </Col>
                            <Col>
                            <div className="mb-3">
                                    <label htmlfor="Twitter" className="form-label">Twitter:</label>
                                    <input
                                        //required
                                        type="text"
                                        className={`form-control ${errors && errors.yourTwitter ? 'is-invalid' : ''}`}
                                        id="yourTwitter"
                                        name='yourTwitter'
                                        placeholder="Twitter"
                                        value={formData.yourTwitter}
                                        //onChange={event => setTwitter(event.target.value)}
                                        onChange={handleChange}
                                    />
                                    {errors && errors.yourTwitter && <div className="invalid-feedback">{errors.yourTwitter}</div>}                                    
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <div className="mb-3">
                                    <label htmlfor="Instagram" className="form-label">Instagram:</label>
                                    <input
                                        //required
                                        type="text"
                                        className={`form-control ${errors && errors.yourInstagram ? 'is-invalid' : ''}`}
                                        id="yourInstagram"
                                        name='yourInstagram'
                                        placeholder="Instagram"
                                        value={formData.yourInstagram}
                                        //onChange={event => setInstagram(event.target.value)}
                                        onChange={handleChange}
                                    />
                                    {errors && errors.yourInstagram && <div className="invalid-feedback">{errors.yourInstagram}</div>}                                    
                                </div>
                            </Col>
                            <Col>
                            <div className="mb-3">
                                    <label htmlfor="Linkedin" className="form-label">Linkedin:</label>
                                    <input
                                        //required
                                        type="text"
                                        className={`form-control ${errors && errors.yourLinkedin ? 'is-invalid' : ''}`}
                                        id="yourLinkedin"
                                        name='yourLinkedin'
                                        placeholder="Linkedin"
                                        value={formData.yourLinkedin}
                                        //onChange={event => setLinkedin(event.target.value)}
                                        onChange={handleChange}
                                    />
                                        {errors && errors.yourLinkedin && <div className="invalid-feedback">{errors.yourLinkedin}</div>}                                    
                                </div>
                            </Col>
                        </Row>
                        <Container className="mb-3">
<div class="form-check">
                                <input 
                                    className={`form-check-input ${checkboxError ? 'is-invalid' : ''}`}
                                    type="checkbox" value="" id="flexCheckDefault"
                                onChange={handleCheckboxChange}
                                />
                              
  <label class="form-check-label" for="flexCheckDefault">
  I hereby consent to the collection, use, and sharing of my personal information as provided in this form on the Walmart Vriddhi website.
  </label>
</div>
                        
</Container>
<Container className="text-center">             
<button
        type='submit'
        className={loader ? 'registers' : 'registers'}
        onClick={handleSubmit}
        aria-disabled="true"
    >
{loader ? 'Please wait..' :'Submit'}
</button>
                            
                        </Container>

        <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Successfully submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark fs-5 p-4 bg-white">{post}</Modal.Body>
      </Modal>

                        {/* {loading && <h1 class="reg-success mt-4">{post}</h1>
                        
                        } */}
</form>
</Container>
</Container>
            
{/* <Popups/> */}
            <Floating/> 
            <NewsLetter/>
            <Footer />
        </>
    );
}