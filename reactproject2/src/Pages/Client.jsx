import React, { useState, useEffect } from 'react';
import '../Styles/Pages/Client.css';
import LoadingSpinner from '../components/LoadingSpinner';


function Clients() {
    const [pageSize, setPageSize] = useState(5);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch total pages on component mount
        fetchTotalPages(pageSize);
    }, [pageSize]);

    useEffect(() => {
        // Fetch clients when page number changes
        fetchClients(pageNumber, pageSize);
    }, [pageNumber, pageSize]);

    const fetchTotalPages = (size) => {
        setLoading(true); // Set loading state to true
        fetch(`https://d129impgfwqu0k.cloudfront.net/Client/getTotalPages?pageSize=${size}`)
            .then(response => response.json())
            .then(data => {
                setTotalPages(data.totalPages);
            })
            .catch(error => console.error('Error fetching total pages:', error))
            .finally(() => setLoading(false)); // Set loading state to false
    };

    const fetchClients = (page, size) => {
        setLoading(true); // Set loading state to true
        fetch(`https://d129impgfwqu0k.cloudfront.net/Client/getAllClients?pageNumber=${page}&pageSize=${size}`)
            .then(response => response.json())
            .then(data => {
                setClients(data);
            })
            .catch(error => console.error('Error fetching clients:', error))
            .finally(() => setLoading(false)); // Set loading state to false
    };

    const searchClients = () => {
        fetch(`https://d129impgfwqu0k.cloudfront.net/Client/search?keyword=${searchKeyword}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }

        })
            .then(response => response.json())
            .then(data => {
                setClients(data);
            })
            .catch(error => console.error('Error searching clients:', error));
    };

    return (
        <div className="client-container">
            <h2>Clients</h2>
            <div>
                {/* Loading spinner or message */}
                {loading && <LoadingSpinner />}
                {/* Your existing JSX */}
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Clients;
