using System.ComponentModel.DataAnnotations;

namespace FindJob.Models
{
    public class Staff
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }
        public string? Surname { get; set; }
        public string Email { get; set; }
        public bool admin { get; set; } 
        public string Password { get; set; }
    }
}
