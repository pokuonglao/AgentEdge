using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Entities;
using WebApplication1.Repository;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountsController : ControllerBase
    {
        private readonly IAccountsRepository<Accounts> _accountsRepository;

        public AccountsController(IAccountsRepository<Accounts> accountsRepository)
        {
            _accountsRepository = accountsRepository;
        }

        [HttpPost]
        [Route("addAccount")] // Define an appropriate route for adding a guest
        public IActionResult AddAccounts([FromBody] Accounts account)
        {
            if (account == null)
            {
                return BadRequest("Client data is missing.");
            }

            try
            {
                _accountsRepository.Add(account);
                return Ok("Client added successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: Use different Username!");
            }

        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody] Accounts loginRequest)
        {
            if (loginRequest == null)
            {
                return BadRequest("Invalid login request");
            }
            string username = loginRequest.Username;
            string password = loginRequest.Password;

            var account = _accountsRepository.GetByUsername(username);

            if (account == null)
            {
                return BadRequest("Invalid username");
            }
            string usernameAsString = account.Username;
            if (!_accountsRepository.CheckLoginAccess(usernameAsString, password))
            {
                return BadRequest("Invalid password");
            }

            // Authentication successful
            return Ok("Login successful");
        }



    }
}
