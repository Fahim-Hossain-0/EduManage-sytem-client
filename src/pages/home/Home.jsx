
import Banner from "../../components/Banner";
import Highlight from "../../components/Highlight";
import MostPopular from "../../components/MostPopular";
// import Feedback from "../../components/Feedback";
import StatsSection from "../../components/StatsSection";
import BecomeTeacher from "../../components/BecomeTeacher";
import TeachingEvaluationSection from "../../components/TeachingEvaluationModal";


const Home = () => {
  
  return (
    <>
      <Banner></Banner>
      <div className="w-[95%] container mx-auto">
        <Highlight></Highlight>
        <MostPopular></MostPopular>
        {/* <Feedback></Feedback> */}
        <TeachingEvaluationSection></TeachingEvaluationSection>
        <StatsSection></StatsSection>
        <BecomeTeacher></BecomeTeacher>
      </div>
    </>
  );
};

export default Home;
