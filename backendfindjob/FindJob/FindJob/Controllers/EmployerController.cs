using Azure.Core;
using FindJob.DB;
using FindJob.Models;
using FindJob.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace FindJob.Controllers
{
    [Route("Employer")]
    public class EmployerController : Controller
    {
        ApplicationContext db = new ApplicationContext();

        
        [HttpPost("addEmployer")]
        public bool addEmployer()
        {
            var req = Request;
            var email = req.Form["email"];
            var userTrue = db.Employers.ToList().FirstOrDefault(t => t.Email == email, null);
            if (userTrue != null)
            {
                return false;
            }


            Employer employer = new Employer
            {
                Email = req.Form["email"],

                Phone = req.Form["phone"],
                Password = HashPassword.GetHash(req.Form["password"]),
                Name = req.Form["name"],
                Surname = req.Form["surname"],
                CompanyName = req.Form["companyName"],
               

            };
            db.Employers.Add(employer);
            db.SaveChanges();
            return true;
        }
       
        [HttpGet("getEmployer")]
        public IEnumerable<Employer> GetEmployer()
        {
            return (IEnumerable<Employer>)db.Employers.OrderBy(t => t.Id);

        }
        [HttpGet("loadEmployer/{id:int}")]
        public Employer LoadEmployer(int id)
        {
            return (Employer)db.Employers.First(t => t.Id == id);

        }
        [HttpPost("updateEmployer")]
        public string updateEmployer()
        {
            var req = Request;

            var email = req.Form["email"];
            
            var userTrue = db.Employers.ToList().FirstOrDefault(t => t.Id == int.Parse(email), null);
            if (userTrue == null)
            {
                return "Failed";
            }
            else
            {
                userTrue.Name = req.Form["name"];
                userTrue.Surname = req.Form["surname"];
                userTrue.Phone = req.Form["phone"];
                userTrue.CompanyName = req.Form["companyname"];
                db.SaveChanges();
                return "Success";



            }
        }
        [HttpGet("delEmployer/{id:int}")]

        public bool delEmployer(int id)
        {
            Employer employer = db.Employers.First(t => t.Id == id);
            foreach (Vacancy vacancy in db.Vacancies)
            {
                if (vacancy.EmployerId == employer.Id)
                    db.Vacancies.Remove(vacancy);
            }
            db.Employers.Remove(employer);
            db.SaveChanges();
            return true;
        }
        [HttpPost("token")]
        public IActionResult Token(string username, string password)
        {
            var identity = GetIdentity(username, password);
            if (identity == null)
            {
                return BadRequest(new { errorText = "Invalid username or password." });
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
            Employer employer = db.Employers.FirstOrDefault(x => x.Email == username && x.Password == HashPassword.GetHash(password));
            if (employer != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, employer.Email),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, "employer"),



                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }

            // если пользователя не найдено
            return null;
        }
        [Authorize(Roles = "employer")]
        [HttpGet("checkemployer")]
        public IActionResult checkEmployer()
        {
            return Ok(true);

        }
        [Authorize(Roles = "employer")]
        [HttpGet("getemployerid")]
        public IActionResult checkEmployerId()
        {
            var userId = User.FindFirstValue(ClaimsIdentity.DefaultNameClaimType);

            foreach (Employer employer in db.Employers)
            {

                if (userId
                == employer.Email)
                {
                    return Ok(employer.Id);
                }

            }
            return BadRequest(new { errorText = "Invalid applicant" });

        }
    }
}
