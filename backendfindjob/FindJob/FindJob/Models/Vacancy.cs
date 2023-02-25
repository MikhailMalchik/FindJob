namespace FindJob.Models
{
    public class Vacancy
    {
        public int Id { get; set; }
        public int EmployerId { get; set; }

        public Employer Employer { get; set; }

        public string NameVacancy { get; set; }
        public string? Description { get; set; }

        public string? Skills { get; set; }
        public string? Experience { get; set; }

        public string? Salary { get; set; }

       

        public Vacancy ()
        {
           
        }
       

    }
}
