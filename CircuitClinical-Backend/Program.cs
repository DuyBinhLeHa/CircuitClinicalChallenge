using CircuitClinical_Backend.DBServices;
using CircuitClinical_Backend.Services;
using CircuitClinical_Backend.Utils;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("https://localhost:3000", "https://localhost:44304/").AllowAnyHeader().AllowAnyMethod();
                      });
});

builder.Services.Configure<ClinicaltrialDatabaseSetting>(builder.Configuration.GetSection("ClinicaltrialDatabase"));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// configure dependences services
builder.Services.AddSingleton<RequestHelper, RequestHelper>();
builder.Services.AddSingleton<DBStudyFieldServices, DBStudyFieldServices>();
builder.Services.AddSingleton<StudyFieldService, StudyFieldService>();

var app = builder.Build();

app.UseCors(MyAllowSpecificOrigins);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
