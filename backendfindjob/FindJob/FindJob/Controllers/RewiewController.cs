using FindJob.DB;
using FindJob.Models;
using FindJob.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FindJob.Controllers
{
    [Route("Rewiew")]
    public class RewiewController : Controller
    {
            ApplicationContext db = new ApplicationContext();

            [HttpGet("GetRewiews/{id:int}")]
            public IEnumerable<Rewiews> GetComments(int id)
            {
                return db.Rewiews.Where(t => t.VacancyId == id);
            }
            [HttpPost("addRewiew")]
            public Rewiews addComment()
            {
            var req = Request;
            


                Rewiews rewiews = new Rewiews
                {
                 rewiew = req.Form["rewiew"],


                VacancyId = int.Parse( req.Form["vacancyid"]),
                ApplicantId = int.Parse(req.Form["applicantId"]),
                date= DateTime.Now


                };
            db.Rewiews.Add(rewiews);
            db.SaveChanges();
            return rewiews;
            
            }
        [HttpGet("loadRewiew/{id:int}")]
        public List<Object> LoadRewiew(int id)
        {
            List<Object> list = new List<object>();
            IEnumerable<Rewiews> rewiew = db.Rewiews.Where(t => t.VacancyId == id);
            IEnumerable<Applicant> applicant = db.Applicants.Select(t=>t);
            foreach (Rewiews t in rewiew)
            {
                foreach (Applicant app in applicant)
                    if(t.ApplicantId == app.Id)
                    {
                        list.Add(new
                        {
                            id = t.Id,
                            rewiews = t.rewiew,
                            email = app.Email,
                            dates = t.date
                        });
                    }

            }
            return list;
            
        }
        [HttpGet("delRewiew/{id:int}")]

        public bool delRewiew(int id)
        {
           Rewiews rewiews = db.Rewiews.First(t=>t.Id == id);
            db.Rewiews.Remove(rewiews);
            db.SaveChanges();
            return true;
        }

    }
}
