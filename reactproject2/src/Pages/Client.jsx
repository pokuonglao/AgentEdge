import React, { useState, useEffect } from 'react';
import '../Styles/Pages/Client.css';
import LoadingSpinner from '../Components/LoadingSpinner';

function Clients() {
    const [pageSize, setPageSize] = useState(5);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showAddClient, setShowAddClient] = useState(false); // State variable to manage the visibility of "Add Client" window
    const [newClientData, setNewClientData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zipcode: "",
        phone: "",
        email: ""
    }); // State variable to store data of the new client
    const [successMessage, setSuccessMessage] = useState('');


    useEffect(() => {
        // Fetch total pages on component mount
        fetchTotalPages(pageSize);
    }, [pageSize]);

    useEffect(() => {
        // Fetch clients when page number changes
        fetchClients(pageNumber, pageSize);
    }, [pageNumber, pageSize]);

    const fetchTotalPages = (size) => {
        setLoading(true);
        fetch(`https://d129impgfwqu0k.cloudfront.net/Client/getTotalPages?pageSize=${size}`)
            .then(response => response.json())
            .then(data => {
                setTotalPages(data.totalPages);
            })
            .catch(error => {
                console.error('Error fetching total pages:', error);
                setError('Failed to fetch total pages');
            })
            .finally(() => setLoading(false));
    };

    const fetchClients = (page, size) => {
        setLoading(true);
        fetch(`https://d129impgfwqu0k.cloudfront.net/Client/getAllClients?pageNumber=${page}&pageSize=${size}`)
            .then(response => response.json())
            .then(data => {
                setClients(data);
            })
            .catch(error => {
                console.error('Error fetching clients:', error);
                setError('Failed to fetch clients');
            })
            .finally(() => setLoading(false));
    };

    const searchClients = () => {
        fetch(`https://d129impgfwqu0k.cloudfront.net/Client/search?keyword=${searchKeyword}`)
            .then(response => response.json())
            .then(data => {
                setClients(data);
            })
            .catch(error => {
                console.error('Error searching clients:', error);
                setError('Failed to search clients');
            });
    };

    const handleAddClient = () => {
        fetch(`https://d129impgfwqu0k.cloudfront.net/Client/addClient`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newClientData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add client');
                }
                setNewClientData({
                    firstName: '',
                    lastName: '',
                    phone: '',
                    email: '',
                    address: '',
                    city: '',
                    state: '',
                    zipcode: ''
                });
                // Close the "Add Client" window after successful addition
                setShowAddClient(false);
                // Fetch updated list of clients
                fetchClients(pageNumber, pageSize);
                // Show the success message
                setSuccessMessage('Client successfully added!');
                // Clear the success message after a few seconds
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000); // Display for 3 seconds
            })
            .catch(error => {
                alert(error.message);
            });
    };

    const handleDeleteClient = (id) => {
        fetch(`https://d129impgfwqu0k.cloudfront.net/Client/deleteClient/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete client');
                }
                // Update the clients list after successful deletion
                fetchClients(pageNumber, pageSize);
                setSuccessMessage('Client successfully deleted!');
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            })
            .catch(error => {
                alert(error.message);
            });
    };

    return (
        <div className="client-container">
            <h2>Clients</h2>
            <div>
                {loading && <LoadingSpinner />}
                {error && <p>Error: {error}</p>}
                {successMessage && <p>{successMessage}</p>}
                <button onClick={() => setShowAddClient(true)}>Add Client</button>
            {showAddClient && (
                <div className="add-client-window">
                    {/* Form inputs for adding a new client */}
                    <input type="text" placeholder="First Name" value={newClientData.firstName} onChange={(e) => setNewClientData({ ...newClientData, firstName: e.target.value })} />
                        <input type="text" placeholder="Last Name" value={newClientData.lastName} onChange={(e) => setNewClientData({ ...newClientData, lastName: e.target.value })} />
                        <input type="text" placeholder="Phone" value={newClientData.phone} onChange={(e) => setNewClientData({ ...newClientData, phone: e.target.value })} />
                        <input type="text" placeholder="Email" value={newClientData.email} onChange={(e) => setNewClientData({ ...newClientData, email: e.target.value })} />
                        <input type="text" placeholder="Address" value={newClientData.address} onChange={(e) => setNewClientData({ ...newClientData, address: e.target.value })} />
                        <input type="text" placeholder="City" value={newClientData.city} onChange={(e) => setNewClientData({ ...newClientData, city: e.target.value })} />
                        <input type="text" placeholder="State" value={newClientData.state} onChange={(e) => setNewClientData({ ...newClientData, state: e.target.value })} />
                        <input type="text" placeholder="Zipcode" value={newClientData.zipcode} onChange={(e) => setNewClientData({ ...newClientData, zipcode: e.target.value })} />
                        {/* Other input fields */}
                    <button onClick={handleAddClient}>Submit</button>
                    <button onClick={() => setShowAddClient(false)}>Cancel</button>
                </div>
            )}
                Items per page:
                <select value={pageSize} onChange={(e) => setPageSize(parseInt(e.target.value))}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
                Page:
                <select value={pageNumber} onChange={(e) => setPageNumber(parseInt(e.target.value))}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <option key={page} value={page}>{page}</option>
                    ))}
                </select>
            </div>
            <div>
                Search:
                <input type="text" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
                <button onClick={searchClients}>Search</button>
            </div>
            
            <table className="client-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zipcode</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client.id}>
                            <td>{client.firstName}</td>
                            <td>{client.lastName}</td>
                            <td>{client.phone}</td>
                            <td>{client.email}</td>
                            <td>{client.address}</td>
                            <td>{client.city}</td>
                            <td>{client.state}</td>
                            <td>{client.zipcode}</td>
                            <td><button onClick={() => handleDeleteClient(client.id)}>Delete</button></td> {/* Added delete button */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Clients;
