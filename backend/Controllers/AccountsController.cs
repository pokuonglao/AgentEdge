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
        private readonly ILogger<AccountsController> _logger;

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
                return BadRequest("Account is missing.");
            }

            try
            {
                _accountsRepository.Add(account);
                return Ok("Account added successfully.");
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

        [HttpGet]
        [Route("getAllAccounts")]
        public IActionResult GetAllAccounts()
        {
            try
            {
                var accounts = _accountsRepository.GetAll();
                if (accounts == null)
                {
                    return NotFound();
                }
                return Ok(accounts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpDelete]
        [Route("deleteAccount/{id}")]
        public IActionResult DeleteAccount(int id)
        {
            try
            {
                var account = _accountsRepository.GetById(id);
                if (account == null)
                {
                    return NotFound($"Account with ID {id} not found.");
                }

                _accountsRepository.Delete(account);
                _logger.LogInformation("Account with ID {AccountId} deleted successfully.", id);
                return Ok("Account deleted successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting account with ID {AccountId}.", id);
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

    }
}
