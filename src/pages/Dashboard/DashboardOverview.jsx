import useUserRole from "../../hook/useUserRole";
import Loading from "../../components/Loading";
import StudentDashboardOverview from "./StudentDashboardOverview";
import TeacherDashboardOverview from "./TeacherDashboard/TeacherDashboardOverview";

const DashboardOverview = () => {
    const { role, roleLoading } = useUserRole();

    if (roleLoading) return <Loading />;

    if (role === 'teacher') {
        return <TeacherDashboardOverview />;
    }
    
    return <StudentDashboardOverview />;
};

export default DashboardOverview;