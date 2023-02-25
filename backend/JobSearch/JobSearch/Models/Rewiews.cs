using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;

namespace JobSearch.Models
{
    public class Rewiews
    {
        public int Id { get; set; }
        [JsonIgnore]
        public int ApplicantId { get; set; }
        public virtual Applicant Applicant { get; set; }
        [StringLength(150)]
        public string rewiew { get; set; }
        [JsonIgnore]
        public int VacancyId { get; set; }
        [JsonIgnore]
        public virtual Vacancy Vacancy { get; set; }
        public DateTime date { get; set; }
    }
}
