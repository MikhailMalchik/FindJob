using FindJob.DB;
using FindJob.Models;
using FindJob.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Data;
using System.Security.Claims;

namespace FindJob.Controllers
{
    [Route("Resume")]
    public class ResumeController : Controller
    {
        ApplicationContext db = new ApplicationContext();

        [Authorize(Roles = "applicant")]
        [HttpPost("addResume")]
        public bool addResume()
        {
            var req = Request;
            var useremail = User.FindFirstValue(ClaimsIdentity.DefaultNameClaimType);
            int userid = 1;
            foreach (Applicant applicant in db.Applicants)
            {

                if (useremail == applicant.Email)
                {
                    userid= applicant.Id;
                    break;
                }

            }


            Resume resume = new Resume
            {
                ApplicantId = userid,

                Description = req.Form["description"],
                Skills = req.Form["skills"],
                Experience = req.Form["experience"]


            };
            db.Resumes.Add(resume);
            db.SaveChanges();
            return true;
        }
        [HttpGet("getResumes")]
        public IEnumerable<Resume> GetResumes()
        {
            return db.Resumes.OrderBy(t => t.Id);
        }

        [HttpGet("delResume/{id:int}")]
        public bool delResume(int id)
        {
            Resume resume = db.Resumes.First(t => t.Id == id);
            db.Resumes.Remove(resume);
            db.SaveChanges();
            return true;
        }

        [HttpGet("loadsResume/{id:int}")]
        public List<Object> LoadsResume(int id)
        {
            List<Object> list = new List<object>();
            Resume resume = db.Resumes.First(t => t.Id == id);
            IEnumerable<Applicant> applicant = db.Applicants.Select(t => t);

            foreach (Applicant app in applicant)
                if (app.Id == resume.ApplicantId)
                {
                    list.Add(new
                    {
                        id = resume.Id,
                        description = resume.Description,
                        skills = resume.Skills,
                        experience = resume.Experience,
                        phone = app.Phone,
                        email = app.Email
                    });
                }


            return list;

        }



        [HttpGet("loadResume/{id:int}")]
        public Resume LoadVacancy(int id)
        {
            return (Resume)db.Resumes.First(t => t.Id == id);

        }

        [HttpPost("updateResume")]
        public string updateResume()
        {
            var req = Request;

            var id = int.Parse(req.Form["id"]);

            var userTrue = db.Resumes.ToList().FirstOrDefault(t => t.Id == id, null);
            if (userTrue == null)
            {
                return "Failed";
            }





            else
            {
                userTrue.Description = req.Form["description"];
                userTrue.Skills = req.Form["skills"];
                userTrue.Experience = req.Form["experience"];
                
                db.SaveChanges();
                return "Success";



            }
        }

        [Authorize(Roles = "applicant")]
        [HttpGet("getapplicantid/{id:int}")]
        public IActionResult GetApplicantId(int id)
        {
           var resume = db.Resumes.FirstOrDefault(t => t.Id == id);
            if(resume == null)
            {
                return BadRequest(new { errorText = "Invalid id" }); ;
            }
            else
            {
                var identity = (ClaimsPrincipal)Thread.CurrentPrincipal;
                foreach (Applicant applicant in db.Applicants)
                {
                    if(resume.ApplicantId == applicant.Id)
                    {
                        if(identity.Claims.Where(c => c.Type == ClaimsIdentity.DefaultNameClaimType)
                   .Select(c => c.Value).SingleOrDefault() == applicant.Email)
                        {
                            return Ok(true);
                        }
                    }
                }
                return BadRequest(new { errorText = "Invalid applicant" }); 
            }

        }
        
    }
}
