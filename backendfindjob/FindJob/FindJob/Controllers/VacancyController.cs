using Azure.Core;
using FindJob.DB;
using FindJob.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Security.Claims;

namespace FindJob.Controllers
{
    [Route("Vacancy")]
    public class VacancyController : Controller
    {
        ApplicationContext db = new ApplicationContext();

        [HttpGet("getVacancySearch")]
        public IEnumerable<Vacancy> GetVacancySearch()
        {
            return db.Vacancies.OrderBy(t => t.NameVacancy);
           
        }
        [Authorize(Roles = "employer")]
        [HttpPost("addVacancy")]
        public Vacancy addVacancy()
        {
            var req = Request;
            var useremail = User.FindFirstValue(ClaimsIdentity.DefaultNameClaimType);
            int userid = 1;
            foreach (Employer employer in db.Employers)
            {

                if (useremail == employer.Email)
                {
                    userid = employer.Id;
                    break;
                }

            }


            Vacancy vacancy = new Vacancy
            {
                EmployerId = userid,
                NameVacancy = req.Form["namevacancy"],
                Description = req.Form["description"],
                Skills = req.Form["skills"],
                Experience = req.Form["experience"],
                Salary = req.Form["salary"]


            };
            db.Vacancies.Add(vacancy);
            db.SaveChanges();
            return vacancy;
        }

        [HttpPost("findVacancy")]
        public IEnumerable<Vacancy> findVacancy()
        {
            var req = Request;



            var resultSearch = db.Vacancies.Where(t => t.NameVacancy == req.Form["namevacancy"].ToString());
            return resultSearch;
        }
        [HttpGet("getVacancy/{id:int}")]
        public Vacancy GetVacancy(int id)
        {
            return db.Vacancies.First(t => t.Id == id);
        }

        [HttpGet("getVacancies")]
        public IEnumerable<Vacancy> GetVacancies()
        {
            return db.Vacancies.OrderBy(t => t.Id);
        }
        [HttpGet("loadVacancy/{id:int}")]
        public Vacancy LoadVacancy(int id)
        {
            return (Vacancy)db.Vacancies.First(t => t.Id == id);

        }
        [HttpGet("loadsVacancy/{id:int}")]
        public List<Object> LoadsVacancy(int id)
        {
            List<Object> list = new List<object>();
            Vacancy vacancy = db.Vacancies.First(t => t.Id == id);
            IEnumerable<Employer> employers = db.Employers.Select(t => t);
            
                foreach (Employer app in employers)
                    if (vacancy.EmployerId == app.Id)
                    {
                        list.Add(new
                        {
                            id = vacancy.Id,
                            nameVacancy = vacancy.NameVacancy ,
                            description = vacancy.Description,
                            skills = vacancy.Skills,
                            experience = vacancy.Experience,
                            salary = vacancy.Salary,
                            phone = app.Phone,
                            email = app.Email
                        });
                    }

            
            return list;

        }
        [HttpPost("updateVacancy")]
        public string updateVacancy()
        {
            var req = Request;

            var id = int.Parse(req.Form["id"]);

            var userTrue = db.Vacancies.ToList().FirstOrDefault(t => t.Id == id, null);
            if (userTrue == null)
            {
                return "Failed";
            }





            else
            {
                userTrue.NameVacancy = req.Form["namevacancy"];
                userTrue.Description = req.Form["description"];
                userTrue.Skills = req.Form["skills"];
                userTrue.Experience = req.Form["experience"];
                userTrue.Salary = req.Form["salary"];
                db.SaveChanges();
                return "Success";



            }
        }
        [HttpGet("delVacancy/{id:int}")]

        public bool delVacancy(int id)
        {
            Vacancy vacancy = db.Vacancies.First(t => t.Id == id);
            IEnumerable<Rewiews> rewiew = db.Rewiews.Where(t => t.VacancyId == id);
            foreach (Rewiews rewiews in rewiew)
            {
                db.Rewiews.Remove(rewiews);
            }
            db.Vacancies.Remove(vacancy);
            db.SaveChanges();
            return true;
        }

        [Authorize(Roles = "employer,staff")]
        [HttpGet("checkprivs/{id:int}")]
        public IActionResult CheckPrivs(int id)
        {
            var req = Request;
            var userRole = User.FindFirstValue(ClaimsIdentity.DefaultRoleClaimType);
            var username = User.FindFirstValue(ClaimsIdentity.DefaultNameClaimType);
            var vacancyroles = db.Vacancies.FirstOrDefault(t => t.Id == id);

            if (userRole == "staff")
                return Ok(true);
            else
            {
                foreach (Employer employer in db.Employers)
                {
                    if (employer.Email == username && vacancyroles.EmployerId == employer.Id)
                    {
                        return Ok(true);

                    }
                }
                return Ok(false);
            }
        }
    }

    
}
