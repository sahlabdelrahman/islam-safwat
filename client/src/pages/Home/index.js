/** @format */

import { Suspense, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HelmetMetaData from "components/HelmetMetaData";
import { titles, descriptions } from "data/static-data";

import { getFeatured } from "store/actions/featured.action";

const Featured = lazy(() => import("components/Dashboard/Featured"));
const FeaturedCarousel = lazy(() =>
  import("components/Featured/FeaturedCarousel")
);

const Home = () => {
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const featured = useSelector((state) => state.featured);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeatured()).then(() => setLoading(false));
    // .catch((message) => {
    //   dispatch(showErrorSnackbar(message));
    // });
  }, [dispatch]);

  return (
    <>
      <HelmetMetaData
        title={titles.main}
        image={featured?.length > 0 && featured[0]?.imageUrl}
        description={descriptions.main}
        quote={descriptions.main}
      />
      <div>
        {isLoggedIn && (
          <Suspense fallback={<div>loading...</div>}>
            <Featured loading={loading} />
          </Suspense>
        )}
        {!isLoggedIn && (
          <Suspense>
            <FeaturedCarousel />
          </Suspense>
        )}
      </div>
    </>
  );
};

export default Home;
