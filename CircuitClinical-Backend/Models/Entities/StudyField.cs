using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CircuitClinical_Backend.Models.Entities
{
    public class StudyField
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public int Rank { get; set; }

        public string[] NCTId { get; set; } = new string[0];

        public string[] LeadSponsorName { get; set; } = new string[0];

        public string[] BriefTitle { get; set; } = new string[0];

        public string[] Condition { get; set; } = new string[0];
    }
}
