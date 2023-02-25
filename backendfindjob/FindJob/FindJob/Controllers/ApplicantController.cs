using FindJob.DB;
using FindJob.Models;
using FindJob.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System;
using System.Data;
using Microsoft.AspNetCore.Authorization;
using System.Security.Principal;
using Superpower.Model;

namespace FindJob.Controllers
{
    [Route("Applicant")]
    public class ApplicantController : Controller
    {
        ApplicationContext db = new ApplicationContext();

        
        [HttpPost("addApplicant")]
        public bool addApplicant()
        {
            var req = Request;
            var email = req.Form["email"];
            var userTrue = db.Applicants.ToList().FirstOrDefault(t => t.Email == email, null);
            if (userTrue != null)
            {
                return false;
            } 


            Applicant applicant = new Applicant
            {
                Email = req.Form["email"],

                Phone = req.Form["phone"],
                Password = HashPassword.GetHash(req.Form["password"]),
                Name = req.Form["name"],
                Surname = req.Form["surname"],
                DateOfBirth = req.Form["age"],
                Gender = req.Form["gender"]


            };
            db.Applicants.Add(applicant);
            db.SaveChanges();
            return true;
        }
       

        [HttpGet("getApplicant")]
        public IEnumerable<Applicant> GetApplicant()
        {
            return (IEnumerable<Applicant>)db.Applicants.OrderBy(t => t.Id);

        }

        [HttpPost("updateApplicant")]
        public string updateApplicant()
        {
            var req = Request;

            var email = req.Form["email"];
            var userTrue = db.Applicants.ToList().FirstOrDefault(t => t.Id == int.Parse(email), null);
            if (userTrue == null)
            {
                return "Failed";
            }





            else
            {
                userTrue.Name = req.Form["name"];
                userTrue.Surname = req.Form["surname"];
                userTrue.Phone = req.Form["phone"];
                userTrue.DateOfBirth = req.Form["age"];
                userTrue.Gender = req.Form["gender"];
                db.SaveChanges();
                return "Success";



            }
        }
        [HttpGet("loadApplicant/{id:int}")]
        public Applicant LoadApplicant(int id)
        {
            return (Applicant)db.Applicants.First(t => t.Id == id);

        }


        [HttpGet("delApplicant/{id:int}")]

        public bool delApplicant(int id)
        {
            Applicant applicant = db.Applicants.First(t => t.Id == id);
            foreach(Rewiews rewiews in db.Rewiews )
            {
                if(rewiews.ApplicantId == applicant.Id)
                    db.Rewiews.Remove(rewiews);
            }
            foreach (Resume resume in db.Resumes)
            {
                if (resume.ApplicantId == applicant.Id)
                    db.Resumes.Remove(resume);
            }
            db.Applicants.Remove(applicant);
            db.SaveChanges();
            return true;
        }

        [HttpPost("token")]
        public IActionResult Token(string username, string password)
        {
            var identity = GetIdentity(username, password);
            if (identity == null)
            {
                return Ok(false);
            }

            var now = DateTime.UtcNow;
            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt,
                username = identity.Name
            };

            return Json(response);
        }

        private ClaimsIdentity GetIdentity(string username, string password)
        {
            Applicant applicant = db.Applicants.FirstOrDefault(x => x.Email == username && x.Password == HashPassword.GetHash(password));
            if (applicant != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, applicant.Email),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, "applicant"),
                   


                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }

            // если пользователя не найдено
            return null;
        }

        

        [Authorize(Roles = "applicant")]
        [HttpGet("checkapplicant")]
        public IActionResult checkApplicant()
        {
            return Ok(true);

        }

        [Authorize(Roles = "applicant")]
        [HttpGet("getapplicantid")]
        public IActionResult checkApplicantId()
        {
            var userId = User.FindFirstValue(ClaimsIdentity.DefaultNameClaimType);
            
            foreach (Applicant applicant in db.Applicants)
            {
               
                    if (userId
                    == applicant.Email)
                    {
                        return Ok(applicant.Id);
                    }
                
            }
            return BadRequest(new { errorText = "Invalid applicant" });

        }
    }
}
