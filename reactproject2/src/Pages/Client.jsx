import React, { useState, useEffect } from 'react';
import '../Styles/Pages/Client.css';


function Clients() {
    const [pageSize, setPageSize] = useState(5);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [clients, setClients] = useState([]);

    useEffect(() => {
        // Fetch total pages on component mount
        fetchTotalPages(pageSize);
    }, [pageSize]);

    useEffect(() => {
        // Fetch clients when page number changes
        fetchClients(pageNumber, pageSize);
    }, [pageNumber, pageSize]);

    const fetchTotalPages = (size) => {
        fetch(`http://ec2-54-183-197-75.us-west-1.compute.amazonaws.com/Client/getTotalPages?pageSize=${size}`)
            .then(response => response.json())
            .then(data => {
                setTotalPages(data.totalPages);
            })
            .catch(error => console.error('Error fetching total pages:', error));
    };

    const fetchClients = (page, size) => {
        fetch(`http://ec2-54-183-197-75.us-west-1.compute.amazonaws.com/Client/getAllClients?pageNumber=${page}&pageSize=${size}`)
            .then(response => response.json())
            .then(data => {
                setClients(data);
            })
            .catch(error => console.error('Error fetching clients:', error));
    };

    const searchClients = () => {
        fetch(`http://ec2-54-183-197-75.us-west-1.compute.amazonaws.com/Client/search?keyword=${searchKeyword}`)
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
