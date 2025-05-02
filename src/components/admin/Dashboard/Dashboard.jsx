import ReportMembers from "./ReportMembers"
import ReportFinances from "./ReportFinances"
import ReportSales from "./ReportSales";
import ReportProducts from "./ReportProducts";

const Dashboard = () => {

    return (
        <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white min-h-screen p-6">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-400 mb-4 text-center md:text-left">Dashboard</h1>
            
            {/* Member Statistics */}
            <div className="bg-gray-800 rounded-2xl shadow-lg shadow-gray-900/50 mb-6">
                <ReportMembers />
            </div>
            
            {/* Sales Statistics */}
            <div className="bg-gray-800 rounded-2xl shadow-lg shadow-gray-900/50 mb-6">
                <ReportSales/>
            </div>
            
            {/* Top Selling Products */}
            <div className="bg-gray-800 rounded-2xl shadow-lg shadow-gray-900/50 mb-6">
                <ReportProducts/>
            </div>

            {/* Finance Statistics */}
            <div className="bg-gray-800 rounded-2xl shadow-lg shadow-gray-900/50">
                <ReportFinances />
            </div>
        </div>
    );
};

export default Dashboard;
