using System.ComponentModel.DataAnnotations;

namespace FindJob.Models
{
    public class Employer
    {
        [Key]
        public int Id { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }

        public string Password { get; set; }
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public string CompanyName { get; set; }

        public List<Vacancy> Vacancy { get; set; } 
        public Employer() {
        Vacancy= new List<Vacancy>();
        }

    }
}
