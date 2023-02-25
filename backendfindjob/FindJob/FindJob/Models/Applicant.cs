using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FindJob.Models
{
    public class Applicant
    {
        [Key]
        public int Id { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }

        public string Password { get; set; }
        public string Name { get; set; }
        public string? Surname { get; set; }
        public string? DateOfBirth { get; set; }
        public string? Gender { get; set; }


        public List<Resume> Resumes { get; set; }

        public List<Rewiews> Rewiews { get; set; }

       

        public Applicant()
        {
            Rewiews = new List<Rewiews>();
            Resumes = new List<Resume>();
            
        }
    }
}
