import AdminDashboard from "../Components/Dashboard/AdminDashboard";
import SalesPersonDashboard from "../Components/Dashboard/SalesPersonDashboard";
import SupplierDashboard from "../Components/Dashboard/SupplierDashboard";

function Dashboard() {
    // Retrieve user role from localStorage
    const userRole = localStorage.getItem("role") || "user"; 

  
        const renderDashboard = () => {
            switch (userRole) {
                case 'admin':
                    return <AdminDashboard />;
                case 'SalesPerson':
                    return <SalesPersonDashboard />;
                case 'Supplier':
                    return <SupplierDashboard />;
                default:
                    return <div>Role not recognized. Please contact admin.</div>;
            }
        }

        return(
            <div>
           
            {renderDashboard()}
        </div>
    );
};

export default Dashboard;