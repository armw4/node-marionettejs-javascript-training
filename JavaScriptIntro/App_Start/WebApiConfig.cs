using System.Web.Http;

namespace JavaScriptIntro
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
                "PowerPlantsV2",
                "api/powerplants/v2/{id}",
                new { controller = "PowerPlantsV2", id = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
                "DefaultApi",
                "api/{controller}/{id}",
                new { id = RouteParameter.Optional }
            );
        }
    }
}