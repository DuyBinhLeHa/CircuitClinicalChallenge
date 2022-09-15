using CircuitClinical_Backend.Models.Entities;

namespace CircuitClinical_Backend.Models.Responses
{
    public class StudyFieldsResponseInfo
    {
        public string APIVrs { get; set; } = "";

        public string DataVrs { get; set; } = "";

        public string Expressison { get; set; } = "";

        public long NStudiesAvail { get; set; }

        public long NstudiesFound { get; set; }

        public int MinRank { get; set; }

        public int MaxRank { get; set; }

        public int NStudiesRetunrned { get; set; }

        public StudyField[] StudyFields { get; set; } = new StudyField[0];
    }

    public class StudyFieldsResponseClass
    {
        public StudyFieldsResponseInfo StudyFieldsResponse { get; set; }
    }
}
