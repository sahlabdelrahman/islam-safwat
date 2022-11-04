/** @format */

import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

const HelmetMetaData = (props) => {
  let location = useLocation();
  let currentUrl = "islamsafwat.com/#" + location.pathname;
  let quote = props.quote !== undefined ? props.quote : "";
  let title = props.title !== undefined ? props.title : "Islam Safwat";
  let image =
    props.image !== undefined
      ? props.image
      : "https://res.cloudinary.com/djc75dmuy/image/upload/v1664634484/featured/spjbaxasnuulnsqpzfqf.jpg";
  let description =
    props.description !== undefined
      ? props.description
      : "Islam Safwat, a photojournalist and documentary photographer born in Cairo March 1989. Graduated from the Faculty of Commerce Business Administration 2014. loves photography from childhood and use the old family cameras and smartphones when its arrived, then found the passion is on photojournalism so started works as a photojournalist at El Shorouk daily newspaper from 2016 till now, Islam based in Cairo, works as a Stringer with Associated Press Agency, and Bloomberg news, and Deutsche Press Agency, and contributor with GettyImages and NURPHOTO Agency, Work as a consultant with Goethe institute from March 2018, till now as a photographer.";
  return (
    <Helmet>
      <title>{title}</title>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="csrf_token" content="" />
      <meta property="type" content="website" />
      <meta property="url" content={currentUrl} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="_token" content="" />
      <meta name="robots" content="noodp" />
      <meta name="title" content={title} />
      <meta name="quote" content={quote} />
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:quote" content={quote} />
      <meta property="og:image" content={image} />
      <meta content="image/*" property="og:image:type" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="CampersTribe" />
      <meta property="og:description" content={description} />{" "}
    </Helmet>
  );
};

export default HelmetMetaData;
