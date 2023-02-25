using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearch.Models
{
    public class Vacancy
    {
        public int Id { get; set; }
        public int EmplyerId { get; set; }
       
        public virtual Employer Employer { get; set; }

        public string? Description { get; set; }

        public string? Skills { get; set; }
        public string? Experience { get; set; }

        public string? Salary { get; set; }

        public List<Applicant> Applicants { get; set; }



    }
}
