namespace FrontEndTest;

public class PeopleManager
{
    private int Id = 7;
    public List<Person> People = new List<Person>()
    {
        new (){Id = 1, Age = 20, Name = "Jeremy"},
        new() {Id=2, Age = 50, Name = "Feefee"},
        new() {Id=3, Age = 32, Name="Lee"},
        new() {Id=4, Age= 103, Name = "Queen Elizabeth"},
        new() {Id=5, Age = 43, Name = "Andrzej"},
        new() {Id=6, Age = 45, Name = "Hemal"},
    };

    public void AddPerson(Person person)
    {
        person.Id = Id;
        Id += 1;
        People.Add(person);
    }

    public void DeletePerson(int id)
    {
        var person = People.FirstOrDefault(p => p.Id == id);
        if (person == null)
        {
            return;
        }

        People.Remove(person);
    }
}