import React, { useEffect, useState } from "react";
import { Card, Button, Col, Row, Container } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import Brand from '../components/BrandLogo';
import Footer from '../components/Footer';
import configData from "../config.json";
import { NextSeo } from 'next-seo';
import date from 'date-and-time';
import Media from '../utils/fetchMedia'
import NewsLetter from '../components/NewsLetter'
import Floating from '../components/FloatingMenu'
import Popups from '../components/PopUps'

const SuccessStories = ({ heroBannerpost }) => {

    const title = "About us  - Walmart Vriddhi";
    const desc = "About Walmart Vriddhi Walmart and Flipkart have made a long-term commitment to transform India’s MSME ecosystem by empowering 50,000 MSMEs. We strive to play a catalytic role by supporting small businesses with growth opportunities to reach greater heights and new markets. Walmart Vriddhi is a supplier development program tailored to help MSMEs modernize";
    const banner = '/images/media-features.png';
    const url = 'https://www.walmartvriddhi.org/about-us/';
  
  return (
    <>
      <Header />
      <NextSeo
        noindex={true}
        nofollow={true}
      title= {title}
      description={desc}
        canonical={url}
        openGraph={{
          url: url,
          title: title,
          description: desc,
          images: [
            {
              url: banner,
              width: 800,
              height: 600,
              alt: 'Walmart Vridhi',
              type: 'image/jpeg',
            },
            {
              url: banner,
              width: 900,
              height: 800,
              alt: 'Walmart Vridhi',
              type: 'image/jpeg',
            },
            { url: banner },
            { url: banner },
          ],
          siteName: title,
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
    />
    <Image
      src={banner}
      width="800"
      height="620"
      background='no-repeat'
      background-size= 'cover'
      className="banner-img w-100 h-100"
      
    />
      <Brand />
      <Media/>
  
      <Popups/>
            <Floating/> 
            <NewsLetter/>
      <Footer />
    </>
  );
};

export default SuccessStories;

// Your existing code for fetching banner post and news
// ...

export async function bannerPost() {
  const getPosts = await fetch(`${configData.SERVER_URL}posts?_embed&status[]=publish&production[]=${configData.SERVER}&categories[]=13&order=desc&per_page=1`);
  const data = await getPosts.json();
  return data;
}



export async function getServerSideProps() {
  const heroBannerpost = await bannerPost();

  return {
    props: {
      heroBannerpost,
    },
  };
}

