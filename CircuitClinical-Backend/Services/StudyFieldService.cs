using CircuitClinical_Backend.DBServices;
using CircuitClinical_Backend.Models.Responses;
using CircuitClinical_Backend.Utils;

namespace CircuitClinical_Backend.Services
{
    public class StudyFieldService
    {
        private readonly RequestHelper _requestHelper;
        private readonly DBStudyFieldServices _dBStudyFieldServices;

        public StudyFieldService(RequestHelper requestHelper, DBStudyFieldServices dBStudyFeildServices)
        {
            _requestHelper = requestHelper;
            _dBStudyFieldServices = dBStudyFeildServices;
        }

        public async Task<StudyFieldsResponseClass> Search(string Expr, int MinRnk, int MaxRnk)
        {
            var queryInfo = new Dictionary<string, object>();
            queryInfo.Add("expr", Expr);
            queryInfo.Add("min_rnk", MinRnk);
            queryInfo.Add("max_rnk", MaxRnk);
            queryInfo.Add("fields", "NCTId,LeadSponsorName,BriefTitle,Condition");
            queryInfo.Add("fmt", "json");
            
            var studyFieldsResponse = await _requestHelper.CreateRequest<StudyFieldsResponseClass>(url: "study_fields", queryInfo: queryInfo);
            
            // add db
            foreach (var studyField in studyFieldsResponse.StudyFieldsResponse.StudyFields)
            {
                await _dBStudyFieldServices.CreateAsync(studyField);
            }

            return studyFieldsResponse;
        }
    }
}
