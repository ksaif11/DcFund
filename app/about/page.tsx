import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="About Page"
        description="DecFund is a pioneering decentralized crowdfunding platform designed to democratize fundraising. We believe in the power of blockchain technology to remove barriers and enable anyone to bring their ideas to life. Whether you're an entrepreneur, artist, or nonprofit organization, our platform connects you with a global community of backers who share your passion."
      />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
};

export default AboutPage;
