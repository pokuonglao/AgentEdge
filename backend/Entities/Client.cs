/// <summary>
/// Represents a client entity.
/// </summary>
namespace WebApplication1.Entities
{
    public class Clients
    {
        /// <summary>
        /// Gets or sets the unique identifier of the client.
        /// </summary>
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zipcode { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        //TODO: add birthday and implement business rule engine 
    }

}
