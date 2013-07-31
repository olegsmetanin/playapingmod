import play.api._

import models._
import anorm._

object Global extends GlobalSettings {

  override def onStart(app: Application) {
    InitialData.insert()
  }

}

/**
 * Initial set of data to be imported
 * in the sample application.
 */
object InitialData {

  def date(str: String) = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(str)

  def insert() = {

    if(User.findAll.isEmpty) {

      Seq(
        User("guillaume@sample.com", "Guillaume Bort", "secret"),
        User("maxime@sample.com", "Maxime Dantec", "secret"),
        User("sadek@sample.com", "Sadek Drobi", "secret"),
        User("erwan@sample.com", "Erwan Loisant", "secret")
      ).foreach(User.create)

      Seq(
        Project(Id(1), "prj1", "crm" ,"Play 2.0") -> Seq("guillaume@sample.com", "maxime@sample.com", "sadek@sample.com", "erwan@sample.com"),
        Project(Id(2), "prj2", "crm", "Play 1.2.4") -> Seq("guillaume@sample.com", "erwan@sample.com"),
        Project(Id(3), "prj3", "crm", "Website") -> Seq("guillaume@sample.com", "maxime@sample.com"),
        Project(Id(4), "prj4", "crm", "Secret project") -> Seq("guillaume@sample.com", "maxime@sample.com", "sadek@sample.com", "erwan@sample.com"),
        Project(Id(5), "prj5", "crm", "Playmate") -> Seq("maxime@sample.com"),
        Project(Id(6), "prj6", "crm", "Things to do") -> Seq("guillaume@sample.com"),
        Project(Id(7), "prj7", "crm", "Play samples") -> Seq("guillaume@sample.com", "maxime@sample.com"),
        Project(Id(8), "prj8", "crm", "Private") -> Seq("maxime@sample.com"),
        Project(Id(9), "prj9", "crm", "Private") -> Seq("guillaume@sample.com"),
        Project(Id(10), "prj10", "crm", "Private") -> Seq("erwan@sample.com"),
        Project(Id(11), "prj11", "crm", "Private") -> Seq("sadek@sample.com")
      ).foreach {
        case (project,members) => Project.create(project, members)
      }

      Seq(
        Task(NotAssigned, "Todo", 1, "Fix the documentation", false, None, Some("guillaume@sample.com")),
        Task(NotAssigned, "Urgent", 1, "Prepare the beta release", false, Some(date("2011-11-15")), None),
        Task(NotAssigned, "Todo", 9, "Buy some milk", false, None, None),
        Task(NotAssigned, "Todo", 2, "Check 1.2.4-RC2", false, Some(date("2011-11-18")), Some("guillaume@sample.com")),
        Task(NotAssigned, "Todo", 7, "Finish zentask integration", true, Some(date("2011-11-15")), Some("maxime@sample.com")),
        Task(NotAssigned, "Todo", 4, "Release the secret project", false, Some(date("2012-01-01")), Some("sadek@sample.com"))
      ).foreach(Task.create)

      val tasks = Task.findAll;

      Seq(
        Contract(NotAssigned, "Todo", 1, "Fix the documentation", false, None, Some("guillaume@sample.com")) -> Seq(tasks(0).id.get, tasks(1).id.get),
        // Contract(NotAssigned, "Urgent", 1, "Prepare the beta release", false, Some(date("2011-11-15")), None),
        // Contract(NotAssigned, "Todo", 9, "Buy some milk", false, None, None),
        // Contract(NotAssigned, "Todo", 2, "Check 1.2.4-RC2", false, Some(date("2011-11-18")), Some("guillaume@sample.com")),
        // Contract(NotAssigned, "Todo", 7, "Finish zentask integration", true, Some(date("2011-11-15")), Some("maxime@sample.com")),
        Contract(NotAssigned, "Todo", 4, "Release the secret project", false, Some(date("2012-01-01")), Some("sadek@sample.com")) -> Seq(tasks(2).id.get, tasks(3).id.get)
      ).foreach {
        case (contract,tasks) => Contract.create(contract, tasks)
      }



    }

  }

}