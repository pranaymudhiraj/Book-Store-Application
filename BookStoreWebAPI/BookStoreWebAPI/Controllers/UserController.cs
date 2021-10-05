using BookStoreWebAPI.Contracts;
using BookStoreWebAPI.Data.Entities;
using BookStoreWebAPI.Enums;
using BookStoreWebAPI.Models;
using BookStoreWebAPI.Models.BindingModel;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace BookStoreWebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {


        //private readonly ILogger<UserController> _logger;
        public readonly ILoggerService _logger;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly JWTConfig _jWTConfig;

        public UserController(ILoggerService logger, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,IOptions<JWTConfig> jwtConfig)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _logger = logger;
            _jWTConfig = jwtConfig.Value;
        }

        [HttpPost("RegisterUser")]
        public async Task<object> RegisterUser([FromBody] AddUpdateRegisterUserBindingModel model)
        {
            try
            {
                _logger.LogInfo("RegisterUser Method Called");
                var user = new AppUser()
                {
                    FullName = model.FullName,
                    Email = model.Email,
                    DateCreated = DateTime.UtcNow,
                    DateModified = DateTime.UtcNow,
                    UserName=model.Email
                };
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    _logger.LogInfo("User Registered");
                    return await Task.FromResult(new ResponseModel(ResponseCode.OK,"User has been Registered",null));
                }
                return await Task.FromResult(new ResponseModel(ResponseCode.Error,"" ,result.Errors.Select(x=>x.Description ).ToArray()));
            }
            catch(Exception ex)
            {
                return await Task.FromResult(new ResponseModel(ResponseCode.Error,ex.Message , null));
            }
        }

        //[Authorize(AuthenticationSchemes=JwtBearerDefaults.AuthenticationScheme)]
        //[HttpGet("GetAllUser")]
        //public async Task<object> GetAllUser()
        //{
        //    try
        //    {
        //        //List<UserDTO> allUserDTO = new List<UserDTO>();
        //        var users = _userManager.Users.Select(x => new UserDTO(x.FullName, x.Email, x.UserName, x.DateCreated));
        //        //foreach (var user in users)
        //        //{
        //            //var roles = (await _userManager.GetRolesAsync(user)).ToList();

        //            //allUserDTO.Add(new UserDTO(user.FullName, user.Email, user.UserName, user.DateCreated, roles));
        //        //}
        //        return await Task.FromResult(users);
        //    }
        //    catch (Exception ex)
        //    {
        //        return await Task.FromResult(new ResponseModel(ResponseCode.Error, ex.Message, null));

        //    }

        //}

        [HttpPost("Login")]
        public async Task<object> Login([FromBody] LoginBindingModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _logger.LogInfo("LogIn method Called");

                    var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);
                    if (result.Succeeded)
                    {
                        _logger.LogInfo("LogIn Success");

                        var appUser = await _userManager.FindByEmailAsync(model.Email);
                        //var roles = (await _userManager.GetRolesAsync(appUser)).ToList();
                        var user = new UserDTO(appUser.FullName, appUser.Email, appUser.UserName, appUser.DateCreated);
                        user.Token = GenerateToken(appUser);
                        return await Task.FromResult(new ResponseModel(ResponseCode.OK, "", user));

                    }
                }
                return await Task.FromResult(new ResponseModel(ResponseCode.Error, "Invalid email or password", null));

                //return await Task.FromResult(new ResponseModel(ResponseCode.Error, "invalid Email or password", null));
            }
            catch (Exception ex)
            {
                return await Task.FromResult(new ResponseModel(ResponseCode.Error,ex.Message , null));

            }
        }

        private string GenerateToken(AppUser user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jWTConfig.key);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new System.Security.Claims.ClaimsIdentity(new[]
                {
                    new System.Security.Claims.Claim(JwtRegisteredClaimNames.NameId,user.Id),
                    new System.Security.Claims.Claim(JwtRegisteredClaimNames.Email,user.Email),
                    new System.Security.Claims.Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                }),
                Expires=DateTime.UtcNow.AddHours(12),
                SigningCredentials=new SigningCredentials(new SymmetricSecurityKey(key),SecurityAlgorithms.HmacSha256Signature),
                Audience=_jWTConfig.Audience,
                Issuer=_jWTConfig.Issuer
            };
            _logger.LogInfo("Generate Token Method Called");
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);


        }

    }
}
