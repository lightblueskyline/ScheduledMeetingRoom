using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using ScheduledMeetingRoom_backend.Models;

namespace ScheduledMeetingRoom_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly IOptions<OpenWeatherMapApi> _options;

        public TestController(IOptions<OpenWeatherMapApi> options)
        {
            _options = options;
        }

        [HttpGet("Index")]
        public IActionResult Index()
        {
            return Ok(new
            {
                Name = _options.Value.Name,
                Url = _options.Value.Url,
                IsSecured = _options.Value.IsSecured
            });
        }
    }
}
