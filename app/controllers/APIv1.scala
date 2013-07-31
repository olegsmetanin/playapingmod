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

