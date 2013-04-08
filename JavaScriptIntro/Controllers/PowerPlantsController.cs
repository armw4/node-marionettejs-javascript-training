using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using JavaScriptIntro.Models;

namespace JavaScriptIntro.Controllers
{
    public class PowerPlantsController : ApiController
    {
        private static readonly PowerPlantRepository PowerPlants = new PowerPlantRepository();

        // GET api/values
        public PowerPlant[] Get()
        {
            return PowerPlants.GetAll().Take(5).ToArray();
        }

        // GET api/values/5
        public HttpResponseMessage Get(int id)
        {
            var powerPlant = PowerPlants.GetById(id);

            if (powerPlant == null)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, powerPlant);
        }

        // POST api/values
        public HttpResponseMessage Post([FromBody]PowerPlant value)
        {
            // TODO: Check for validity.
            value.id = PowerPlants.GetAll().Max(x => x.id) + 1;
            PowerPlants.Add(value);

            return new HttpResponseMessage(HttpStatusCode.Created);
        }

        // PUT api/values/5
        public void Put([FromBody]PowerPlant value)
        {
            var powerPlant = PowerPlants.GetById(value.id);
            powerPlant.location = value.location;
            powerPlant.type = value.type;
            powerPlant.powerGenerated = value.powerGenerated;
            powerPlant.maintenanceCost = value.maintenanceCost;
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
            PowerPlants.DeleteById(id);
        }
    }
}