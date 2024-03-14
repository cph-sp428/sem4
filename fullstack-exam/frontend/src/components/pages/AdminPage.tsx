import useAuth from "../../hooks/useAuth";

function AdminPage() {

    const admin = useAuth("admin");

    if (!admin) {
        return (
            <div>
                <h1>Admin Page</h1>
                <p>Only admins can access this page!</p>
            </div>
        );
    }

    return ( 
        <div id="admin-page-container">
            <h1>Admin Page</h1>
            <p>Admins can do anything they want!</p>
            <p> HELLO: {admin}</p>
            
        </div>
     );
}

export default AdminPage;