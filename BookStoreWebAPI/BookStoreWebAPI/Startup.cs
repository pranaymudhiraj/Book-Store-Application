using BookStoreWebAPI.Context;
using BookStoreWebAPI.Contracts;
using BookStoreWebAPI.Data;
using BookStoreWebAPI.Data.Entities;
using BookStoreWebAPI.Models;
using BookStoreWebAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStoreWebAPI
{
    public class Startup
    {
        private readonly string _loginOrigin="_localorgin";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<JWTConfig>(Configuration.GetSection("JWTConfig"));
            services.AddDbContext<AppDBContext>(opt =>
            {
                opt.UseSqlServer(Configuration.GetConnectionString("BookStoreDB"));
            });
            
            services.AddMvc();
            services.AddIdentity<AppUser, IdentityRole>(opt =>{}).AddEntityFrameworkStores<AppDBContext>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                var key = Encoding.ASCII.GetBytes(Configuration["JWTConfig:key"]);
                var issuer = Configuration["JWTConfig:Issuer"];
                var audience = Configuration["JWTConfig:Audience"];

                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuerSigningKey =true,
                    IssuerSigningKey=new SymmetricSecurityKey(key),
                    ValidateIssuer=true,
                    ValidateAudience=true,
                    RequireExpirationTime=true,
                    ValidIssuer= issuer,
                    ValidAudience= audience
                };
            });
            services.AddDbContext<BooksCRUDContext>(options => options.UseSqlServer(Configuration.GetConnectionString("BookStoreDB")));
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "My API",
                    Version = "v1"
                });
            });
            services.AddSingleton<ILoggerService, LoggerService>();
            services.AddCors(opt =>
            {
                opt.AddPolicy(_loginOrigin, builder =>
                {
                    builder.AllowAnyOrigin();
                    builder.AllowAnyHeader();
                    builder.AllowAnyMethod();
                });
            });
            //services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API v1");
            });
            
            app.UseCors(x => x
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors(_loginOrigin);
            app.UseAuthentication();
            app.UseAuthorization();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });


        }
    }
}
