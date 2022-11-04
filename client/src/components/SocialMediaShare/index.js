/** @format */

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

import "css/SocialMediaShare/index.css";

const SocialMediaShare = ({ url, quote }) => {
  return (
    <div className="social-media-share-component">
      <FacebookShareButton url={url} quote={quote}>
        <FacebookIcon size={24} />
      </FacebookShareButton>
      <TwitterShareButton url={url} quote={quote}>
        <TwitterIcon size={24} />
      </TwitterShareButton>
      <WhatsappShareButton url={url} quote={quote}>
        <WhatsappIcon size={24} />
      </WhatsappShareButton>
    </div>
  );
};

export default SocialMediaShare;
