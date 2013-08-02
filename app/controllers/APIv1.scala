package controllers

import play.api._
import play.api.mvc._
import play.api.data._
import play.api.data.Forms._
import play.api.libs.json.Json
import play.api.libs.json._
import Play.current
// you need this import to have combinators
import play.api.libs.functional.syntax._

import play.api.templates._

import models._

import views._

object APIv1 extends Controller {
  //http://www.playframework.com/documentation/2.1.x/ScalaJson
  //http://www.playframework.com/documentation/2.1.x/ScalaJsonRequests
  //http://www.playframework.com/documentation/2.1.x/ScalaJsonInception

  def login = Action(parse.json) { request =>
    val json = request.body;
    val email = (json \ "email").validate[String];
    val password = (json \ "password").validate[String];

    (email, password) match {
      case (JsSuccess(em, _), JsSuccess(ps, _)) => {
        (User.findByEmail(em), ps) match {
          case (Some(user: User), user.password) => Ok(Json.obj("user" -> JsString("found"))).withSession(
            "user" -> em)
          case (Some(user: User), _) => InternalServerError(Json.obj("error" -> JsString("User password not match")))
          case _ => InternalServerError(Json.obj("error" -> JsString("User not found")))
        }

      }
      case _ => InternalServerError(Json.obj("error" -> JsString("Bad login request")))
    }
  }

  def logout = Action { request =>
    Status(204)(Json.obj("result" -> JsString("Bye"))).withNewSession
  }

  def userGroups = Action { request =>
    Ok(Json.obj("groups" -> JsArray(JsString("admins") :: JsString("managers") :: Nil)))
  }

  def currentUser = Action { request =>
    request.session.get("user").map { user =>
      Ok(Json.obj("user" -> JsString(user)))
    }.getOrElse {
      InternalServerError(Json.obj("error" -> JsString("Not logged in")))
    }
  }

  /*

def index = Action { request =>
  request.session.get("connected").map { user =>
    Ok("Hello " + user)
  }.getOrElse {
    Unauthorized("Oops, you are not connected")
  }
}

*/

  def exec = Action(parse.json) { request =>
    val json = request.body;
    val action = (json \ "action").validate[String];
    val model = (json \ "model").validate[String];

    (action, model) match {
      case (JsSuccess("get", _), JsSuccess("projects", _)) => getProjects(json)
      case (JsSuccess("get", _), JsSuccess("project.contracts", _)) => getContracts(json)
      case _ => BadRequest("Unexpected Json data")
    }
  }

  def getProjects(json: JsValue) = {
    val projects = Project.findAll.map { project =>
      JsObject(
        "id" -> JsString(project.folder) ::
          "name" -> JsString(project.name) :: Nil)
    }

    Ok(Json.obj("projects" -> JsArray(projects)))
  }

  def getContracts(json: JsValue) = {
    val project = (json \ "project").validate[String];
    project match {
      case JsSuccess(project, _) => {
        val contracts = Contract.findByProjectFolder(project).map { contract =>
          JsObject(
            "id" -> JsString(contract.id.get.toString) ::
              "title" -> JsString(contract.title) :: Nil)
        }

        Ok(Json.obj("contracts" -> JsArray(contracts)))
      }
      case _ => BadRequest("Not found project name")

    }

  }

}

