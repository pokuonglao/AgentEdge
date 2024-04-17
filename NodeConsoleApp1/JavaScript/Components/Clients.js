// Load CSS file dynamically
function loadStylesheet(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = href;
    document.head.appendChild(link);
}

// Function to create a select element with options
function createSelect(id, options) {
    const select = document.createElement('select');
    select.id = id;
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        select.appendChild(optionElement);
    });
    return select;
}

// Function to create table headers
function createTableHeader(headers) {
    const headerRow = document.createElement('tr');
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    return headerRow;
}

// Function to create table row
function createTableRow(data) {
    const row = document.createElement('tr');
    data.forEach(text => {
        const cell = document.createElement('td');
        cell.textContent = text;
        row.appendChild(cell);
    });
    return row;
}

// Function to fetch total number of pages needed to display all clients
function fetchTotalPages(pageSize) {
    fetch(`https://localhost:7094/Client/getTotalPages?pageSize=${pageSize}`)
        .then(response => response.json())
        .then(data => {
            const totalPages = data.totalPages;
            updatePageNumberOptions(totalPages);
        })
        .catch(error => console.error('Error fetching total pages:', error));
}

// Function to update the page number options based on the total number of pages needed
function updatePageNumberOptions(totalPages) {
    const pageNumberSelect = document.getElementById('pageNumberSelect');

    // Clear existing options
    pageNumberSelect.innerHTML = '';

    // Add options for each page number
    for (let i = 1; i <= totalPages; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        pageNumberSelect.appendChild(option);
    }
}

// Function to fetch clients from the API endpoint and render table
function fetchClients(pageNumber, pageSize) {
    fetch(`https://localhost:7094/Client/getAllClients?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .then(response => response.json())
        .then(clients => {
            const table = document.createElement('table');
            table.classList.add('client-table');
            const headers = ['First Name', 'Last Name', 'Phone', 'Email', 'Address', 'City', 'State', 'Zipcode'];
            const thead = document.createElement('thead');
            thead.appendChild(createTableHeader(headers));
            table.appendChild(thead);
            const tbody = document.createElement('tbody');
            clients.forEach(client => {
                const rowData = [
                    client.firstName,
                    client.lastName,
                    client.phone,
                    client.email,
                    client.address,
                    client.city,
                    client.state,
                    client.zipcode
                ];
                tbody.appendChild(createTableRow(rowData));
            });
            table.appendChild(tbody);

            const existingTable = document.querySelector('.client-table');
            if (existingTable) {
                existingTable.parentNode.replaceChild(table, existingTable); // Replace existing table with the new one
            } else {
                document.body.appendChild(table);
            }
        })
        .catch(error => console.error('Error fetching clients:', error));
}

// Function to search clients based on keyword
function searchClients(keyword) {
    fetch(`https://localhost:7094/Client/search?keyword=${keyword}`)
        .then(response => response.json())
        .then(clients => {
            const table = document.createElement('table');
            table.classList.add('client-table');
            const headers = ['First Name', 'Last Name', 'Phone', 'Email', 'Address', 'City', 'State', 'Zipcode'];
            const thead = document.createElement('thead');
            thead.appendChild(createTableHeader(headers));
            table.appendChild(thead);
            const tbody = document.createElement('tbody');
            clients.forEach(client => {
                const rowData = [
                    client.firstName,
                    client.lastName,
                    client.phone,
                    client.email,
                    client.address,
                    client.city,
                    client.state,
                    client.zipcode
                ];
                tbody.appendChild(createTableRow(rowData));
            });
            table.appendChild(tbody);

            const existingTable = document.querySelector('.client-table');
            if (existingTable) {
                existingTable.parentNode.replaceChild(table, existingTable); // Replace existing table with the new one
            } else {
                document.body.appendChild(table);
            }
        })
        .catch(error => console.error('Error searching clients:', error));
}

// Load CSS and fetch clients on page load
loadStylesheet('ClientsStyle.css');
const paginationOptions = [5, 10, 20]; // Pagination options
const paginationSelect = createSelect('paginationSelect', paginationOptions);

// Create a select element for page number
const pageNumberSelect = document.createElement('select');
pageNumberSelect.id = 'pageNumberSelect';

// Create a container div for the pagination select
const paginationContainer = document.createElement('div');
paginationContainer.appendChild(document.createTextNode('Items per page: '));
paginationContainer.appendChild(paginationSelect);
paginationContainer.appendChild(document.createTextNode('Page: '));
paginationContainer.appendChild(pageNumberSelect);
document.body.appendChild(paginationContainer);

// Create a container div for the search textbox
const searchContainer = document.createElement('div');
searchContainer.id = 'searchContainer';
searchContainer.appendChild(document.createTextNode('Search: '));

// Create the search textbox
const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.id = 'searchInput';

searchContainer.appendChild(searchInput);
document.body.appendChild(searchContainer);

// Set default page number and page size
// Fetch total number of pages needed to display all clients on page load
const defaultPageSize = parseInt(paginationSelect.value);
fetchTotalPages(defaultPageSize);

// Set default page number and page size
const defaultPageNumber = parseInt(pageNumberSelect.value);

// Fetch clients with default page number and page size
fetchClients(1, defaultPageSize);


// Listen for changes in the pagination select elements
paginationSelect.addEventListener('change', function () {
    const pageSize = parseInt(this.value); // Get selected pagination size
    fetchTotalPages(pageSize); // Fetch total pages for the new page size
});

pageNumberSelect.addEventListener('change', function () {
    const pageSize = parseInt(paginationSelect.value); // Get selected pagination size
    const pageNumber = parseInt(this.value); // Get selected page number
    fetchClients(pageNumber, pageSize); // Fetch clients with new pagination size and page number
});

// Listen for changes in the search input field
searchInput.addEventListener('input', function () {
    const keyword = this.value.toLowerCase(); // Get search keyword and convert to lowercase
    const pageSize = parseInt(paginationSelect.value); // Get selected pagination size
    searchClients(keyword, pageSize); // Perform search and update table
});
