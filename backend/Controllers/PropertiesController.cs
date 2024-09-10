using Microsoft.AspNetCore.Mvc;
using WebApplication1.Entities;
using WebApplication1.Repository;
using Microsoft.Extensions.Logging;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PropertiesController : ControllerBase
    {
        private readonly IPropertiesRepository<Properties> _propertyRepository;
        private readonly ILogger<PropertiesController> _logger;

        public PropertiesController(IPropertiesRepository<Properties> propertyRepository, ILogger<PropertiesController> logger)
        {
            _propertyRepository = propertyRepository;
            _logger = logger;
        }

        [HttpPost]
        [Route("addProperty")]
        public IActionResult AddProperty([FromBody] Properties property)
        {
            if (property == null)
            {
                return BadRequest("Property data is missing.");
            }

            if (string.IsNullOrWhiteSpace(property.Address))
            {
                return BadRequest("Property address is required.");
            }

            if (property.Price <= 0)
            {
                return BadRequest("Property price must be greater than 0.");
            }

            try
            {
                _propertyRepository.Add(property);
                _logger.LogInformation("Property added successfully with ID: {PropertyId}", property.Id);
                return Ok("Property added successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while adding the property.");
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("getAllProperties")]
        public IActionResult GetAllProperties()
        {
            try
            {
                var properties = _propertyRepository.GetAll();
                if (properties == null || !properties.Any())
                {
                    return NotFound("No properties found.");
                }
                return Ok(properties);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while retrieving properties.");
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpDelete]
        [Route("deleteProperty/{id}")]
        public IActionResult DeleteProperty(int id)
        {
            try
            {
                var property = _propertyRepository.GetById(id);
                if (property == null)
                {
                    return NotFound($"Property with ID {id} not found.");
                }

                _propertyRepository.Delete(property);
                _logger.LogInformation("Property with ID {PropertyId} deleted successfully.", id);
                return Ok("Property deleted successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting property with ID {PropertyId}.", id);
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpPut]
        [Route("updateProperty/{id}")]
        public IActionResult UpdateProperty(int id, [FromBody] Properties updatedProperty)
        {
            if (updatedProperty == null || id <= 0)
            {
                return BadRequest("Invalid property data.");
            }

            try
            {
                var existingProperty = _propertyRepository.GetById(id);
                if (existingProperty == null)
                {
                    return NotFound($"Property with ID {id} not found.");
                }

                existingProperty.Address = updatedProperty.Address;
                existingProperty.Description = updatedProperty.Description;
                existingProperty.Status = updatedProperty.Status;
                existingProperty.Price = updatedProperty.Price;
                existingProperty.Beds = updatedProperty.Beds;
                existingProperty.Baths = updatedProperty.Baths;
                existingProperty.SquareFeet = updatedProperty.SquareFeet;
                existingProperty.LotSize = updatedProperty.LotSize;
                existingProperty.ImageUrls = updatedProperty.ImageUrls;

                _propertyRepository.Update(existingProperty);
                _logger.LogInformation("Property with ID {PropertyId} updated successfully.", id);
                return Ok("Property updated successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating property with ID {PropertyId}.", id);
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet("getProperty/{id}")]
        public ActionResult<Properties> GetPropertyById(int id)
        {
            var property = _propertyRepository.GetById(id);
            if (property == null)
            {
                return NotFound();
            }
            return Ok(property);
        }

    }
}
