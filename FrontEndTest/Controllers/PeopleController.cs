using Microsoft.AspNetCore.Mvc;

namespace FrontEndTest.Controllers;

[ApiController]
[Route("[controller]")]
public class PeopleController : ControllerBase
{

    private readonly ILogger<PeopleController> _logger;
    private readonly PeopleManager _peopleManager;

    public PeopleController(ILogger<PeopleController> logger, PeopleManager peopleManager)
    {
        _logger = logger;
        _peopleManager = peopleManager;
    }
    /// <summary>
    /// gets all people in the E society
    /// </summary>
    /// <returns></returns>
    [HttpGet(Name = "GetPeople")]
    public IEnumerable<Person> Get()
    {
        return _peopleManager.People;
    }
    /// <summary>
    /// adds another person to the E society's records
    /// </summary>
    /// <param name="person"></param>
    /// <returns>BadRequest if the person's name does not contain an E</returns>
    [HttpPost(Name = "MakePerson")]
    public IActionResult Post(Person person)
    {
        if (!person.Name.ToUpperInvariant().Contains("E"))
        {
            return BadRequest();
        }
        _peopleManager.AddPerson(person);
        return Ok();
    }
    /// <summary>
    /// Removes a person from the E society
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpDelete(Name = "DeletePerson")]
    public IActionResult Delete(int id)
    {
        _peopleManager.DeletePerson(id);
        return Ok();
    }
}