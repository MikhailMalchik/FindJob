using System.ComponentModel.DataAnnotations;

namespace JobSearch.Models
{
    public class Employer
    {
        [Key]
        public int Id { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }

        public string? Name { get; set; }
        public string? Surname { get; set; }
        public string CompanyName { get; set; }



    }
}
