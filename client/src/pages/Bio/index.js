/** @format */

import { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getBio } from "store/actions/bio.action";
// import { showErrorSnackbar } from "store/actions/ui.action";

import { Container } from "@mui/material";

import HelmetMetaData from "components/HelmetMetaData";
import Content from "components/Bio/Content";

import { descriptions, titles } from "data/static-data";
import "css/Bio/index.css";
import Loader from "components/LoadingSpinner/Loader";

const BioComponent = lazy(() => import("components/Dashboard/Bio"));

const Bio = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const bio = useSelector((state) => state.bio);

  useEffect(() => {
    dispatch(getBio()).then(() => setIsLoading(false));
  }, [dispatch]);

  return (
    <>
      <HelmetMetaData
        title={`${titles.bio} - ${titles.main}`}
        image={bio?.imageUrl && bio?.imageUrl}
        description={descriptions.bio}
        quote={descriptions.bio}
      />
      <div className="bio-page">
        <Container>
          {isLoggedIn && (
            <Suspense fallback={<p>Adding bio is loading...</p>}>
              <BioComponent />
            </Suspense>
          )}
          {isLoading ? <Loader /> : <Content />}
        </Container>
      </div>
    </>
  );
};

export default Bio;
