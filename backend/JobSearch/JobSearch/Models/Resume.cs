using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearch.Models
{
    public class Resume
    {
        [Key]
        public int Id { get; set; }
        public int ApplicantId { get; set; }
        [ForeignKey("ApplicanrId")]
        public Applicant Applicant { get; set; }

        public string? Description { get; set; }

        public string? Skills { get; set; }
        public string? Experience { get; set; }  


    }
}
