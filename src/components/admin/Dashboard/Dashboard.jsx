import ReportMembers from "./ReportMembers"
import ReportFinances from "./ReportFinances"
import ReportSales from "./ReportSales";
import ReportProducts from "./ReportProducts";

const Dashboard = () => {
    return (
        <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white min-h-screen px-4 py-6 overflow-x-hidden">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-400 mb-4 text-center md:text-left">
                Dashboard
            </h1>

            {/* Grid Layout for Reports */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-2xl shadow-lg shadow-gray-900/50 overflow-hidden">
                    <ReportMembers />
                </div>
                <div className="bg-gray-800 rounded-2xl shadow-lg shadow-gray-900/50 overflow-hidden">
                    <ReportSales />
                </div>
                <div className="bg-gray-800 rounded-2xl shadow-lg shadow-gray-900/50 overflow-hidden">
                    <ReportProducts />
                </div>
                <div className="bg-gray-800 rounded-2xl shadow-lg shadow-gray-900/50 overflow-hidden">
                    <ReportFinances />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
