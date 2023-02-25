using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace FindJob.Models
{
    public class Resume
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("ApplicantId")]
        public int ApplicantId { get; set; }
      
        public Applicant Applicant { get; set; }

        public string? Description { get; set; }

        public string? Skills { get; set; }
        public string? Experience { get; set; }


    }
}
