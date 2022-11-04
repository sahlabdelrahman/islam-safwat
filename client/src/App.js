/** @format */

import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";

import SuccessSnackbar from "./components/Snackbar/SuccessSnackbar";
import InfoSnackbar from "components/Snackbar/InfoSnackbar";
import WarningSnackbar from "components/Snackbar/WarningSnackbar";
import ErrorSnackbar from "./components/Snackbar/ErrorSnackbar";
import Contact from "components/Contact/Contact";
import GoTopButton from "components/Buttons/GoTopButton";

import Header from "./components/Header";
import Footer from "./components/Footer";

import AuthWrapper from "./components/Dashboard/AuthWrapper";

import "swiper/css";
import "css/general.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import SuspenseLoader from "components/LoadingSpinner/SuspenseLoader";

const Login = lazy(() => import("./pages/Login"));
const Profile = lazy(() => import("./pages/Profile"));

const Home = lazy(() => import("./pages/Home"));
const Singles = lazy(() => import("./pages/Singles"));
const Projects = lazy(() => import("./pages/Projects"));
const Project = lazy(() => import("./pages/Projects/Project"));
const News = lazy(() => import("./pages/News"));
const New = lazy(() => import("./pages/News/New"));
const Sheets = lazy(() => import("./pages/Sheets"));
const Bio = lazy(() => import("./pages/Bio"));
const NoPage = lazy(() => import("./pages/NoPage"));
const Test = lazy(() => import("./pages/Test"));

function App() {
  const pathname = useLocation().pathname;

  return (
    <>
      <SuccessSnackbar />
      <InfoSnackbar />
      <WarningSnackbar />
      <ErrorSnackbar />
      <Contact />
      <GoTopButton />

      <Header />
      {pathname !== "/" && <div className="padding-top-for-body"></div>}

      <Suspense
        fallback={<SuspenseLoader page={pathname === "/" && "home-page"} />}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route element={<AuthWrapper />}>
            <Route path="/" element={<Home />} />
            <Route path="/singles" element={<Singles />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId" element={<Project />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:newsId" element={<New />} />
            <Route path="/sheets" element={<Sheets />} />
            <Route path="/bio" element={<Bio />} />
            <Route path="/test" element={<Test />} />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
