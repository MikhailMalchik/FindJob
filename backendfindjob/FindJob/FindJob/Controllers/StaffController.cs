using Azure.Core;
using FindJob.DB;
using FindJob.Models;
using FindJob.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace FindJob.Controllers
{
    [Route("Staff")]
    public class StaffController : Controller
    {

        ApplicationContext db = new ApplicationContext();


        [HttpPost("addStaff")]
        public bool addStaff()
        {
            bool setadmin = false;
            var req = Request;
            var email = req.Form["email"];
            var userTrue1 = db.Staff.ToList().FirstOrDefault(t => t.Email == email, null);
            if (userTrue1 != null)
            {
                return false;
            }
            if (req.Form["admin"] == "true")
            {
                setadmin= true;
            }

                Staff staff = new Staff
            {
                Email = req.Form["email"],

                Password = HashPassword.GetHash(req.Form["password"]),
                Name = req.Form["name"],
                Surname = req.Form["surname"],
                admin = setadmin

            };
            db.Staff.Add(staff);
            db.SaveChanges();
            return true;
        }
        [HttpPost("loginStaff")]
        public string loginStaff()
        {
            bool setadmin = false;
            var req = Request;
            var email = req.Form["email"];
            
            var userTrue1 = db.Staff.ToList().FirstOrDefault(t => t.Email == email, null);
            if (userTrue1 == null)
            {
                return "";
            }
            if (req.Form["admin"] == "true")
            {
                setadmin = true;
            }
            if (userTrue1.admin == setadmin) { 


            var passwordHash = HashPassword.GetHash(req.Form["password"]);
            if (userTrue1.Password == passwordHash)
                return Convert.ToString(userTrue1.Id);
            else
                return "";
            }
            else
                return "";

        }
        [HttpGet("getStaff")]
        public IEnumerable<Staff> GetStaff()
        {
            return (IEnumerable<Staff>)db.Staff.OrderBy(t => t.Id);

        }
        [HttpPost("updateStaff")]
        public string updateStaff()
        {
            var req = Request;
            bool setadmin = false;
            var email = req.Form["email"];
            var userTrue = db.Staff.ToList().FirstOrDefault(t => t.Id == int.Parse(email), null);
            if (userTrue == null)
            {
                return "Failed";
            }





            else
            {
                userTrue.Name = req.Form["name"];
                userTrue.Surname = req.Form["surname"];
                if (req.Form["admin"] == "true")
                {
                    setadmin = true;
                }
                else
                {
                    setadmin = false;
                }

                userTrue.admin = setadmin;
                db.SaveChanges();
                return "Success";



            }
        }
        [HttpGet("loadStaff/{id:int}")]
        public Staff LoadStaff(int id)
        {
            return (Staff)db.Staff.First(t => t.Id == id);

        }
        [HttpGet("delStaff/{id:int}")]

        public bool delStaff(int id)
        {
            Staff staff = db.Staff.First(t => t.Id == id);
            db.Staff.Remove(staff);
            db.SaveChanges();
            return true;
        }
        [HttpPost("token")]
        public IActionResult Token(string username, string password,string admin)
        {
            var identity = GetIdentity(username, password, admin);
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

        private ClaimsIdentity GetIdentity(string username, string password, string admin)
        {
            bool setadmin = false;
            if (admin == "true")
            {
                setadmin = true;
            }
            else
            {
                setadmin = false;
            }
            Staff staff = db.Staff.FirstOrDefault(x => x.Email == username && x.Password == HashPassword.GetHash(password) && x.admin == setadmin);
            if (staff != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, staff.Email),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, "staff"),
                    new Claim(ClaimTypes.Gender, admin),



                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }

            // если пользователя не найдено
            return null;
        }
        [Authorize(Roles = "staff")]
        [HttpGet("checkstaff")]
        public IActionResult checkStaff()
        {
            var userId = User.FindFirstValue(ClaimTypes.Gender);
            if (userId == "true")
                return Ok(true);
            else
                return Ok(false);

        }

        [Authorize(Roles = "staff")]
        [HttpGet("getstaffid")]
        public IActionResult checkStaffId()
        {
            var userId = User.FindFirstValue(ClaimsIdentity.DefaultNameClaimType);

            foreach (Staff staff in db.Staff)
            {

                if (userId
                == staff.Email)
                {
                    return Ok(staff.Id);
                }

            }
            return BadRequest(new { errorText = "Invalid applicant" });

        }
        [Authorize(Roles = "applicant,staff")]
        [HttpGet("checkprivs/{id:int}")]
        public IActionResult CheckPrivs(int id)
        {
            var req = Request;
            var userRole = User.FindFirstValue(ClaimsIdentity.DefaultRoleClaimType);
            var username = User.FindFirstValue(ClaimsIdentity.DefaultNameClaimType);
            var resumeroles = db.Resumes.FirstOrDefault(t => t.Id == id);

            if (userRole == "staff")
                return Ok(true);
            else
            {
                foreach (Applicant applicant in db.Applicants)
                {
                    if (applicant.Email == username && resumeroles.ApplicantId == applicant.Id)
                    {
                        return Ok(true);

                    }
                }
                return Ok(false);
            }
        }
    }
}
