using System.ComponentModel.DataAnnotations;

namespace JobSearch.Models
{
    public class Staff
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }
        public string? Surname { get; set; }

        public bool admin { get; set; } = false;
    }
}
