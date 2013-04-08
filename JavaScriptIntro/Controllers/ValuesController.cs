using System.Web.Http;

namespace JavaScriptIntro.Controllers
{
public class ValuesController : ApiController
{
    public class DeepModelChild
    {
        public string value { get; set; }
    }

    public class DeepModel
    {
        public string name { get; set; }
        public DeepModelChild child { get; set; }
    }

    // GET api/values
    public string[] Get()
    {
        return new [] { "1", "2", "3" };
    }

    // GET api/values/5
    public string Get(int id)
    {
        return id.ToString();
    }

    // POST api/values
    public void Post([FromBody]DeepModel value)
    {
    }

    // PUT api/values/5
    public void Put([FromBody]string value)
    {
    }

    // DELETE api/values/5
    public void Delete(int id)
    {
    }
}
}