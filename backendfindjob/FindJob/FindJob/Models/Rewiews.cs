using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FindJob.Models
{
    public class Rewiews
    {
        public int Id { get; set; }
       
        public int ApplicantId { get; set; }
        public Applicant Applicant { get; set; }
       
        public string rewiew { get; set; }
       
        public int VacancyId { get; set; }
       
        public Vacancy Vacancy { get; set; }
        public DateTime date { get; set; }
    }
}
