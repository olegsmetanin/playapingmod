package controllers

import play.api._
import play.api.mvc._
import play.api.data._
import play.api.data.Forms._
import play.api.libs.json.Json
import Play.current

import play.api.templates._

import models._
import views._

object Application extends Controller {

  val modulesSrc = Map(
    "core.src" -> List(
      "/ng-modules/core/_module.js",
      "/ng-modules/core/breadcrumbs/breadcrumbsCtrl.js",
      "/ng-modules/core/directives/tabbar.js",
      "/ng-modules/core/security/backendless.js",
      "/ng-modules/core/security/index.js",
      "/ng-modules/core/security/authorization.js",
      "/ng-modules/core/security/interceptor.js",
      "/ng-modules/core/security/retryQueue.js",
      "/ng-modules/core/security/security.js",
      "/ng-modules/core/security/login/login.js",
      "/ng-modules/core/security/login/LoginFormController.js",
      "/ng-modules/core/security/login/toolbar.js",
      "/ng-modules/core/services/services.js",
      "/ng-modules/core/services/localizedMessages.js",
      "/ng-modules/core/systemmenu/systemMenuCtrl.js"),
    "core.min" -> List(
      "/ng-modules/core.min.js"),
    "home.src" -> List(
      "/ng-modules/home/_module.js",
      "/ng-modules/home/projects/projects.js"),
    "home.min" -> List(
      "/ng-modules/home.min.js"),
    "crm.src" -> List(
      "/ng-modules/crm/_module.js"),
    "crm.min" -> List(
      "/ng-modules/crm.min.js"))

  def module(ngModule: String, mode: String, js: String = "", backendMode: String = "") = Action {

    modulesSrc.get(ngModule + "." + mode) match {
      case Some(res) => {

        val efmode = Play.mode match {
          case Mode.Prod => "min"
          case _ => mode
        }

        val tpl = efmode match {
          case "src" => "angular.module('core.templates', [] ); angular.module('" + ngModule + ".templates', [] );"
          case _ => ""
        }

        val mod = backendMode match {
          case "fake" => "core" :: ngModule :: "core.security.backendless" :: Nil
          case _ => "core" :: ngModule :: Nil
        }

        val vars = "var js = " + Json.stringify(Json.toJson((modulesSrc.get("core." + efmode)).get ::: res)) + "," +
          "mod = " + Json.stringify(Json.toJson(mod)) + ";"
        val bodyScript = """
<script>

(function() {
""" + vars + """



function addScripts(js) {
	/*jshint evil:true */
	for (var i = 0; i < js.length; i++) {
	    document.writeln('<script type="text/javascript" src="' + js[i] + '"></'+'script>');
	}
}

addScripts(js);

""" + tpl + js + """

angular.element(document).ready(function() {
    //mod.push("core.security.backendless")
    angular.bootstrap(document, mod);
});

})();

</script>
""";
        Ok(html.main(title = "qwe", bodyScripts = Html(bodyScript)));
      }
      case _ => NotFound
    }

  }

  def project(projectid: String, mode: String, backendMode: String) = {

    Project.findByFolder(projectid) match {
      case Some(project: Project) => module(project.prjtype, mode, "window.app = {project:\"" + projectid + "\"}", backendMode);
      case _ => Action { NotFound }
    }
  }

  def redirect(url: String) = Action {
    Redirect(url)
  }

}
