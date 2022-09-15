using CircuitClinical_Backend.Models.Entities;
using CircuitClinical_Backend.Utils;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace CircuitClinical_Backend.DBServices
{
    public class DBStudyFieldServices
    {
        private readonly IMongoCollection<StudyField> _studyFieldCollection;

        public DBStudyFieldServices(IOptions<ClinicaltrialDatabaseSetting> clinicaltrialDatabaseSetting)
        {
            var mongoClient = new MongoClient(clinicaltrialDatabaseSetting.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                clinicaltrialDatabaseSetting.Value.DatabaseName);

            _studyFieldCollection = mongoDatabase.GetCollection<StudyField>(clinicaltrialDatabaseSetting.Value.StudyFieldCollectionName);
        }

        public async Task<List<StudyField>> GetAsync() =>
        await _studyFieldCollection.Find(_ => true).ToListAsync();

        public async Task<StudyField?> GetAsync(string id) =>
            await _studyFieldCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(StudyField newBook) =>
            await _studyFieldCollection.InsertOneAsync(newBook);

        public async Task UpdateAsync(string id, StudyField updatedBook) =>
            await _studyFieldCollection.ReplaceOneAsync(x => x.Id == id, updatedBook);

        public async Task RemoveAsync(string id) =>
            await _studyFieldCollection.DeleteOneAsync(x => x.Id == id);
    }
}
