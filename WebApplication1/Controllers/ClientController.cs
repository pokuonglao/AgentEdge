using Microsoft.AspNetCore.Mvc;
using WebApplication1.Entities;

//using RealEstate.Models;
//using RealEstate.Repositories;
using WebApplication1.Repository;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClientController : ControllerBase
    {
        private readonly IClientsRepository<Clients> _clientRepository;

        public ClientController(IClientsRepository<Clients> clientRepository)
        {
            _clientRepository = clientRepository;
        }

        [HttpPost]
        [Route("addClient")] // Define an appropriate route for adding a guest
        public IActionResult AddClient([FromBody] Clients client)
        {
            if (client == null)
            {
                return BadRequest("Client data is missing.");
            }

            try
            {
                _clientRepository.Add(client);
                return Ok("Client added successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpPost]
        [Route("updateClient")]
        public IActionResult UpdateClient([FromBody] Clients client)
        {
            try
            {
                var existingClient = _clientRepository.GetById(client.ID);
                if (existingClient == null) 
                {
                    return NotFound(); // Return 404 Not Found if client with the specified ID is not found

                }
                existingClient.FirstName = client.FirstName;
                existingClient.LastName = client.LastName;
                existingClient.Email = client.Email;
                existingClient.Phone = client.Phone;
                existingClient.Address = client.Address;
                existingClient.City = client.City;
                existingClient.State = client.State;
                existingClient.Zipcode = client.Zipcode;

                _clientRepository.Update(existingClient);
                return Ok("Client updated successfully.");
            }
            catch (Exception ex) 
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpDelete]
        [Route("deleteClient/{id}")]
        public IActionResult DeleteClient(int id)
        {
            try 
            {
                var client = _clientRepository.GetById(id);
                if (client == null) {return NotFound(); }
                _clientRepository.Delete(client);
                return Ok("Client deleted successfully."); // Return success message
            }
            catch (Exception ex) { return StatusCode(500, $"An error occurred: {ex.Message}");  }
        }

        [HttpGet]
        [Route("GetTotalPages")]
        public IActionResult GetTotalPages(int pageSize)
        {
            try
            {
                var totalCount = _clientRepository.GetTotalCount(); // Get the total count of clients
                var totalPages = (int)Math.Ceiling((double)totalCount / pageSize); // Calculate the total number of pages
                return Ok(new { totalPages });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }


        [HttpGet]
        [Route("getAllClients")]
        public IActionResult GetAllClients(int pageNumber, int pageSize)
        {
            try
            {
                var clients = _clientRepository.GetAll(pageNumber, pageSize);
                if (clients == null)
                {
                    return NotFound();
                }
                return Ok(clients);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("search")]
        public IActionResult SearchClients(string keyword)
        {
            try
            {
              
                // Perform the search using the repository
                var clients = _clientRepository.Search(keyword);

                if (clients == null || !clients.Any())
                {
                    return NotFound();
                }

                return Ok(clients);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }


        //[HttpGet]
        //[Route("getAllClients")]
        //public IActionResult GetAllClient()
        //{
        //    try
        //    {
        //        var clients = _clientRepository.GetAll();
        //        if (clients == null) { return NotFound(); }
        //        return Ok(clients);


        //    }
        //    catch (Exception ex) { return StatusCode(500, $"An error occurred: {ex.Message}"); }
        //}

        [HttpGet]
        [Route("getClient/{id}")]
        public IActionResult GetClient(int id)
        {
            try
            {
                var client = _clientRepository.GetById(id);
                if (client != null)
                {
                    return Ok(client); // Return the client if found
                }
                else
                {
                    return NotFound(); // Return 404 Not Found if client with the specified ID is not found
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

    }
}
