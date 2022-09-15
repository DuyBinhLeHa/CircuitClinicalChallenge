using System.Web;
using static Newtonsoft.Json.JsonConvert;

namespace CircuitClinical_Backend.Utils
{
    public class RequestHelper
    {
        public async Task<T> CreateRequest<T>(string url, HttpMethod method = null, Dictionary<string, object> queryInfo = null, int timeOut = 10)
        {
            using (HttpClient request = new HttpClient())
            {
                request.Timeout = TimeSpan.FromSeconds(timeOut);
                if (method == null) method = HttpMethod.Get;

                string requestUrl = $"{Configure.BASE_URL}{url}";
                if (queryInfo != null)
                {
                    requestUrl += $"?{MakeQuery(queryInfo)}";
                }
                HttpRequestMessage requestMessage = new HttpRequestMessage()
                {
                    Method = method,
                    RequestUri = new Uri(requestUrl)
                };
                HttpResponseMessage responseMessage = await request.SendAsync(requestMessage);
                string content = await responseMessage.Content.ReadAsStringAsync();
                if (responseMessage.IsSuccessStatusCode)
                {
                    T value = DeserializeObject<T>(content);
                    return value;
                }
                throw new Exception("Bad requested");
            }
        }

        public static string MakeQuery(Dictionary<string, object> parameters)
        {
            if (parameters == null || parameters.Count == 0) return null;
            string query = "";
            for (int i = 0; i < parameters.Count; i++)
            {
                string key = HttpUtility.UrlEncode(parameters.ElementAt(i).Key);
                string value = HttpUtility.UrlEncode(parameters.ElementAt(i).Value.ToString());
                query += $"{key}={value}";
                if (i != parameters.Count - 1)
                {
                    query += "&";
                }
            }
            return query;
        }
    }
}
