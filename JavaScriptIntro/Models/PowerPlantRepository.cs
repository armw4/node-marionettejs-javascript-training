using System.Collections.Generic;
using System.Linq;

namespace JavaScriptIntro.Models
{
    public class PowerPlantRepository
    {
        private static readonly IList<PowerPlant> PowerPlants = new List<PowerPlant>
            {
                new PowerPlant { id = 1, location = "Alexandria, VA", type = "Coal", powerGenerated = 75, maintenanceCost = 450m },
                new PowerPlant { id = 2, location = "Carson City, NV", type = "Oil", powerGenerated = 150, maintenanceCost = 900m },
                new PowerPlant { id = 3, location = "Shippingport, PA", type = "Nuclear", powerGenerated = 200, maintenanceCost = 1300m },
                new PowerPlant { id = 4, location = "Fowler, IN", type = "Wind", powerGenerated = 3, maintenanceCost = 80m },
                new PowerPlant { id = 5, location = "Austin, TX", type = "Solar", powerGenerated = 8, maintenanceCost = 145m },

                new PowerPlant { id = 6, location = "a", type = "Nuclear", powerGenerated = 200, maintenanceCost = 1300m },
                new PowerPlant { id = 7, location = "b", type = "Wind", powerGenerated = 3, maintenanceCost = 80m },
                new PowerPlant { id = 8, location = "c", type = "Solar", powerGenerated = 8, maintenanceCost = 145m },
                new PowerPlant { id = 9, location = "d", type = "Coal", powerGenerated = 75, maintenanceCost = 450m },
                new PowerPlant { id = 10, location = "e", type = "Oil", powerGenerated = 150, maintenanceCost = 900m },
                new PowerPlant { id = 11, location = "f", type = "Nuclear", powerGenerated = 200, maintenanceCost = 1300m },
                new PowerPlant { id = 12, location = "g", type = "Wind", powerGenerated = 3, maintenanceCost = 80m },
                new PowerPlant { id = 13, location = "h", type = "Solar", powerGenerated = 8, maintenanceCost = 145m },
            };

        public IEnumerable<PowerPlant> GetAll()
        {
            return PowerPlants;
        }

        public PowerPlant GetById(int id)
        {
            return PowerPlants.FirstOrDefault(x => x.id == id);
        }

        public void Add(PowerPlant powerPlant)
        {
            PowerPlants.Add(powerPlant);
        }

        public void DeleteById(int id)
        {

        }
    }
}