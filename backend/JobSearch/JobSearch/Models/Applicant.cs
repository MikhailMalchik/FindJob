using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace JobSearch.Models
{
    public class Applicant
    {
        [Key]
        public int Id { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }

        public string Name { get; set; }
        public string? Surname { get; set; }
        public string? DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public int? ResumeId { get; set; }
        public virtual Resume Resume { get; set; }

        public virtual ICollection<Rewiews> Rewiews { get; set; }

        public virtual ICollection<Vacancy> Vacancies { get; set; }

        public Applicant()
        {
            Rewiews = new HashSet<Rewiews>();
            Vacancies = new HashSet<Vacancy>();
        }

    }
}
