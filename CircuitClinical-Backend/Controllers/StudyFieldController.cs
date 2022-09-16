using CircuitClinical_Backend.DBServices;
using CircuitClinical_Backend.Models.Entities;
using CircuitClinical_Backend.Models.Responses;
using CircuitClinical_Backend.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace CircuitClinical_Backend.Controllers
{
    [EnableCors("_myAllowSpecificOrigins")]
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class StudyFieldController : ControllerBase
    {
        private readonly StudyFieldService _studyFieldService;
        private readonly DBStudyFieldServices _dBStudyFieldServices;

        public StudyFieldController(StudyFieldService studyFieldService, DBStudyFieldServices dBStudyFieldServices)
        {
            _studyFieldService = studyFieldService;
            _dBStudyFieldServices = dBStudyFieldServices;
        }

        [HttpGet(Name = "GetStudyField")]
        public async Task<IEnumerable<StudyField>> Get()
        {
            StudyFieldsResponseClass studyFieldsResponse = await _studyFieldService.Search("covid", 1, 50);
            return studyFieldsResponse.StudyFieldsResponse.StudyFields;
        }

        [HttpGet(Name = "GetStudyFieldAll")]
        public async Task<IEnumerable<StudyField>> GetAll()
        {
            var studyFields = await _dBStudyFieldServices.GetAsync();
            return studyFields;
        }

        [HttpGet(Name = "GetStudyFieldById/{id:length(24)}")]
        public async Task<ActionResult<StudyField>> GetById(string id)
        {
            var studyField = await _dBStudyFieldServices.GetAsync(id);

            if (studyField is null)
            {
                return NotFound();
            }
            return studyField;
        }

        [HttpPost(Name = "InsertStudyField")]
        public async Task<IActionResult> Insert(StudyField studyField)
        {
            await _dBStudyFieldServices.CreateAsync(studyField);
            return CreatedAtAction(nameof(GetById), new { id = studyField.Id }, studyField);
        }

        [HttpDelete(Name = "DeleteStudyField/{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var studyField = await _dBStudyFieldServices.GetAsync(id);
            if (studyField is null)
            {
                return NotFound();
            }
            await _dBStudyFieldServices.RemoveAsync(id);
            return NoContent();
        }

        [HttpPut(Name = "UpdateStudyField/{id:length(24)}")]
        public async Task<IActionResult> Update(string id, StudyField updateStudyField)
        {
            var studyField = await _dBStudyFieldServices.GetAsync(id);

            if (studyField is null)
            {
                return NotFound();
            }

            updateStudyField.Id = studyField.Id;
            await _dBStudyFieldServices.UpdateAsync(id, updateStudyField);
            return NoContent();
        }
    }
}
