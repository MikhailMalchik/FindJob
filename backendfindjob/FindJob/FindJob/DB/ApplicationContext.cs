using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using FindJob.Models;

namespace FindJob.DB
{
    public class ApplicationContext : DbContext
    {
        public virtual DbSet<Applicant> Applicants { get; set; } 
        public virtual DbSet<Employer> Employers { get; set; } 
        public virtual DbSet<Resume> Resumes { get; set; } 
        public virtual DbSet<Rewiews> Rewiews { get; set; } 
        public virtual DbSet<Staff> Staff { get; set; }
        public virtual DbSet<Vacancy> Vacancies { get; set; }
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
               
                .UseSqlServer(@"Server=SqlServ;Database=FindJob;User Id=sa;Password=Pass@word;trustservercertificate=True;MultipleActiveResultSets=True"
               /* @"data source=DESKTOP-J80FD52; Initial Catalog=FindJob2; Integrated Security=True; trustservercertificate=True; MultipleActiveResultSets=True"*/);
          
            //.UseSqlite("data source = D:/bstu/course.db");
        }
        public ApplicationContext()
        {
            Database.EnsureCreated();
        }
    }
}
