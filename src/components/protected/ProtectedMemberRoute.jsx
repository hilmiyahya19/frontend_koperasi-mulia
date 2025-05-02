import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../App"; // Sesuaikan path jika perlu

const ProtectedMemberRoute = ({ children }) => {
    const { token, role } = useContext(AuthContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const memberId = localStorage.getItem("memberId");

    useEffect(() => {
        if (!token || role !== "member" || !memberId) {
            navigate("/member/login", { replace: true });
        } else if (id !== memberId) {
            navigate(`/member/${memberId}`, { replace: true });
        }
    }, [token, role, memberId, id, navigate]);

    if (!token || role !== "member" || !memberId || id !== memberId) {
        return null;
    }

    return children;
};

export default ProtectedMemberRoute;
